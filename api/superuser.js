const API = require('./_api');
const { expect } = require('../environments/config');

const { 
  getRandomString, 
  getResponseError 
} = require('../utils/helpers');


class Superuser extends API {

  constructor(account) {
    super(account);
  }


  /**
   * Refund a payment
   *
   * @function refundPayment
   * @param payload payload object
   * @param token Superuser token
  */
  async refundPayment(paymentInfoId = null, token) {
    let payload = {
        paymentInfoId: paymentInfoId, 
        refundReason: `reason -- ${getRandomString()}`
      }

    return await this.post(`/superuser/refundPayment`, payload, token);
  };


  /**
   * Refund a ticket
   *
   * @function refundTicket
   * @param ticketId ID of ticket
   * @param token Superuser token
  */
  async refundTicket(ticketId = null, token) {
    let payload = { ticketId: ticketId }

    return await this.post(`/superuser/refundTicket`, payload, token);
  };


  /**
   * Refund a ticket
   *
   * @function toggleSuperuser
   * @param email user email
   * @param token Superuser token
  */
  async toggleSuperuser(email, token) {  
    const response = await this.patch(`/superUser/toggleSuperUser/${email}`, {}, token);
    expect(response.status).to.equal(200, `Unable to update supueruser status due to ${getResponseError(response)}`)
    expect(response.body.result).to.equal('User is now a super user');

    return response;
  };


  /**
   * Deletes all events of an artist brand.
   * Conditions:
   * Must be superuser, artist brands slug should have "test" and no events that has sales.
   * @function deleteAllEvents
   * @param artistBrandId ID of artist brand
   * @param token Superuser token
  */
  async deleteAllEvents(artistBrandId = null, token) {
  
    return await this.delete(`/superuser/artist_brands/${artistBrandId}/events`, token);
  };
}

module.exports = Superuser;
