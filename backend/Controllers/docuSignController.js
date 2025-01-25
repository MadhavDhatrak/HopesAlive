import docusign from 'docusign-esign';
import path from 'path';
import User from '../Models/userModel.js'
import crypto from 'crypto';

// Function to get DocuSign access token
const getAccessToken = async () => {
  try {
    const privateKey = process.env.DOCUSIGN_PRIVATE_KEY.replace(/\\n/g, '\n');
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH);
    
    const response = await apiClient.requestJWTUserToken(
      process.env.DOCUSIGN_INTEGRATION_KEY,
      process.env.DOCUSIGN_USER_ID,
      ['signature'],
      privateKey,
      3600
    );
    
    return response.body.access_token;
  } catch (error) {
    console.error('Error getting DocuSign access token:', error);
    throw error;
  }
};

const createSigningUrl = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize DocuSign API
    const dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH);
    
    const accessToken = await getAccessToken();
    dsApiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
    
    // Create envelope definition with template
    const envelopeDefinition = {
      templateId: process.env.DOCUSIGN_TEMPLATE_ID,
      status: 'sent',
      templateRoles: [{
        email: user.email,
        name: user.name,
        roleName: "Volunteer",
        clientUserId: userId, // Added for embedded signing
        tabs: {
          textTabs: [
            {
              tabLabel: "Full Name",
              value: user.name,
              locked: "true"
            },
            {
              tabLabel: "Email",
              value: user.email,
              locked: "true"
            },
            {
              tabLabel: "Phone Number",
              value: user.phoneNumber,
              locked: "true"
            }
          ]
        }
      }]
    };

    // Create envelope
    const envelopesApi = new docusign.EnvelopesApi(dsApiClient);
    const envelope = await envelopesApi.createEnvelope(
      process.env.DOCUSIGN_ACCOUNT_ID,
      { envelopeDefinition }
    );

    // Create recipient view request
    const recipientViewRequest = {
      authenticationMethod: 'none',
      clientUserId: userId,
      recipientId: '1',
      returnUrl: `${process.env.FRONTEND_URL}/volunteer/dashboard`,
      userName: user.name,
      email: user.email
    };

    // Get signing URL
    const signingUrl = await envelopesApi.createRecipientView(
      process.env.DOCUSIGN_ACCOUNT_ID,
      envelope.envelopeId,
      { recipientViewRequest }
    );

    res.json({ redirectUrl: signingUrl.url });
  } catch (error) {
    console.error('DocuSign error:', error);
    res.status(500).json({ error: 'Failed to create signing URL' });
  }
};

// Webhook handler for DocuSign events
const handleDocuSignWebhook = async (req, res) => {
  try {
    // Add DocuSign webhook authentication
    const hmac = req.headers['x-docusign-signature-1'];
    if (!hmac || !verifyDocuSignWebhook(req.body, hmac)) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const { envelopeStatus, envelopeId } = req.body;
    
    if (envelopeStatus === 'completed') {
      // Get envelope details to find the user
      const dsApiClient = new docusign.ApiClient();
      dsApiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH);
      const accessToken = await getAccessToken();
      dsApiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
      
      const envelopesApi = new docusign.EnvelopesApi(dsApiClient);
      const envelope = await envelopesApi.getEnvelope(
        process.env.DOCUSIGN_ACCOUNT_ID,
        envelopeId
      );
      
      // Update user status
      const user = await User.findOneAndUpdate(
        { email: envelope.emailSubject },
        { 
          status: 'active',
          documentsSigned: true,
          documentSignedAt: new Date()
        },
        { new: true }
      );

      console.log(`Updated volunteer status for user: ${user._id}`);
    }

    res.status(200).send();
  } catch (error) {
    console.error('DocuSign webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

// Add webhook verification
function verifyDocuSignWebhook(payload, hmac) {
  const secret = process.env.DOCUSIGN_WEBHOOK_SECRET;
  const calculatedHmac = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return hmac === calculatedHmac;
}

export { createSigningUrl, handleDocuSignWebhook }; 