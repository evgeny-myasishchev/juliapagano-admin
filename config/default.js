module.exports = {
  build: {
    devtools: true,
  },
  auth0: {
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
  },
};
