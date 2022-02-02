const moment = require('moment');

const { 
  paymentIntent, 
  ticketPaymentIntent,
  tippingPaymentIntent,
  addonPaymentIntent,
  merchPaymentIntent 
} = require('../data/payment-intent-payload');

/**
 * Get event details url using the event slug.
 *
 * @param {String} slug Event slug
 */
exports.getEventUrlFor = (slug) => {
  return `${urls.ui_v2.home}/m/${slug}`;
}


/**
 * Get today's date in YYYY-MM-DD format.
 *
 * @exports today
 * @return {Date} Today in YYYY-MM-DD date format.
*/
exports.today = () => moment(Date.now()).format('YYYY-MM-DD');


/**
 * Returns formatted response error
 *
 * @param response response object
*/
exports.getResponseError = (response) => {
  let responseBody = response.error || response.message || response.body;

  return `\n\n\tResponse: ${JSON.stringify(responseBody)}`
};


/**
 * Returns formatted request payload
 *
 * @param payload response object
*/
exports.getRequestPayload = (payload) => {
  return `\n\n\tPayload: ${JSON.stringify(payload)}`
};


/**
 * Checks if a value is null or undefined.
 * If it is not null and is not undefined, then the value then 'exists'.
 *
 * @function exists
 * @param value A value
*/
exports.exists = (value) => {
  return (value !== undefined && value !== null);
};






/************************* GENERATE DATA ********************************/


/**
 * Generate sample event data.
 *
 * @function generateEvent
 * @param eventType Event type
 * @param daysFromNow Number of days from today
*/
exports.generateEvent = (eventType = "stream", daysFromNow = 365) => {
  const eventDate = `${moment(Date.now()).add(daysFromNow, 'days').format('YYYY-MM-DD HH:mm')} UTC`;
  const event = {
    displayName: `API_Moment_${this.getRandomString().replace(/-/g, '')}`,
    ticketPrice: this.getRandomInt(900, 999),
    ticketCap: this.getRandomInt(1, 999),
    duration: 180,
    datetime: eventDate,
    streamProvider: "mux",
    backupStreamProvider: "ivs",
    eventType: eventType,
    isDvr: "false"
  };

  return event;
};


/**
 * Generate sample afterparty data.
 *
 * @function generateAfterparty
 * @param daysFromNow Number of days from today
*/
exports.generateAfterparty = (daysFromNow = 365) => {
  const afterpartyDate = `${moment(Date.now()).add(daysFromNow, 'days').format('YYYY-MM-DD HH:mm')} UTC`;
  const afterparty = {
    displayName: `API_Afterparty_${this.getRandomString().replace(/-/g, '')}`,
    description: `Description_Afterparty_${this.getRandomString().replace(/-/g, '')}`,
    ticketPrice: this.getRandomInt(900, 999),
    ticketCap: this.getRandomInt(1, 999),
    duration: 180,
    datetime: afterpartyDate,
    isDvr: "false",
    vodDuration: null,
  };

  return afterparty;
};


/**
 * Generate sample tier data.
 *
 * @function generateTier
 * @param type Tier type
 * @param daysFromNow Number of days from today
*/
exports.generateTier = (type = "percentage", daysFromNow = 365, isAfterMoment = false) => {
  const afterMomentDays = isAfterMoment ? this.getRandomInt(1, 5) : (-1 * this.getRandomInt(1, 5));
  const tierDate = `${moment(Date.now()).add(daysFromNow + afterMomentDays, 'days').format('YYYY-MM-DD HH:mm')} UTC`;
  const tier = {
    name: `API_Tier_${this.getRandomString().replace(/-/g, '')}`,
    increaseType: type,
    increase: this.getRandomInt(1, 99),
    applyToBundles: false,
    isBase: false,
    datetime: tierDate,
  };

  return tier;
};


/**
 * Generate sample merch gallery data.
 *
 * @function generateMerchGallery
*/
exports.generateMerchGallery = (merchItem) => {
  if (merchItem) {
    return {
      title: `Merch Gallery Item ${this.getRandomString()}`,
      description: `Merch Gallery Item Description ${this.getRandomString()}`,
      price: 10000,
      cap: 999,
      goods: [{
        id: merchItem.id,
        name: merchItem.name,
        productId: merchItem.id
      }]
    }
  } else {
    return {
      title: `Merch Gallery Item ${this.getRandomString()}`,
      description: `Merch Gallery Item Description ${this.getRandomString()}`,
      price: 100,
      cap: 999
    }
  }
};


/**
 * Generate a random access code.
 *
 */
