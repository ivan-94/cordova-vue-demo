/* eslint-disable */
/**
 * defined CSP(Content Security Rules)
 * @type {Object}
 * @see https://content-security-policy.com 
 */
module.exports = {
  'default-src': "*",
  'style-src':   "'self' 'unsafe-inline'",
  'script-src':  "'self' 'unsafe-inline' 'unsafe-eval'",
  'img-src':     "* data:"
}