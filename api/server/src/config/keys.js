// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const FACEBOOK_TOKENS = {
 FACEBOOK_CONSUMER_KEY: "2287506464694314",
 FACEBOOK_CONSUMER_SECRET: "6f056b0e75ff859d433a180321ae1f5c",
 FACEBOOK_ACCESS_TOKEN: "SOME ACCESS TOKEN",
 FACEBOOK_TOKEN_SECRET: "SOME TOKEN SECRET"
};

const DB_USER = "hemant19";
const DB_PASSWORD = "temp@password19";
const MONGODB = {
  MONGODB_URI: `mongodb://hemant19:${encodeURIComponent('temp@password19')}@ds141208.mlab.com:41208/demo-contact-db`
};


const SESSION = {
  COOKIE_KEY: "thisappisawesome"
};

const KEYS = {
  ...FACEBOOK_TOKENS,
  ...MONGODB,
  ...SESSION
};

module.exports = KEYS;
