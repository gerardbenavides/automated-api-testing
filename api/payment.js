const API = require('./events');
const { expect } = require('../environments/config');

const {
  getRandomString, 
  getRandomInt, 
  getResponseError 
} = require('../utils/helpers');




class Payment extends API {

  constructor(account) {
    super(account);
  }



  /**
   * Buys ticket from an event
   *
   * @function buyEventTicket
   * @param payload Payment intent payload
   * @param token Superuser token
  */
  async buyEventTicket(payload, token) {
    const response = (await this.post(`/payment/intent`, payload, token));
    
    expect(response.status).to.equal(200, `Unable to buy event ticket due to ${getResponseError(response)}`)
    
    return response.body;
  };

}


module.exports = Payment;
