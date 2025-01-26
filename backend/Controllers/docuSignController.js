import docusign from "docusign-esign";
import path from "path";
import User from "../Models/userModel.js";
import crypto from "crypto";

// Function to get DocuSign access token
const getAccessToken = async () => {
  try {
    const privateKey = process.env.DOCUSIGN_PRIVATE_KEY
      .replace(/\\n/g, '\n')
      .replace(/["']/g, '');
    
    console.log('Private key loaded:', privateKey.substring(0, 40) + '...');
    
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH);
    
    console.log('Requesting JWT token with integration key:', 
      process.env.DOCUSIGN_INTEGRATION_KEY?.substring(0, 8) + '...');
    
    const response = await apiClient.requestJWTUserToken(
      process.env.DOCUSIGN_INTEGRATION_KEY,
      process.env.DOCUSIGN_USER_ID,
      ['signature'],
      privateKey,
      3600
    );
    
    console.log('Successfully obtained access token');
    return response.body.access_token;
  } catch (error) {
    console.error('JWT Token Error:', error);
    throw error;
  }
};

const createSigningUrl = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate email addresses
    if (!user.email) {
      return res.status(400).json({ error: 'User email is required' });
    }

    // Get DocuSign access token
    const accessToken = await getAccessToken();

    // Initialize DocuSign API
    const dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH);
    dsApiClient.addDefaultHeader('Authorization', `Bearer ${accessToken}`);

    // Create envelope definition
    const envelopeDefinition = {
      templateId: process.env.DOCUSIGN_TEMPLATE_ID,
      emailSubject: "Please sign your volunteer documents",
      status: "sent",
      templateRoles: [{
        email: user.email,
        name: user.name,
        roleName: "Volunteer",
        clientUserId: userId,
        recipientId: "1"
      }],
      copyRecipientData: "true",
      enforceSignerVisibility: "true",
      enableWetSign: "true",
      allowMarkup: "false",
      allowReassign: "false"
    };

    console.log('Creating envelope with:', {
      templateId: process.env.DOCUSIGN_TEMPLATE_ID,
      recipientEmail: user.email,
      recipientName: user.name
    });

    // Create envelope API instance and create envelope
    const envelopesApi = new docusign.EnvelopesApi(dsApiClient);
    
    // Create the envelope
    const envelope = await envelopesApi.createEnvelope(
      process.env.DOCUSIGN_ACCOUNT_ID,
      { envelopeDefinition }
    );

    if (!envelope || !envelope.envelopeId) {
      throw new Error('Failed to create envelope - no envelopeId returned');
    }

    console.log('Created envelope:', envelope.envelopeId);

    // Create recipient view request
    const recipientViewRequest = {
      authenticationMethod: 'none',
      clientUserId: userId,
      recipientId: '1',
      returnUrl: `${process.env.FRONTEND_URL}/volunteer/dashboard`,
      userName: user.name,
      email: user.email
    };

    // Get the recipient view (signing URL)
    const recipientView = await envelopesApi.createRecipientView(
      process.env.DOCUSIGN_ACCOUNT_ID,
      envelope.envelopeId,
      { recipientViewRequest }
    );

    console.log('Successfully created signing URL');
    res.json({ 
      redirectUrl: recipientView.url,
      envelopeId: envelope.envelopeId 
    });

  } catch (error) {
    // Log the complete error for debugging
    console.error('Complete error object:', error);
    console.error('DocuSign Error:', {
      message: error.message,
      response: error.response?.body || error.response?.data,
      templateId: process.env.DOCUSIGN_TEMPLATE_ID,
      accountId: process.env.DOCUSIGN_ACCOUNT_ID
    });

    res.status(500).json({
      error: 'Failed to create signing URL',
      details: error.response?.body || error.message
    });
  }
};

// Webhook handler for DocuSign events
const handleDocuSignWebhook = async (req, res) => {
  try {
    // Add DocuSign webhook authentication
    const hmac = req.headers["x-docusign-signature-1"];
    if (!hmac || !verifyDocuSignWebhook(req.body, hmac)) {
      return res.status(401).json({ error: "Invalid webhook signature" });
    }

    const { envelopeStatus, envelopeId } = req.body;

    if (envelopeStatus === "completed") {
      // Get envelope details to find the user
      const dsApiClient = new docusign.ApiClient();
      dsApiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH);
      const accessToken = await getAccessToken();
      dsApiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

      const envelopesApi = new docusign.EnvelopesApi(dsApiClient);
      const envelope = await envelopesApi.getEnvelope(
        process.env.DOCUSIGN_ACCOUNT_ID,
        envelopeId
      );

      // Update user status
      const user = await User.findOneAndUpdate(
        { email: envelope.emailSubject },
        {
          status: "active",
          documentsSigned: true,
          documentSignedAt: new Date(),
        },
        { new: true }
      );

      console.log(`Updated volunteer status for user: ${user._id}`);
    }

    res.status(200).send();
  } catch (error) {
    console.error("DocuSign webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};

// Add webhook verification
function verifyDocuSignWebhook(payload, hmac) {
  const secret = process.env.DOCUSIGN_WEBHOOK_SECRET;
  const calculatedHmac = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex");
  return hmac === calculatedHmac;
}

export { createSigningUrl, handleDocuSignWebhook };
