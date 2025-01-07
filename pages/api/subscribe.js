// pages/api/subscribe.js
import Airtable from 'airtable';

// Configure Airtable with environment variables and log configuration
const baseId = process.env.AIRTABLE_BASE_ID;
const tableId = process.env.AIRTABLE_TABLE_ID;
const token = process.env.AIRTABLE_TOKEN;

// Log configuration without exposing full token
console.log('Airtable Config:', {
  baseId,
  tableId,
  hasToken: !!token,
});

const base = new Airtable({
  apiKey: token
}).base(baseId);

const table = base(tableId);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      
      // Log received data
      console.log('Attempting to create record with:', {
        email,
        timestamp: new Date().toISOString(),
        configuration: {
          baseId,
          tableId,
          hasToken: !!token
        }
      });

      // Create record in Airtable
      const createdRecords = await table.create([
        {
          fields: {
            'Email Address': email,
            'Time Stamp': new Date().toISOString()
          }
        }
      ]);

      console.log('Successfully created record:', createdRecords);
      return res.status(200).json({ 
        message: 'Subscription successful',
        recordId: createdRecords[0].id
      });
    } catch (error) {
      // Detailed error logging
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack,
        config: {
          baseId,
          tableId,
          hasToken: !!token
        }
      });
      return res.status(500).json({ 
        message: 'Error saving subscription',
        error: error.message
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}