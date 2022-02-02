const API = require('./_api');

const { 
  getRandomString, 
  getRandomInt, 
  generateEvent, 
  generateAfterparty, 
  generateTier  
} = require('../utils/helpers')

const { request } = require('../environments/config')

class Events extends API {

  constructor(account) {
    super(account);
  }


  /**
   * Create an event. Returns event information.
   *
   * @function createEvent
   * @param eventType Event type
   * @param daysFromNow Number of days from today
  */
  async createEvent(eventType = "stream", token = null, daysFromNow = 365) {
    const event = generateEvent(eventType, daysFromNow);
    let createdEvent = (await this.post(`/events`, event, token));

    if(createdEvent.status !== 200) throw new Error(createdEvent.body.error);

    return createdEvent.body.event;
  };


  /**
   * Create an afterparty. Returns afterparty information.
   *
   * @function createAfterparty
   * @param order Afterparty order. Either 'next' or 'previous'. Defaults to 'next'.
   * @param daysFromNow Number of days from today
  */
  async createAfterparty(order = "next",  token = null, daysFromNow = 365) {
    const event = generateEvent("stream", daysFromNow);

    const eventId = (await this.post(`/events`, event, token)).body.event.id;
    if (eventId === undefined) throw new Error(`Failed to get event ID`)

    const afterparty = generateAfterparty(daysFromNow);
    let createdAfterparty = (await this.post(`/events/${eventId}/vip?order=${order}`, afterparty, token));
    if (createdAfterparty.status != 200) throw new Error(createdAfterparty.body.error);

    return createdAfterparty.body.event;
  };


  /**
   * Create a tier. Returns tier information.
   *
   * @function createTier
   * @param type Tier type
   * @param daysFromNow Number of days from today
  */
  async createTier(type = "percentage",  token = null, daysFromNow = 365) {
    const event = generateEvent("stream", daysFromNow);
    const eventObj = (await this.post(`/events`, event, token)).body.event;
    const eventId = eventObj.id;
    const eventSlug = eventObj.slug;

    const tier = generateTier(type);
    const response = (await this.post(`/events/${eventId}/tiers`, tier, token)).body;

    return {
      eventId: eventId,
      eventSlug: eventSlug,
      tier: response
    }
  };



  /**
   * Create a house. Returns house information.
   *
   * @function createHouse
   * @param eventId Event ID
  */
  async createHouse(eventId, token = null) {
    const house = { displayName: `House ${getRandomInt(10001, 99999)}` };
    return (await this.post(`/events/${eventId}/houses/create`, house, token)).body;
  };



  /**
   * Create a promotion. Returns promotion information.
   *
   * @function createPromotion
   * @param daysFromNow Number of days from today
  */
  async createPromotion(token = null, daysFromNow = 365) {
    const event = generateEvent("stream", daysFromNow);
    const eventId = (await this.post(`/events`, event, token)).body.event.id;

    const promotion = { name: getRandomString() };
    const response = (await this.post(`/events/${eventId}/promotions`, promotion, token)).body.promotion;

    return {
      eventId: eventId,
      promotion: response
    }
  };


  /**
   * Create a merch gallery to an event. Returns the first merch bundle information.
   *
   * @function createMerchGallery
   * @param eventId id of event
   * @param merchGalleryItem merch object
   * @param token token to be used
  */
  async createMerchGallery(eventId, merchGalleryItem, token = null) {
    let payload = {
      name: merchGalleryItem.title,
      description: merchGalleryItem.description,
      merchType: "merch_gallery",
      bundleCap: merchGalleryItem.cap,
      price: merchGalleryItem.price,
      physicalGoods: merchGalleryItem.goods ? merchGalleryItem.goods : [],
    }
    
    const merchGalleryBundles = (await this.patch(`/events/${eventId}/bundles`, payload, token)).body.event.merchGalleryBundles[0];

    return merchGalleryBundles;
  };


/**
 * Import Shopify items to an event
 *
 * @function importShopifyViaCsv
 * @param file path to file
 * @param token token to be used
*/
    async importShopifyViaCsv(file, eventId, token = null) {
    
    const response = await request
    .post(`/events/${eventId}/import`)
    .set('Authorization', `Bearer ${token}`)
    .attach('file', file)
    
    return response;
  };


  /**
   * Starts an event
   *
   * @function startEvent
   * @param eventId Event ID
   * @param token token to be used
  */
     async startEvent(eventId, token = null) {
      let startEvent = await this.post(`/events/${eventId}/start`, {}, token);
  
      if(startEvent.status !== 200) throw new Error(startEvent.body.error);
  
      return startEvent.body;
    };


    /**
   * Stops an event
   *
   * @function stopEvent
   * @param eventId Event ID
   * @param token token to be used
  */
       async stopEvent(eventId, token = null) {
        let stopEvent = await this.post(`/events/${eventId}/stop`, {}, token);
    
        if(stopEvent.status !== 200) throw new Error(stopEvent.body.error);
    
        return stopEvent.body;
      };
}

module.exports = Events;
