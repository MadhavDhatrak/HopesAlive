import docusign from 'docusign-esign';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAccessToken = async () => {
  try {
    // First verify all required variables are present
    const requiredVars = {
      DOCUSIGN_PRIVATE_KEY: process.env.DOCUSIGN_PRIVATE_KEY,
      DOCUSIGN_INTEGRATION_KEY: process.env.DOCUSIGN_INTEGRATION_KEY,
      DOCUSIGN_USER_ID: process.env.DOCUSIGN_USER_ID,
      DOCUSIGN_ACCOUNT_ID: process.env.DOCUSIGN_ACCOUNT_ID,
      DOCUSIGN_BASE_PATH: process.env.DOCUSIGN_BASE_PATH,
      DOCUSIGN_TEMPLATE_ID: process.env.DOCUSIGN_TEMPLATE_ID
    };

    const missingVars = Object.entries(requiredVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }

    // Format private key with proper RSA format
    let privateKey = process.env.DOCUSIGN_PRIVATE_KEY;
    
    // Remove any existing headers/footers and extra whitespace
    privateKey = privateKey
      .replace(/-----BEGIN RSA PRIVATE KEY-----/g, '')
      .replace(/-----END RSA PRIVATE KEY-----/g, '')
      .replace(/\\n/g, '')
      .replace(/\s+/g, '')
      .trim();

    // Add proper RSA headers and format
    privateKey = `-----BEGIN RSA PRIVATE KEY-----\n${privateKey.match(/.{1,64}/g).join('\n')}\n-----END RSA PRIVATE KEY-----`;

    console.log('DocuSign Authentication:', {
      baseUrl: process.env.DOCUSIGN_BASE_PATH,
      integrationKey: process.env.DOCUSIGN_INTEGRATION_KEY,
      keyFormat: {
        hasHeader: privateKey.includes('-----BEGIN RSA PRIVATE KEY-----'),
        hasFooter: privateKey.includes('-----END RSA PRIVATE KEY-----'),
        hasLineBreaks: privateKey.includes('\n'),
        length: privateKey.length,
        firstLine: privateKey.split('\n')[1]?.substring(0, 20) + '...'
      }
    });

    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH);

    const response = await apiClient.requestJWTUserToken(
      process.env.DOCUSIGN_INTEGRATION_KEY,
      process.env.DOCUSIGN_USER_ID,
      ['signature', 'impersonation'],
      privateKey,
      3600
    );

    if (!response?.body?.access_token) {
      throw new Error('No access token received from DocuSign');
    }

    return response.body.access_token;
  } catch (error) {
    console.error('DocuSign Authentication Error:', {
      message: error.message,
      response: error.response?.body,
      stack: error.stack
    });
    throw new Error(`DocuSign authentication failed: ${error.message}`);
  }
};