const axios = require("axios");

async function getToken() {
  try {
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        audience: process.env.AUDIENCE,
        grant_type: "client_credentials"
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Auth0 token error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to acquire Auth0 token");
  }
}

module.exports = { getToken };