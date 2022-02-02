/** Checks if "env=" is available on cli arguments
    If not, returns Stage baseUrl as default
 */
const env_arg = process.argv.find( arg => {
  return arg.match(/env=/)
  // return argument if it matches string `env=`
})

let baseUrl, matchString = 'env=';

switch (env_arg) {
  case matchString + 'dev':
      baseUrl = 'https://api.momenthousedev.com';
      break;
  case matchString + 'stage':
      baseUrl = 'https://api.momenthousestage.com';
      break;
  default:
      // Falls back to running in stage when env is not defined
      baseUrl = 'https://api.momenthousestage.com';
      break;
}

module.exports = { baseUrl, env_arg }