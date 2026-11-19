const connectDB = require('../../backend/config/db');
const Breed = require('../../backend/models/Breed');

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Netlify rewrites /api/* to this function. Support both the
    // rewritten function path and the original API path.
    let routePath = event.path || '/';
    routePath = routePath.replace(/^\\/.netlify\\/functions\\/api/, '');
    routePath = routePath.replace(/^\\/api/, '') || '/';

    if (routePath === '/health') {
      return json(200, { status: 'ok' });
    }

    if (routePath === '/breeds' || routePath === '/breeds/') {
      const breeds = await Breed.find();
      return json(200, breeds);
    }

    const match = routePath.match(/^\\/breeds\\/([^/]+)\\/?$/);
    if (match) {
      const name = decodeURIComponent(match[1]);
      const breed = await Breed.findOne({ name: new RegExp(`^${name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}$`, 'i') });
      if (!breed) return json(404, { message: 'Breed record not found' });
      return json(200, breed);
    }

    return json(404, { message: 'API route not found' });
  } catch (error) {
    console.error('Netlify API function error:', error);
    return json(500, { error: 'Internal server error' });
  }
};
