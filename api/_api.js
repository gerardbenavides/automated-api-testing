const { 
  request, 
  baseRequest, 
  expect
} = require('../environments/config');

const { 
  getResponseError, 
  generateUserData
} = require('../utils/helpers')

class API {

  constructor(account) {
    this.user = (account !== undefined) ? account.email : null;
    this.pass = (account !== undefined) ? account.password : null;
  }


  /**
   * Make a get request
   *
   * @function get
   * @param {String} url API 'GET' URL string.
   * @param {String} userToken user's access token, defaults to null
   * @return {Response} Response from the get request.
  */
  async get(url, userToken = null) {
    if (this.user === null || this.pass === null || userToken === null) return await request.get(url);

    return url, await request
      .get(url)
      .set('Authorization', `Bearer ${userToken}`);
  }


  /**
   * Make a post request
   *
   * @function post
   * @param {String} url API 'POST' URL string.
   * @param {Object} payload Payload information.
   * @return {Response} Response from the post request.
  */
  async post(url, payload, userToken = null, sendFormData = null) {
    if (this.user === null || this.pass === null || userToken === null) return await request.post(url).send(payload);

    if(sendFormData !== null) {
      return await request
      .post(url)
      .set('Authorization', `Bearer ${userToken}`)
      .attach(sendFormData.key, sendFormData.value)
    } else {
      return await request
      .post(url)
      .set('Authorization', `Bearer ${userToken}`)
      .send(payload);
    }
  }


  /**
   * Make a patch request
   *
   * @function patch
   * @param {String} url API 'PATCH' URL string.
   * @param {Object} payload Payload information.
   * @return {Response} Response from the patch request.
  */
  async patch(url, payload, userToken = null) {
    if (this.user === null || this.pass === null || userToken === null) return await request.patch(url).send(payload);

    return await request
      .patch(url)
      .set('Authorization', `Bearer ${userToken}`)
      .send(payload);
  }


  /**
   * Make a delete request
   *
   * @function delete
   * @param {String} url API 'DELETE' URL string.
   * @return {Response} Response from the delete request.
  */
  async delete(url, userToken = null) {
    if (this.user === null || this.pass === null || userToken === null) return await request.delete(url);

    return await request
      .delete(url)
      .set('Authorization', `Bearer ${userToken}`);
  }


  /**
   * Retrieves user token.
   *
   * @function getUserToken
   * @param email User email
   * @param password User password
  */
  async getUserToken(email, password) {
    const payload = { email, password };
    const login = await this.post('/auth/login', payload);

    return login.body.token;
  };


  /**
   * Make a base url get request
   *
   * @function get
   * @param {String} url API 'GET' URL string.
   * @return {Response} Response from the get request.
  */
  async bget(url, userToken = null) {
    if (this.user === null || this.pass === null || userToken === null) return await baseRequest.get(url);

    return await baseRequest
      .get(url)
      .set('Authorization', `Bearer ${userToken}`);
  }


  /**
   * Gets free ticket to the event
   *
   * @function getFreeEventTicketId
   * @param envetId ID of event
   * @param token Superuser token
  */
  async getFreeEventTicketId(eventId, token) {
    const payload = {
      "email": "free@momenthouse.com",
      "eventId": eventId,
      "ticketType": "free",
    }
    return (await this.post(`/tickets`, payload, token)).body.id
  };


  /**
   * Deletes event
   *
   * @function deleteEvent
   * @param eventId ID of event
   * @param token Superuser token
  */
  async deleteEvent(eventId, token) {
  const response = (await this.delete(`/events/${eventId}`, token));

  expect(response.status).to.equal(200, `Event not deleted due to ${getResponseError(response)}`);
  console.log(`Successfully delete event with ID: ${eventId}`);
  };




