

const { baseUrl } = require('./environments')
const apiV1Url = `${baseUrl}/api/v1`;
const request = require('supertest')(apiV1Url);
const baseRequest = require('supertest')(baseUrl);
const expect = require('chai').expect;
const moment = require('moment');
const { getRandomInt, today } = require('../utils/helpers');

// This is a JavaScript-based config file containing every Mocha option plus others.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.

module.exports = {
  'allow-uncaught': false,
  'async-only': false,
  bail: false,
  'check-leaks': false,
  color: true,
  delay: false,
  diff: true,
  exit: false, // could be expressed as "'no-exit': true"
  extension: ['js'],
  // fgrep: something, // fgrep and grep are mutually exclusive
  //file: ['/path/to/some/file', '/path/to/some/other/file'],
  'forbid-only': false,
  'forbid-pending': false,
  'full-trace': false,
  global: ['jQuery', '$'],
  // grep: something, // fgrep and grep are mutually exclusive
  growl: false,
  //ignore: ['/path/to/some/ignored/file'],
  'inline-diffs': false,
  // invert: false, // needs to be used with grep or fgrep
  jobs: 1,
  package: './package.json',
  parallel: false,
  recursive: false,
  reporter: 'node_modules/mochawesome',
  'reporter-option': [
    'overwrite=true',
    `reportTitle=${today()} Test Run`,
    'showPassed=false',
    `reportFilename=${today()}-test-run`,
    'consoleReporter=spec'
  ],
  //require: '@babel/register',
  retries: 1,
  slow: '75',
  sort: false,
  timeout: '60000', // same as "timeout: '2s'"
  // timeout: false, // same as "'no-timeout': true" or "timeout: 0"
  'trace-warnings': true, // node flags ok
  ui: 'bdd',
  'v8-stack-trace-limit': 100, // V8 flags are prepended with "v8-"
  watch: false,
  'watch-files': ['lib/**/*.js', 'test/**/*.js'],
  'watch-ignore': ['lib/vendor'],

  // URL
  baseUrl: baseUrl,
  apiV1Url: apiV1Url,

  request: request, 
  baseRequest: baseRequest, 
  expect: expect, 
  moment: moment,

  // DATA
  users: {
    artist: {
      userId: "f8b540b3-4d36-491d-b2c9-4ab0966067f4",
      firstName: null,
      lastName: null,
      email: "test.mh.staging+apitests03@gmail.com",
      password: "LKwHkjx2Y8IssvvD!",
      access: "super",

      // Artist Brand information
      displayName: "test.mh.staging+apitests03",
      slug: "testmhstagingapitests03",
      artistBrandId: "b29b7874-1a9f-4494-ac92-1d6199343fb6",
      eventId: "8a03fdbe-fe2b-4eb7-a8aa-1acaca999a24",
      eventSlug: "testmhstagingapitests03-main-moment-event-do-not-touch",
      ticketId: "887e8558-4dba-4c4e-aa5e-5d41af6d0c70",
      bundleId: "23418e5e-85e6-4a2a-b29f-5c52e028c07d",
      purchasedGoodId: "4afe9da3-66bf-4886-86fd-d8e76a57be3c",
      meetId: "883d73a1-9d60-4316-9a3d-900c6bb14ce1",
      meetTicketId: "c87f266e-c80a-44af-8838-90270e9b0cb7",
      paymentMethodId: "pm_1KOTwkIm56RF6P9okIqriheL",
      merchItem: {
        name: 'Merch 2',
        id: "fd399884-1d9c-42fe-a82c-ddc0b13c34c4",
      }
    },
    artist2: {
      userId: "729d132d-b2a9-4f2b-8c8a-60665ad11e6e",
      firstName: "Test MH",
      lastName: "Staging API Tests2",
      email: "test.mh.staging+apitests02@gmail.com",
      password: "LKwHkjx2Y8IssvvD!",
      isSuper: true,
      isVerified: false,
 
      // Artist Brand information
      displayName: "Test MH Staging API Tests2",
      slug: "testmhstagingapitests2",
      artistBrandId: "ed3da2bb-b22e-42ee-927e-157f936940ac",
      eventId: "0b1f95e9-dd14-4276-9c1d-de2116d20d48",
      eventSlug: "testmhstagingapitests2-first-moment",
      ticketId: "a35ef375-0c1b-4e64-a823-207b36381394",
      paymentMethodId: "pm_1Jq1JMIm56RF6P9oJbs4z3xa",
      merchItem: {
        name: 'Merch 2',
        id: "e7f393aa-277d-4aa3-aa13-07ab490f7def",
      }
    },
    artist_nonsuperuser: {
      userId: "ee9e4f84-754d-4b9e-81c6-7344f8c15e4e",
      firstName: "Test MH",
      lastName: "Staging non-superuser",
      email: "test.mh.staging+non-superuser@gmail.com",
      password: "LKwHkjx2Y8IssvvD!",
      isSuper: false,
      isVerified: true,

      // Artist Brand information
      displayName: "testmhstaging-nonsuperuser",
      slug:"testmhstagingnonsuperuser",
      artistBrandId: "03d0b30a-1d32-4ae1-aecd-d07c372a5fa4"
    },
  },
  paymentMethodIds: {
    chargeSuccess: "pm_card_us",
    secure3dChargeSuccess: "pm_card_threeDSecure2Required",
    chargeDeclined: "pm_card_chargeDeclined",
    insufficientBalance: "pm_card_chargeDeclinedInsufficientFunds",
    fraudulent: "pm_card_chargeDeclinedFraudulent",
  },

  invalidUUID: `auto-test-invalid-uuid-${getRandomInt(1, 999999)}`,
  defaultPassword: "LKwHkjx2Y8IssvvD!",

  errorMessage: {
    requiresSuperuser: `Must be a super user to access this route.`
  },
};