exports.newAccessCode = () => {
  return this.getRandomString().substr(1, 8).toUpperCase();
}


/**
 * Generate a random integer value using a range.
 *
 * @param {Number} min Minimum integer value
 * @param {Number} max Maximum integer value
 */
exports.getRandomInt = (min = 000000000, max = 999999999) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Generate a random string.
 *
 */
exports.getRandomString = (prefix = "", suffix = "") => {
  let part1 = Math.random().toString(36).substring(4);
  let part2 = Math.random().toString(36).substring(6);
  let part3 = Math.random().toString(36).substring(5);
  return `${prefix}${part1}${part2}${part3}${suffix}`.substr(1, 15);
}


/**
 * Generate a random email.
 *
 */
exports.getRandomEmail = () => {
  let randomString = this.getRandomInt();

  return `${randomString}@mailinator.com`;
}


/**
 * Generate sample payment intent data.
 *
 * @function generatePaymentIntent
 * @param eventIds List of event IDs
 * @param price price of event
*/
exports.generatePaymentIntent = (eventIds, { price = 0 }, paymentMethodId)  =>{
  if (!Array.isArray(eventIds)) eventIds = [eventIds];

  return paymentIntent(eventIds, price, paymentMethodId);
}


/**
 * Generate sample ticket payment intent data.
 *
 * @function generateTicketPaymentIntent
 * @param eventIds List of event IDs
 * @param price price of event
*/
exports.generateTicketPaymentIntent = (eventIds, { price = 0, paymentMethodId, email = "test.mh.staging+apitests03@gmail.com" }) => {
  if (!Array.isArray(eventIds)) eventIds = [eventIds];

  return ticketPaymentIntent(eventIds, price, paymentMethodId, email);
}


/**
 * Generate sample tipping payment intent data.
 *
 * @function generateTippingPaymentIntent
 * @param eventId Event ID
 * @param price price of event
 * @param paymentMethodID payment method id to use in tipping

*/
exports.generateTippingPaymentIntent = (eventId, { price = 0, paymentMethodId }) => {
  return tippingPaymentIntent(eventId, price, paymentMethodId);
}


/**
 * Generate sample add-on payment intent data.
 *
 * @function generateAddOnPaymentIntent
 * @param eventId Event ID
 * @param price price of event
*/
exports.generateAddOnPaymentIntent = (parentEventId, { addonType, addonId, paymentMethodId, ticketId }) => {
  return addonPaymentIntent(parentEventId, addonType, addonId, paymentMethodId, ticketId);
}


/**
 * Generate sample merch payment intent data.
 *
 * @function generateMerchPaymentIntent
 * @param eventIds List of event IDs
 * @param merch merch object
*/
exports.generateMerchPaymentIntent = (eventIds, merch, paymentMethodId) => {
  if (!Array.isArray(eventIds)) eventIds = [eventIds];

  return merchPaymentIntent(eventIds, merch, paymentMethodId);
}


/**
 * Generate random poll payload with question and 3 answers.
 *
 * @function generateRandomPoll
*/
exports.generateRandomPoll = () => {
  const question = `Q-${this.getRandomInt(1, 999999)}`;
  const answers = [
    `A-${this.getRandomInt(1, 999999)}`,
    `B-${this.getRandomInt(1, 999999)}`,
    `C-${this.getRandomInt(1, 999999)}`
  ];

  return {
    question,
    answers,
    payload: { question, answers: answers.map((_) => { return { answer: _ }}) }
  };
};


/**
 * Generates a user data, fan or artist
 *
 * @function generateUserData
 * @param user type of user to be created; fan or artist
 * @param testDisplayName include "test-" string in display name. Defaults to true
*/
exports.generateUserData = (user='artist', testDisplayName=true ) => {
  user == 'artist' ? 'artist' : 'fan';

  let displayName;

  testDisplayName == true
    ? displayName = `test-${user}-${this.getRandomString()}`
    : displayName = `${user}-${this.getRandomString()}`

  return {
    displayName: displayName, 
    email: `test.mh.staging+${user}-${this.getRandomInt()}@gmail.com`, 
    firstName: `API Automation ${this.getRandomInt()}`, 
    lastName: `User ${this.getRandomInt()}`, 
    password: "LKwHkjx2Y8IssvvD!",
    timezone: "America/Los_Angeles"
    }
  };


/**
 * Checks if a value is an array and is not empty.
 *
 * @function hasItems
 * @param value A value
*/
exports.hasItems = (value) => {
  return (Array.isArray(value) && value.length > 0);
};