  /**
   * Creates a user, fan or artist
   *
   * @function createUser
   * @param user type of user to be created; fan or artist
   * @returns {any} responseData response.body.user data from API request
   * @returns {Object} userData user data generated randomly

  */
  async createUser(user='artist', userData=null) {
  let response, payload; 
  
  userData == null
    ? payload = generateUserData(user)
    : payload = userData

  user == 'fan'
    ? response = (await this.post(`/users?isArtist=false`, payload))
    : response = (await this.post(`/users?isArtist=true`, payload))

    expect(response.status).to.equal(200, `User account not created due to ${getResponseError(response)}`);
  
    if (response.status == 504) console.log(`Received error 504 when creating a user`);
    
    return { responseData: response.body.user, userData: payload };
  };

  
  /**
   * Creates a user, fan or artist.
   * Currently has an issue CORE-2971
   * @function deleteUserByEmail
   * @param user type of user to be created; fan or artist
   * @param token user token
  */
  async deleteUserByEmail(email, token) {
    const response = await this.delete(`/superuser/${email}`, token)
    expect(response.status).to.equal(200, `User account cannot be deleted due to ${getResponseError(response)}`);
  
    return response.body;
  };


  /**
   * Gets user private information
   * 
   * @function getUserPrivateInformation
   * @param userId ID of the user
   * @param token user token
  */
  async getUserPrivateInformation(userId, token) {
    const response = await this.get(`/users/${userId}`, token)
    expect(response.status).to.equal(200, `Cannot get user private information due to ${getResponseError(response)}`);
    
    return response.body;
  };


  /**
   * Gets user private information
   * 
   * @function checkIfUserExist
   * @param userId ID of the user
  */
  async checkIfUserExist(email) {
    const payload = { email: email }

    const response = await this.post(`/users/has_account`, payload)
    expect(response.status).to.equal(200, `Unable to check if user exists due to ${getResponseError(response)}`);
    
    return response.body.hasAccount;
  };


  /**
   * Gets user private information
   * 
   * @function getTicketInformation
   * @param ticketId ID of the ticket
  */
  async getTicketInformation(ticketId, token) {
    const response = await this.get(`/tickets/${ticketId}`, token)
    expect(response.status).to.equal(200, `Unable to get ticket information due to ${getResponseError(response)}`);
    
    return response.body;
  };


  /**
   * Gets artist brand information
   * 
   * @function getArtistPublicInformation
   * @param userId ID of the user
  */
   async getArtistPublicInformation(userId) {
    const response = await this.get(`/users/${userId}/artist_brands`)
    expect(response.status).to.equal(200, `Unable to get artist brand public information due to ${getResponseError(response)}`);
    
    return response.body;
  };
  

  /**
   * Retrieves user token.
   *
   * @function getArtistBrandPrivateEvents
   * @param artistBrandId ID of the artist brand
   * @param token user token
  */
  async getArtistBrandPrivateEvents(artistBrandId, token) {
    const response = await this.get(`/artist_brands/${artistBrandId}/private/events`, token);

    return response.body;
  };


  /**
   * Delete an event ticket
   *
   * @function deleteTicket
   * @param eventId ID of event
   * @param ticketId ID of ticket
   * @param token Superuser token
  */
   async deleteTicket(eventId = null, ticketId = null, token) {
  
    return await this.delete(`/superuser/ticket/${eventId}/${ticketId}`, token);
  };


  /**
   * Gets ticket payment info
   *
   * @function getTicketPaymentInfo
   * @param ticketId ID of ticket
   * @param token Superuser token
  */
  async getTicketPaymentInfo(ticketId, token) {
    return (await this.get(`/superuser/payment_info/tickets/${ticketId}`, token)).body.paymentInfo;
  };
  
  
  /**
   * Gets ticket payment info id
   *
   * @function getTicketPaymentInfoId
   * @param ticketId ID of ticket
   * @param token Superuser token
  */
  async getTicketPaymentInfoId(ticketId, token) {
    return (await this.get(`/superuser/payment_info/tickets/${ticketId}`, token)).body.paymentInfo.lineItems[0].paymentInfoId;
  };

}

module.exports = API;
