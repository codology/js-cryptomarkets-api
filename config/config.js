require('dotenv').config();

module.exports = {
  COINCAP_API_URL: process.env.COINCAP_API_URL,
  PORT: process.env.PORT || 3000
};
