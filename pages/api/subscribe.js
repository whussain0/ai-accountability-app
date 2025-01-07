// pages/api/subscribe.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    // Log the email (you can modify this to save to a file or database)
    console.log('Received email:', email);

    // For now, just log and return success
    return res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ message: 'Error saving subscription' });
  }
}