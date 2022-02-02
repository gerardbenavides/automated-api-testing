const { 
  expect, 
  users, 
  invalidUUID, 
  purchasedGoods, 
  paymentInfoIds, 
  errorMessage , 
} = require('../../environments/config');

const { 
  getRandomString, 
  getRandomInt, 
  getRandomEmail, 
  getResponseError, 
  exists, 
  generateMerchGallery, 
  generatePaymentIntent,
  generateTicketPaymentIntent,
  generateMerchPaymentIntent,
  generateUserData
} = require('../../utils/helpers');

// Accounts to use
const account = users.artist;
const ticketId = account.ticketId;
const artistBrandId = account.artistBrandId;
const nonSuperuser = users.artist_nonsuperuser;

// APIs to use
const Superuser = require('../../api/superuser');
const Event = require('../../api/events');
const Payment = require('../../api/payment');

const api = new Superuser(account);
const eventApi = new Event(account);
const paymentApi = new Payment(account);

describe('SUPERUSER', async () => {

    let nonSuperuserToken, token;
    before(async ()  => {
      nonSuperuserToken = await api.getUserToken(nonSuperuser.email, nonSuperuser.password);
      token = await api.getUserToken(account.email, account.password)
    });

    describe('GET', async () => {
      describe('GET /superuser/allArtistBrands - Get all artist brands', async () => {

          it('Should be able to get all artist brand if user is superuser', async () => {
              const response = await api.get(`/superuser/allArtistBrands`, token);

              expect(response.status).to.equal(200, `Unable to get all artist brands. ${getResponseError(response)}`);    
              expect(response.body).to.have.property("artistBrand");
          });

          it('Should not be able to get list of all artist brand if user is not superuser', async () => {
              const response = await api.get(`/superuser/allArtistBrands`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to get all artist brands using nonsuperuser accounts. ${getResponseError(response)}`);    
          });
      });



      describe('GET /superuser/allEmails?s={{searchString}} - Search email', async () => {
          let searchString = (account.email).slice(-15);

          it('Should be able to get all emails related to searchString if user is superuser', async () => {
            const response = await api.get(`/superuser/allEmails?s=${searchString}`, token);

              expect(response.status).to.equal(200, `Unable to get emails related to searchString. ${getResponseError(response)}`);    
              expect(response.body).to.have.property("emails");
              expect(response.body.emails[0].email).to.include(searchString);
          });

          it.skip('Should be able to search for email if search string is empty', async () => {
              const response = await api.get(`/superuser/allEmails?s=`, token);

              expect(response.status).to.equal(204, `Unable to search email if searchString is empty. ${getResponseError(response)}`);    
          });

          it('Should be able to search for email if search string has no related results', async () => {  
              let randomSearchString = `${getRandomString()}+${getRandomInt()}`
              const response = await api.get(`/superuser/allEmails?s=${randomSearchString}`, token);

              expect(response.status).to.equal(200, `Unable to search email if searchString has no related results. ${getResponseError(response)}`);    
          });

          it('Should not be able to search for email if user using email search is not a superuser', async () => {
              const response = await api.get(`/superuser/allEmails?s=${searchString}`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to search email using nonsuperuser account. ${getResponseError(response)}`);    
          });
      });



      describe('GET /superuser/allEvents?s={{searchString}} - Search event', async () => {
          let searchString = (account.eventSlug).slice(-15);

          it('Should be able to get all events related to searchString if user is superuser', async () => {
              const response = await api.get(`/superuser/allEvents?s=${searchString}`, token);

              expect(response.status).to.equal(200, `Unable to get event related to searchString. ${getResponseError(response)}`);    
              expect(response.body).to.have.property("events");
              expect(response.body.events[0].slug).to.include(searchString);
          });

          it('Should be able to search for event if event search string is empty', async () => {                
              const response = await api.get(`/superuser/allEvents?s=`, token);

              expect(response.status).to.equal(204, `Unable to search event if searchString is empty. ${getResponseError(response)}`);    
          });

          it('Should be able to search for event if event search string has no related results', async () => {  
              let randomSearchString = `${getRandomString()}+${getRandomInt()}`
              const response = await api.get(`/superuser/allEvents?s=${randomSearchString}`, token);

              expect(response.status).to.equal(200, `Unable to search event if search string has no related results. ${getResponseError(response)}`);    
          });

          it('Should not be able to search for event if user using event search is not a superuser', async () => {
              const response = await api.get(`/superuser/allEvents?s=${searchString}`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to search event using nonsuperuser account. ${getResponseError(response)}`);    
          });
      });



      describe('GET /superuser/refresh/{{id}} - Refresh Generic Event / Artist Brand / Ticket / User', async () => {

          it('Should be able to refresh an event info given valid eventId', async () => {
              let eventId = users.artist.eventId;

              const response = await api.get(`/superuser/refresh/${eventId}`, token);

              expect(response.status).to.equal(200, `Unable to refresh event info using valid eventId. ${getResponseError(response)}`);    
              expect(response.body).to.have.property("entity");
              expect(response.body.entity).to.equal("event");
              expect(response.body).to.have.property("diff");
              expect(response.body).to.have.property("entityObject");
          });

          it('Should be able to refresh an artist info given valid artistBrandId', async () => {
              let artistBrandId = users.artist.artistBrandId;

              const response = await api.get(`/superuser/refresh/${artistBrandId}`, token);

              expect(response.status).to.equal(200, `Unable to refresh artist brand info using valid artistBrandId. ${getResponseError(response)}`);    
              expect(response.body).to.have.property("entity");
              expect(response.body.entity).to.equal("artist_brand");
              expect(response.body).to.have.property("diff");
              expect(response.body).to.have.property("entityObject");
          });

          it('Should be able to refresh a ticket info given valid ticketId', async () => {
              let ticketId = users.artist.ticketId;

              const response = await api.get(`/superuser/refresh/${ticketId}`, token);

              expect(response.status).to.equal(200, `Unable to refresh ticket info using valid ticketId. ${getResponseError(response)}`);    
              expect(response.body).to.have.property("entity");
              expect(response.body.entity).to.equal("ticket");
              expect(response.body).to.have.property("diff");
              expect(response.body).to.have.property("entityObject");
          });

          it('Should be able to refresh an user info given valid userId', async () => {
              let userId = users.artist.userId;

              const response = await api.get(`/superuser/refresh/${userId}`, token);

              expect(response.status).to.equal(200, `Unable to refresh user info using valid userId. ${getResponseError(response)}`);    
              expect(response.body).to.have.property("entity");
              expect(response.body.entity).to.equal("user");
              expect(response.body).to.have.property("diff");
              expect(response.body).to.have.property("entityObject");
          });

          it('Should be unable to refresh entity if id field is empty', async () => {
              const response = await api.get(`/superuser/refresh/`, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);    
          });

          it('Should not be able to refresh entity if user is not superuser', async () => {
              let userId = users.artist.userId;

              const response = await api.get(`/superuser/refresh/${userId}`, nonSuperuserToken);

              expect(response.status).to.equal(403, `${getResponseError(response)}`);    
          });

          it('Should not be able to refresh entity if given id is not associated to event, artist, ticket or user', async () => {
              const response = await api.get(`/superuser/refresh/${invalidUUID}`, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);    
          });

      });



      describe('GET /superuser/payment_info/tickets/{{ticketId}} - Get ticket payment info', async () => {

          it('Should be able to get ticket payment info', async () => {
            let eventId = (await eventApi.createEvent("stream", token)).id;

            if (eventId) {
                let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token);

                if (payment.status == 200) {
                    let ticketId = payment.ticketId;

                    if (ticketId) {
                      const response = await api.get(`/superuser/payment_info/tickets/${ticketId}`, token);

                      let ticketPaymentInfo = response.body.paymentInfo;

                      expect(response.status).to.equal(200, `Unable to get ticket payment info using valid ticketId ${getResponseError(response)}`);    
                      expect(response.body).to.have.property("paymentInfo");

                      // Check paymentInfo object properties
                      expect(ticketPaymentInfo).to.have.property("id");
                      expect(ticketPaymentInfo).to.have.property("ticketId");
                      expect(ticketPaymentInfo).to.have.property("shippingAddress");
                      expect(ticketPaymentInfo).to.have.property("currency");
                      expect(ticketPaymentInfo).to.have.property("currencyValue");
                      expect(ticketPaymentInfo).to.have.property("targetCurrency");
                      expect(ticketPaymentInfo).to.have.property("targetValue");
                      expect(ticketPaymentInfo).to.have.property("email");
                      expect(ticketPaymentInfo).to.have.property("mailingList");
                      expect(ticketPaymentInfo).to.have.property("refunded");
                      expect(ticketPaymentInfo).to.have.property("createdAt");
                      expect(ticketPaymentInfo).to.have.property("paymentProvider");
                      expect(ticketPaymentInfo).to.have.property("paymentId");
                      expect(ticketPaymentInfo).to.have.property("phone");
                      expect(ticketPaymentInfo).to.have.property("targetServiceFee");
                      expect(ticketPaymentInfo).to.have.property("serviceFeePct");
                      expect(ticketPaymentInfo).to.have.property("receiptNumber");
                      expect(ticketPaymentInfo).to.have.property("discountCode");
                      expect(ticketPaymentInfo).to.have.property("discountValue");
                      expect(ticketPaymentInfo).to.have.property("shippingTargetValue");
                      expect(ticketPaymentInfo).to.have.property("referrer");
                      expect(ticketPaymentInfo).to.have.property("taxTargetValue");
                      expect(ticketPaymentInfo).to.have.property("payoutProcessed");
                      expect(ticketPaymentInfo).to.have.property("paymentMethodId");
                      expect(ticketPaymentInfo).to.have.property("shippingAddressId");
                      expect(ticketPaymentInfo).to.have.property("currencyTotalValue");
                      expect(ticketPaymentInfo).to.have.property("currencyRate");
                      expect(ticketPaymentInfo).to.have.property("userId");
                      expect(ticketPaymentInfo).to.have.property("promotionId");
                      expect(ticketPaymentInfo).to.have.property("tickets");
                      expect(ticketPaymentInfo).to.have.property("lineItems");
                    }
                }
            }
          });

          it('Should not be able to get ticket payment info if ticketId is invalid', async () => {
              const response = await api.get(`/superuser/payment_info/tickets/${invalidUUID}`, token);

              expect(response.status).to.not.equal(200, `${getResponseError(response)}`);    
          });

          it('Should not be able to get ticket payment info if ticketId field is empty', async () => {
              const response = await api.get(`/superuser/payment_info/tickets/`, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);    
          });

          it('Should not be able to get ticket payment info if user is not superuser', async () => {
              const response = await api.get(`/superuser/payment_info/tickets/${ticketId}`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to get ticket payment info using nonsuperuser account. ${getResponseError(response)}`);    
          });

      });



      describe('GET /superuser/payment_info/{{email}} - Get latest payment info', async () => {
          let email = account.email;
          
          it('Should be able to get latest payment info', async () => {
              const response = await api.get(`/superuser/payment_info/${email}`, token);
              
              expect(response.status).to.equal(200, `Unable to get latest payment info. ${getResponseError(response)}`);    
          });

          it('Should not be able to get latest payment info if email is invalid', async () => {
              let invalidEmail = 'invalidEmail!@!#'

              const response = await api.get(`/superuser/payment_info/${invalidEmail}`, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);    
          });

          it('Should not be able to get latest payment info if email field is empty', async () => {
              const response = await api.get(`/superuser/payment_info/`, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);    
          });

          it('Should not be able to get latest payment info if user is not superuser', async () => {
              const response = await api.get(`/superuser/payment_info/${email}`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to get latest payment info using nonsuperuser account. ${getResponseError(response)}`);    
          });

      });



      describe('GET /superuser/sent_emails/{{email}} - Get recent sent emails', async () => {
          let email = account.email;
          
          it('Should be able to get recent sent emails', async () => {
              const response = await api.get(`/superuser/sent_emails/${email}`, token);
              
              expect(response.status).to.equal(200, `Unable to get recent sent emails. ${getResponseError(response)}`);    
          });

          it('Should return 404 if email is invalid', async () => {
              let invalidEmail = 'invalidEmail!@!#'

              const response = await api.get(`/superuser/sent_emails/${invalidEmail}`, token);

              expect(response.status).to.equal(400, `Able to get recent sent emails using invalid email. ${getResponseError(response)}`);    
          });

          it('Should not be able to get recent sent emails if ticketId field is empty', async () => {
              const response = await api.get(`/superuser/sent_emails/`, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);    
          });

          it('Should not be able to get recent sent emails if user is not superuser', async () => {
              const response = await api.get(`/superuser/sent_emails/${email}`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to get recent emails using nonsuperuser account. ${getResponseError(response)}`);    
          });

      });



      describe('GET /superuser/detailed_user/{{email}}?refresh=true - Get detailed user info', async () => {
          let email = account.email;
          
          it('Should be able to get user\'s detailed info', async () => {
              const response = await api.get(`/superuser/detailed_user/${email}?refresh=true`, token);

              expect(response.status).to.equal(200, `Unable to get user detailed info. ${getResponseError(response)}`);    
              expect(response.body).to.have.property("result")

              let result = response.body.result;

              expect(result).to.have.property("allPaymentInfos")
              expect(result).to.have.property("user")
          });

          it('Should not be able to get detailed user info if email is invalid', async () => {
              let invalidEmail = 'invalidEmail!@!#'

              const response = await api.get(`/superuser/detailed_user/${invalidEmail}?refresh=true`, token);

              expect(response.status).to.equal(400, `Able to get get detailed user info using invalid email. ${getResponseError(response)}`);
          });

          it('Should not be able to get detailed user info if ticketId field is empty', async () => {
              const response = await api.get(`/superuser/detailed_user/?refresh=true`, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`); 
          });

          it('Should not be able to get detailed user info if user is not superuser', async () => {
              const response = await api.get(`/superuser/detailed_user/${email}?refresh=true`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to get detailed user info using nonsuperuser account. ${getResponseError(response)}`);
          });

      });


      
      // Currently returns error 500 even on the web app
      describe.skip('GET /superuser/front/export - Export Front inbox', async () => {
          
          it('Should be able to export Front app inbox', async () => {
              const response = await api.get(`/superuser/front/export`, token);

              expect(response.status).to.equal(200, `Unable to export front inbox. ${getResponseError(response)}`);
          });

          it('Should not be able to export inbox if user is not superuser', async () => {
              const response = await api.get(`/superuser/front/export`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to export front inbox using nonsuperuser account. ${getResponseError(response)}`);
          });

      });



      // Currently returns error 500 even on the web app
      describe.skip('GET /superuser/front/inboxes - Get Front inbox', async () => {
  
          it('Should be able to get Front app inbox', async () => {
              const response = await api.get(`/superuser/front/inboxes`, token);

              expect(response.status).to.equal(200, `Unable to get front app inbox. ${getResponseError(response)}`);
          });

          it('Should not be able to get inbox and will return 403 if user is not superuser', async () => {
              const response = await api.get(`/superuser/front/inboxes`, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to get front app inbox using nonsuperuser account. ${getResponseError(response)}`);
          });

      });
    });



    describe('POST', async () => {
      describe('POST /superuser/refundPayment - Refund payment', async () => {

          it('Should be able to refund payment', async () => {
              let eventId = (await eventApi.createEvent("stream", token)).id;
              
              if (eventId) {
                  let paymentIntent = generatePaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(paymentIntent, token)

                  if (payment) {
                      let ticketId = payment.ticketId;
                      let paymentInfo = await api.getTicketPaymentInfo(ticketId, token)
                      
                      if (paymentInfo) {
                          let paymentInfoId = await api.getTicketPaymentInfoId(ticketId, token)
                          const response = await api.refundPayment(paymentInfoId, token);

                          expect(response.status).to.equal(200, `Unable to issue a refund. ${getResponseError(response)}`);
                      }
                  }
              }
              
          }).timeout(120000);;

          it.skip('Should not be able to refund payment if paymentInfoId is already refunded', async () => {
              let eventId = (await eventApi.createEvent("stream", token)).id;
              
              if (eventId) {
                  let paymentIntent = generatePaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(paymentIntent, token)

                  if (payment) {
                      let ticketId = payment.ticketId;
                      let paymentInfo = await api.getTicketPaymentInfo(ticketId, token)
                      
                      if (paymentInfo) {
                          let paymentInfoId = await api.getTicketPaymentInfoId(ticketId, token)
                          const response = await api.refundPayment(paymentInfoId, token);
                          expect(response.status).to.equal(200, `Unable to issue a refund. ${getResponseError(response)}`);

                          // Send same request again
                          response = await api.refundPayment(paymentInfoId, token);
                          expect(response.status).to.equal(409, `Able to issue a refund on a payment that's already refunded. ${getResponseError(response)}`);
                      }
                  }
              }
          }).timeout(120000);;

          it('Should not be able to refund payment if paymentInfoId is empty', async () => {
              const response = await api.refundPayment('', token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to refund payment if paymentInfoId is invalid', async () => {
              const response = await api.refundPayment(invalidUUID, token);

              expect(response.status).to.equal(500, `${getResponseError(response)}`);
          });

          it('Should not be able to refund payment if user is not superuser', async () => {
              const response = await api.refundPayment(invalidUUID, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to issue refund using nonsuperuser account. ${getResponseError(response)}`);
          });

      });



      describe('POST /superuser/refundTicket - Refund ticket', async () => {

          it('Should be able to refund ticket', async () => {
              let eventId = (await eventApi.createEvent("stream", token)).id;

              if (eventId) {
                  let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token);

                  if (payment.status == 200) {
                      let ticketId = payment.ticketId;

                      if (ticketId) {
                          const response = await api.refundTicket(ticketId, token);

                          expect(response.status).to.equal(200, `Unable to issue a ticket refund. ${getResponseError(response)}`);
                      }
                  }
              }
          }).timeout(120000);

          it('Should not be able to refund ticket if ticketID is already refunded', async () => {
              let eventId = (await eventApi.createEvent("stream", token)).id;

              if (eventId) {
                  let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token);

                  if (payment.status == 200) {
                      let ticketId = payment.ticketId;

                      if (ticketId) {
                          const response = await api.refundTicket(ticketId, token);
                          expect(response.status).to.equal(200, `Unable to issue a ticket refund. ${getResponseError(response)}`);
                          
                          // Send the same request again. Returns error 500 instead of 409
                          response = await api.refundTicket(ticketId, token);
                          expect(response.status).to.equal(500, `Able to issue a refund on a payment that's already refunded. ${getResponseError(response)}`);
                      }
                  }
              }
          }).timeout(120000);;

          it('Should not be able to refund ticket if ticketID is empty', async () => {
              const response = await api.refundTicket('', token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to refund ticket if ticketID is invalid', async () => {
              const response = await api.refundTicket(invalidUUID, token);

              expect(response.status).to.equal(500, `${getResponseError(response)}`);
          });

          it('Should not be able to refund ticket if user is not superuser', async () => {
              const response = await api.refundTicket(invalidUUID, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to issue refund using nonsuperuser account. ${getResponseError(response)}`);
          });

      });



      describe.skip('POST /superuser/refundTicket - Refund other items', async () => {

          it('Should be able to refund line item', async () => {
              // Create event
              let eventId = (await eventApi.createEvent("stream", token)).id;

              if (eventId) {
                  // Generate merch
                  let newMerch = generateMerchGallery(account.merchItem);

                  // Patch event with merch
                  let merchGallery = await eventApi.createMerchGallery(eventId, newMerch, token)

                  // Buy ticket
                  let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token);

                  // Create merch payment intent
                  let merchPayment = generateMerchPaymentIntent(eventId, merchGallery);

                  // Buy merch
                  // Find paymentIdInfo from getPurchasedGoods endpoints
                  // Issue merch refund
              }

          });

          it('Should not be able to refund line item if ticketID is already refunded', async () => {
              let event = await eventApi.createEvent('stream', token)
              if (event) {
                  let eventId = event.id;
                  let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token)

                  if (payment) {
                      let ticketId = payment.ticketId;

                      if (ticketId) {
                          const response = await api.refundTicket(ticketId, token);
                          expect(response.status).to.equal(200, `Unable to issue a ticket refund. ${getResponseError(response)}`);
                          
                          // Send the same request again. Returns error 500 instead of 409
                          response = await api.refundTicket(ticketId, token);
                          expect(response.status).to.equal(500, `Able to issue a refund on a payment that's already refunded. ${getResponseError(response)}`);
                      }
                  }
              }
          });

          it('Should not be able to refund line item if ticketID is empty', async () => {
              const response = await api.refundTicket('', token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to refund line item if ticketID is invalid', async () => {
              const response = await api.refundTicket(invalidUUID, token);

              expect(response.status).to.equal(500, `${getResponseError(response)}`);
          });

          it('Should not be able to refund line item if user is not superuser', async () => {
              const response = await api.refundTicket(invalidUUID, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to issue refund using nonsuperuser account. ${getResponseError(response)}`);
          });

      });

      

      describe('POST /superuser/duplicate_event_artist_brand_demo - Duplicate event', async () => {
          it('Should duplicate an existing event', async () => {
              let payload = { eventId: account.eventId};

              const response = await api.post(`/superuser/duplicate_event_artist_brand_demo`, payload, token);

              expect(response.status).to.equal(200, `Unable to duplicate event. ${getResponseError(response)}`);
              expect(response.body).to.have.property('newEvent');
              expect(response.body).to.have.property('newArtistBrand');
          });

          it('Should not be able to duplicate event if eventId is not valid', async () => {
              let payload = { eventId: invalidUUID};

              const response = await api.post(`/superuser/duplicate_event_artist_brand_demo`, payload, token);

              expect(response.status).to.equal(404, `Able to duplicate event with invalid eventId. ${getResponseError(response)}`);
          });

          it('Should not be able to duplicate event if user is not superuser', async () => {
              let payload = { eventId: account.eventId};

              const response = await api.post(`/superuser/duplicate_event_artist_brand_demo`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to duplicate event using nonsuperuser account. ${getResponseError(response)}`);
          });

      });


      
      describe('POST /superuser/changeMerchSize - Change merch size', async () => {
          // Skipped. With issue CORE-2897  
          it('Should be able to change merch size', async () => {
                let payload = { merchId: purchasedGoods[0], size: "L"};

                const response = await api.post(`/superuser/changeMerchSize`, payload, token);
                expect(response.status).to.equal(200, `Unable to change merch size. ${getResponseError(response)}`);
            });

          it('Should not able able to update merch size if merchId is not valid', async () => {
              let payload = { merchId: invalidUUID, size: "L"};

              const response = await api.post(`/superuser/changeMerchSize`, payload, token);
              expect(response.status).to.equal(500, `${getResponseError(response)}`);
          });

          it('Should not able to update merch size if user is not superuser', async () => {
              let payload = { merchId: purchasedGoods[0], size: "L"};

              const response = await api.post(`/superuser/changeMerchSize`, payload, nonSuperuserToken);
              expect(response.status).to.equal(403, `Able to change merch size using nonsuperuser account. ${getResponseError(response)}`);
          });

      });



      describe('POST /superuser/resendTicket - Resend ticket to email', async () => {
          it('Should be able to resend ticket to given email', async () => {
            let eventId = (await eventApi.createEvent("stream", token)).id;

            if (eventId) {
                let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token);

                if (payment.status == 200) {
                    let ticketId = payment.ticketId;

                    if (ticketId) {
                      let payload = { ticketId: ticketId, email: account.email};

                      const response = await api.post(`/superuser/resendTicket`, payload, token);

                      expect(response.status).to.equal(200, `Unable to resend ticket to given email. ${getResponseError(response)}`);
                      expect(response.body).to.have.property('ticket');

                      let ticketInfo = response.body.ticket;

                      expect(ticketInfo).to.have.property('id');
                      expect(ticketInfo).to.have.property('stripePaymentId');
                      expect(ticketInfo).to.have.property('email');
                      expect(ticketInfo).to.have.property('lastCookieIssuedAt');
                      expect(ticketInfo).to.have.property('createdAt');
                      expect(ticketInfo).to.have.property('updatedAt');
                      expect(ticketInfo).to.have.property('referrer');
                      expect(ticketInfo).to.have.property('ticketType');
                      expect(ticketInfo).to.have.property('ticketTemplateId');
                      expect(ticketInfo).to.have.property('location');
                      expect(ticketInfo).to.have.property('timezone');
                      expect(ticketInfo).to.have.property('deletedAt');
                      expect(ticketInfo).to.have.property('deviceInfo');
                      expect(ticketInfo).to.have.property('timeSlot');
                      expect(ticketInfo).to.have.property('payoutProcessed');
                      expect(ticketInfo).to.have.property('completedAt');
                      expect(ticketInfo).to.have.property('roomSid');
                      expect(ticketInfo).to.have.property('compositionSid');
                      expect(ticketInfo).to.have.property('compositionStatus');
                      expect(ticketInfo).to.have.property('lang');
                      expect(ticketInfo).to.have.property('externalId');
                      expect(ticketInfo).to.have.property('gifting');
                      expect(ticketInfo).to.have.property('addOnInfo');
                      expect(ticketInfo).to.have.property('startedAt');
                      expect(ticketInfo).to.have.property('metaInfo');
                      expect(ticketInfo).to.have.property('events');
                    }
                }
            }
            
              

          });

          it('Should not able able to resend ticket if email is not valid', async () => {
              let payload = { ticketId: account.ticketId, email: 'invalid!@#!@email.com'};

              const response = await api.post(`/superuser/resendTicket`, payload, token);

              expect(response.status).to.equal(403, `${getResponseError(response)}`);
          });

          it('Should not able able to resend ticket if ticketId is not valid', async () => {
              let payload = { ticketId: invalidUUID};

              const response = await api.post(`/superuser/resendTicket`, payload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not able able to resend ticket if ticketId and email is empty', async () => {
              const response = await api.post(`/superuser/resendTicket`, '', token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not able to resend ticket if user is not superuser', async () => {
              let payload = { ticketId: account.ticketId, email: account.email};

              const response = await api.post(`/superuser/resendTicket`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to resend ticket to email using nonsuperuser account. ${getResponseError(response)}`);
          });

      });



      describe('POST /superuser/vendorAccount - Create vendor account', async () => {
          it('Should be able to create vendor account', async () => {
              let payload = { email: getRandomEmail(), name: `name.${getRandomString()}` };

              const response = await api.post(`/superuser/vendorAccount`, payload, token);

              expect(response.status).to.equal(200, `Unable to create vendor account. ${getResponseError(response)}`);
              expect(response.body).to.have.property('vendorId');
          });

          it('Should not be able to create vendor account if email is empty', async () => {
              let payload = { email: '', name: `name.${getRandomString()}` };

              const response = await api.post(`/superuser/vendorAccount`, payload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
              expect(response.body.error).to.equal('email is required: body');
          });

          it('Should not be able to create vendor account if name is empty', async () => {
              let payload = { email: getRandomEmail(), name: '' };

              const response = await api.post(`/superuser/vendorAccount`, payload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
              expect(response.body.error).to.equal('name is required: body');
          });

          it('Should not be able to create vendor account if name and email are empty', async () => {
              let payload = { email: '', name: '' };

              const response = await api.post(`/superuser/vendorAccount`, payload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
              expect(response.body.error).to.equal('email is required: body | name is required: body');
          });

          it('Should not be able to create vendor account if user is not superuser', async () => {
              let payload = { email: getRandomEmail(), name: `name.${getRandomString()}` };

              const response = await api.post(`/superuser/vendorAccount`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to create vendor account using nonsuperuser account. ${getResponseError(response)}`);
          });

      });



      describe('POST /superuser/changeShippingAddress - Change purchased goods shipping address', async () => {
          it('Should be able to change purchased goods shipping address', async () => {                        
              let payload = { paymentInfoId: paymentInfoIds[0], location: `newLocation.${getRandomString()}` };

              const response = await api.post(`/superuser/changeShippingAddress`, payload, token);

              expect(response.status).to.equal(200, `Unable to change purchased goods shipping address. ${getResponseError(response)}`);
              // Assert here using getPurchasedGoodInfo if shipping address has changed .skip
              // Currently have issue: CORE-2900
          });

          it('Should not be able to change purchased goods shipping address if paymentInfoId is empty', async () => {
              let payload = { paymentInfoId: '', location: `newLocation.${getRandomString()}` };

              const response = await api.post(`/superuser/changeShippingAddress`, payload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
          });

          it('Should not be able to change purchased goods shipping address if location is empty', async () => {
              let payload = { paymentInfoId: paymentInfoIds[0], location: '' };

              const response = await api.post(`/superuser/changeShippingAddress`, payload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
          });

          it('Should not be able to change purchased goods shipping address if paymentInfoId and location are empty', async () => {
              let payload = { paymentInfoId: '', location: '' };

              const response = await api.post(`/superuser/changeShippingAddress`, payload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
          });

          it('Should not be able to change purchased goods shipping address if user is not superuser', async () => {
              let payload = { paymentInfoId: paymentInfoIds[0], location: `newLocation.${getRandomString()}` };

              const response = await api.post(`/superuser/changeShippingAddress`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to change purchased goods shipping address using nonsuperuser account. ${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
              expect(response.body.error).to.equal(errorMessage.requiresSuperuser);
          });

      });



      describe('POST /superuser/trueup/intent - Issue True Up payment', async () => {
          let payload = {
              artistBrandId: account.artistBrandId, 
              paymentMethodId: account.paymentMethodId, 
              price: 100
          }

          it('Should be able to issue true up payment', async () => {                        
              const response = await api.post(`/superuser/trueup/intent`, payload, token);

              expect(response.status).to.equal(200, `Unable to issue true up payment. ${getResponseError(response)}`);
              expect(response.body).to.have.property('intentId');
              expect(response.body).to.have.property('newPaymentMethodId');
              expect(response.body).to.have.property('receiptNumber');
          });

          it('Should not be able to issue true up payment if artistBrandId is invalid', async () => {                        
              let newPayload = { ...payload, artistBrandId: invalidUUID };

              const response = await api.post(`/superuser/trueup/intent`, newPayload, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });

          // Does not update newPaymentMethodId, still the same as the old paymentMethodId
          it.skip('Should not be able to issue true up payment if newPaymentMethodId is invalid', async () => {                        
              let newPayload = { ...payload, newPaymentMethodId: 'pm_1K2kLjIm56RF6P9oBwo9cRDE' };

              const response = await api.post(`/superuser/trueup/intent`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to issue true up payment if price is NaN', async () => {                        
              let newPayload = { ...payload, price: "this is a string"  };

              const response = await api.post(`/superuser/trueup/intent`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to issue true up payment if artistBrandId, newPaymentMethodId, and price is empty', async () => {                        
              let newPayload = { ...payload, price: "" };

              const response = await api.post(`/superuser/trueup/intent`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to issue true up payment if user is not superuser', async () => {                        
              const response = await api.post(`/superuser/trueup/intent`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to issue true up payment using nonsuperuser account. ${getResponseError(response)}`);
          });

      });


      // Always returns error 500. CORE-2914
      describe.skip('POST /superuser/front/export - Create Front export', async () => {
      });

      

      describe('POST /superuser/refresh/entity - Refresh Entity Type', async () => {
          
          it('Should be able to refresh entity type curated events cache', async () => {
              let payload = { entityType: "curatedEvents" };

              const response = await api.post(`/superuser/refresh/entity`, payload, token);

              expect(response.status).to.equal(200, `Unable to refresh curated events cache. ${getResponseError(response)}`);
              expect(response.body).to.have.property('newEntityObject');

              let newEntityObject = response.body.newEntityObject;
              
              expect(newEntityObject).to.have.property('curatedCacheRefresh');
              expect(newEntityObject.curatedCacheRefresh).to.be.true;
          });
          
          // Returns 200 instead of 400
          it('Should not refresh entity type curated events cache if entityType is empty', async () => {
              let payload = { entityType: "" };

              const response = await api.post(`/superuser/refresh/entity`, payload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
              expect(response.body).to.not.have.property('newEntityObject');
          });

          // Returns 200 instead of 400
          it('Should not refresh entity type curated events cache if entityType is invalid', async () => {
              let payload = { entityType: getRandomString() };

              const response = await api.post(`/superuser/refresh/entity`, payload, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
              expect(response.body).to.not.have.property('newEntityObject');
          });

          // Returns 200 instead of 403
          it('Should not refresh entity type curated events cache if user is not superuser', async () => {
              let payload = { entityType: "curatedEvents" };

              const response = await api.post(`/superuser/refresh/entity`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to refresh entity type curated events cache using nonsuperuser account. ${getResponseError(response)}`);
          });

      });
    });



    describe('PATCH', async () => {
      describe('PATCH /superuser/primeSalesTaxCache - Cache prime sales tax', async () => {
          let payload = {
              price: 999,
              artistBrandId: artistBrandId,
              expiry: 120
          }
          
          it('Should be able to cache prime sales tax', async () => {
              const response = await api.patch(`/superuser/primeSalesTaxCache`, payload, token);

              expect(response.status).to.equal(200, `Unable to cache prime sales tax. ${getResponseError(response)}`);
          });
          
          it('Should not be able to cache prime sales tax if artistBrandId is empty', async () => {
              let newPayload = { ...payload, artistBrandId: "" };

              const response = await api.patch(`/superuser/primeSalesTaxCache`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to cache prime sales tax if artistBrandId, price and expiry is empty', async () => {
              let newPayload = { ...payload, artistBrandId: "", price: "", expiry: "" };

              const response = await api.patch(`/superuser/primeSalesTaxCache`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });
          
          it('Should not be able to cache prime sales tax if artistBrandId is invalid', async () => {
              let newPayload = { ...payload, artistBrandId: invalidUUID};

              const response = await api.patch(`/superuser/primeSalesTaxCache`, newPayload, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });

          it('Should not be able to cache prime sales tax if price is invalid', async () => {
              let newPayload = { ...payload, price: "this is a string"};

              const response = await api.patch(`/superuser/primeSalesTaxCache`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to cache prime sales tax if expiry is invalid', async () => {
              let newPayload = { ...payload, expiry: "this is a string"};

              const response = await api.patch(`/superuser/primeSalesTaxCache`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to cache prime sales tax if user is not superuser', async () => {
              const response = await api.patch(`/superuser/primeSalesTaxCache`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to refresh entity type curated events cache using nonsuperuser account. ${getResponseError(response)}`);
          });
      });



      describe('PATCH /superuser/changeEmail - Change user email', async () => {
          
          it('Should be able to change artist user email', async () => {
              const user = await api.createUser('artist');
              const payload = { userId: user.responseData.id, newEmail: `test.mh.staging+new${getRandomInt()}@gmail.com` };

              if (user.responseData.id) {
                const response = await api.patch(`/superuser/changeEmail`, payload, token);
                
                try {
                  expect(response.status).to.equal(200, `Unable to change artist user email. ${getResponseError(response)}`);

                  return response.status;
                } finally {
                    // Clean up created test user account
                    let email = (response.status == 200) ? payload.newEmail : user.responseData.email 
                    await api.deleteUserByEmail(email, token);
                }; 
              }
               
          });
          
          // Intermittent issue on local run, always failing on GHA run
          it.skip('Should be able to change fan user email', async () => {
              let user = await api.createUser('fan');
              let payload = { userId: user.responseData.id, newEmail: `test.mh.staging+new${getRandomInt()}@gmail.com` };
              let response;

              try {
                  if (user.responseData.id) {
                      response = await api.patch(`/superuser/changeEmail`, payload, token);
                      expect(response.status).to.equal(200, `Unable to change fan user email. ${getResponseError(response)}`);
                  } 
              } finally {
                  // Clean up created test user account
                  // let email = (response.status == 200) ? payload.newEmail : user.responseData.email 
                  // await api.deleteUserByEmail(email, token);
              }; 
          });

          it('Should not be able to change user email if newEmail already taken', async () => {
              let user = await api.createUser('artist');
              let payload = { userId: user.responseData.id, newEmail: `test.mh.staging+new${getRandomInt()}@gmail.com` };
              let response;

              try {
                  if (exists(user.responseData.id)) {
                      let response = await api.patch(`/superuser/changeEmail`, payload, token);
                      expect(response.status).to.equal(200, `Unable to change artist user email. ${getResponseError(response)}`);

                      // Send request again and check if changing to existing email is allowed
                      response = await api.patch(`/superuser/changeEmail`, payload, token);
                      expect(response.status).to.equal(409, `Able to change user email to an existing one. ${getResponseError(response)}`);
                      expect(response.body.error).to.equal('Email is already in use by another user!');
                  } 
              } finally {
                  // Clean up created test user account
                  // let email = (response.status == 409) ? user.responseData.email : payload.newEmail;  
                  // await api.deleteUserByEmail(email, token);
              };
          });
          
          it('Should not be able to change user email if userId is empty', async () => {
              let payload = { newEmail: `test.mh.staging+new${getRandomInt()}@gmail.com`}

              const response = await api.patch(`/superuser/changeEmail`, payload, token);
              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to change user email if userId and newEmail are empty', async () => {
              let payload = {}

              const response = await api.patch(`/superuser/changeEmail`, payload, token);
              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });
          
          // Returns 500 instead of 400
          it('Should not be able to change user email if userId is invalid', async () => {
              let payload = { userId: invalidUUID, newEmail: `test.mh.staging+new${getRandomInt()}@gmail.com`}

              const response = await api.patch(`/superuser/changeEmail`, payload, token);
              expect(response.status).to.equal(500, `${getResponseError(response)}`);
          });

          it('Should not be able to change user email if newEmail is invalid', async () => {
              let user = await api.createUser('fan');
              let response
              if (user) {
                  let payload = { userId: user.id, newEmail: 'not a valid email' };

                  try {
                      response = await api.patch(`/superuser/changeEmail`, payload, token);

                      expect(response.status).to.equal(400, `Able to change email into invalid user email. ${getResponseError(response)}`);                      
                  } finally {
                      // Clean up created test user account
                      // let email = (response.status == 200) ? payload.newEmail : user.responseData.email 
                      // await api.deleteUserByEmail(email, token);
                  };
              };
          });

          it('Should not be able to change user email if user is not superuser', async () => {
              let user = await api.createUser('fan');
              let payload = { userId: user.responseData.id, newEmail: `test.mh.staging+new${getRandomInt()}@gmail.com` };
              
              try {
                  if (user.responseData.id) {
                      const response = await api.patch(`/superuser/changeEmail`, payload, nonSuperuserToken);
                      expect(response.status).to.equal(403, `Able to change user email using nonsuperuser account. ${getResponseError(response)}`);
                      
                      return response.status;
                      } 
              } finally {
                  // Clean up created test user account
                  // let email = (response.status == 200) ? payload.newEmail : user.responseData.email 
                  // await api.deleteUserByEmail(email, token);
              };
          });

      });



      
      describe('PATCH /superuser/primeAccessCodeCache - Cache prime access code', async () => {
          let payload = {
              artistBrandId: account.artistBrandId,
              eventId: account.eventId,
              expiry: 120
          }
          
          it('Should be able to cache prime access code', async () => {
              const response = await api.patch(`/superuser/primeAccessCodeCache`, payload, token);

              expect(response.status).to.equal(200, `Unable to cache prime access code. ${getResponseError(response)}`);
          });
          
          it('Should not be able to cache prime access code if artistBrandId is empty', async () => {
              let newPayload = { ...payload };
              delete newPayload.artistBrandId;

              const response = await api.patch(`/superuser/primeAccessCodeCache`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to cache prime access code if artistBrandId, eventId and expiry are empty', async () => {
              let newPayload = {};

              const response = await api.patch(`/superuser/primeAccessCodeCache`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });
          
          it('Should not be able to cache prime access code if artistBrandId is invalid', async () => {
              let newPayload = { ...payload, artistBrandId: invalidUUID};

              const response = await api.patch(`/superuser/primeAccessCodeCache`, newPayload, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });

          // Returns 200 instead of 400
          it.skip('Should not be able to cache prime access code if eventId is invalid', async () => {
              let newPayload = { ...payload, eventId: invalidUUID};

              const response = await api.patch(`/superuser/primeAccessCodeCache`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to cache prime access code if expiry is invalid', async () => {
              let newPayload = { ...payload, expiry: "this is a string"};

              const response = await api.patch(`/superuser/primeAccessCodeCache`, newPayload, token);

              expect(response.status).to.equal(400, `${getResponseError(response)}`);
          });

          it('Should not be able to cache prime access code if user is not superuser', async () => {
              const response = await api.patch(`/superuser/primeAccessCodeCache`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to refresh entity type curated events cache using nonsuperuser account. ${getResponseError(response)}`);
          });
      });



      describe('PATCH /superuser/clear_cache/{{key}} - Cache prime access code', async () => {
          // Available keys: user, artistBrand, accessCodes, salesTax, location
          let key, payload = {};
          
          it('Should be able to clear user cache', async () => {
              key = 'user';
              const response = await api.patch(`/superuser/clear_cache/${key}`, payload, token);

              expect(response.status).to.equal(200, `Unable to clear ${key} cache. ${getResponseError(response)}`);
          });

          it('Should be able to clear artistBrand cache', async () => {
              key = 'artistBrand';
              const response = await api.patch(`/superuser/clear_cache/${key}`, payload, token);

              expect(response.status).to.equal(200, `Unable to clear ${key} cache. ${getResponseError(response)}`);
          });

          it('Should be able to clear accessCodes cache', async () => {
              key = 'accessCodes';
              const response = await api.patch(`/superuser/clear_cache/${key}`, payload, token);

              expect(response.status).to.equal(200, `Unable to clear ${key} cache. ${getResponseError(response)}`);
          });

          it('Should be able to clear salesTax cache', async () => {
              key = 'salesTax';
              const response = await api.patch(`/superuser/clear_cache/${key}`, payload, token);

              expect(response.status).to.equal(200, `Unable to clear ${key} cache. ${getResponseError(response)}`);
          });

          it('Should be able to clear location cache', async () => {
              key = 'location';
              const response = await api.patch(`/superuser/clear_cache/${key}`, payload, token);

              expect(response.status).to.equal(200, `Unable to clear ${key} cache. ${getResponseError(response)}`);
          });
          
          it('Should not be able to clear cache if key is empty', async () => {
              const response = await api.patch(`/superuser/clear_cache/`, payload, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });
          
          it('Should not be able to clear cache if key is invalid', async () => {
              key = 'non-existing-key';

              const response = await api.patch(`/superuser/clear_cache/${key}`, payload, token);
              expect(response.status).to.equal(403, `${getResponseError(response)}`);
          });

          it('Should not be able to clear cache if user is not superuser', async () => {
              key = 'user';

              const response = await api.patch(`/superuser/clear_cache/${key}`, payload, nonSuperuserToken);
              expect(response.status).to.equal(403, `Able to refresh entity type curated events cache using nonsuperuser account. ${getResponseError(response)}`);
          });
      });



      describe('PATCH /superUser/toggleSuperUser/{{email/userId}} - Update Superuser status', async () => {
          let payload = {};

          it('Should be able to update artist user status to superuser via email', async () => {
              let user = await api.createUser('fan');

              try {
                  if (user) {
                      const response = await api.patch(`/superUser/toggleSuperUser/${user.responseData.email}`, payload, token);

                      expect(response.status).to.equal(200, `Unable to update user status to superuser via email. ${getResponseError(response)}`);
                      expect(response.body).to.have.property('result');

                      let result = response.body.result;
                      expect(result).to.equal('User is now a super user');

                      // Verify that user is superuser
                      let userAccess = (await api.getUserPrivateInformation(user.responseData.id, token)).access;
                      expect(userAccess).to.equal('super');
                  }
              } finally {
                  // Clean up created test user account
                  // await api.deleteUserByEmail(user.responseData.email, token);
              }
          });

          it('Should be able to update artist user status to superuser via userId', async () => {
              let user = await api.createUser('artist');

              if (user) {
                  try {
                      const response = await api.patch(`/superUser/toggleSuperUser/${user.responseData.id}`, payload, token);

                      expect(response.status).to.equal(200, `Unable to update user status to superuser via userId. ${getResponseError(response)}`);
                      expect(response.body).to.have.property('result');

                      let result = response.body.result;
                      expect(result).to.equal('User is now a super user');

                      // Verify that user is superuser
                      let userAccess = (await api.getUserPrivateInformation(user.responseData.id, token)).access;
                      expect(userAccess).to.equal('super');
                      
                  } finally {
                      // Clean up created test user account
                      await api.deleteUserByEmail(user.responseData.email, token);
                  }
              }
          });

          it('Should be able to update artist user status to non-superuser via email', async () => {
              let user = await api.createUser('artist');

              if (user) {
                  try {
                      const response = await api.patch(`/superUser/toggleSuperUser/${user.responseData.email}`, payload, token);

                      expect(response.status).to.equal(200, `Unable to update user status to superuser via email. ${getResponseError(response)}`);
                      expect(response.body).to.have.property('result');

                      let result = response.body.result;
                      expect(result).to.equal('User is now a super user');

                      // Verify that user is superuser
                      let userAccess = (await api.getUserPrivateInformation(user.responseData.id, token)).access;

                      if (userAccess == 'super') {
                          expect(userAccess).to.equal('super', 'User status was not successfully updated to superuser');

                          // Revert superuser status to non-superuser
                          const response = await api.patch(`/superUser/toggleSuperUser/${user.responseData.email}`, payload, token);

                          expect(response.status).to.equal(200, `Unable to update user status to non-superuser via email. ${getResponseError(response)}`);
                          expect(response.body).to.have.property('result');

                          result = response.body.result;
                          expect(result).to.equal('User is now not a super user');

                          // Verify that user is superuser
                          userAccess = (await api.getUserPrivateInformation(user.responseData.id, token)).access;
                          expect(userAccess).to.equal(null, 'User status was not successfully updated to non-superuser');
                      }
                  } finally {
                      // Clean up created test user account
                      await api.deleteUserByEmail(user.responseData.email, token);
                  }
              }
          });

          it('Should be able to update artist user status to non-superuser via userId', async () => {
              let user = await api.createUser('artist');

              if (user) {
                  try {
                      const response = await api.patch(`/superUser/toggleSuperUser/${user.responseData.id}`, payload, token);

                      expect(response.status).to.equal(200, `Unable to update user status to superuser via userId. ${getResponseError(response)}`);
                      expect(response.body).to.have.property('result');

                      let result = response.body.result;
                      expect(result).to.equal('User is now a super user');

                      // Verify that user is superuser
                      let userAccess = (await api.getUserPrivateInformation(user.responseData.id, token)).access;

                      if (userAccess == 'super') {
                          expect(userAccess).to.equal('super', 'User status was not successfully updated to superuser');

                          // Revert superuser status to non-superuser
                          const response = await api.patch(`/superUser/toggleSuperUser/${user.responseData.id}`, payload, token);

                          expect(response.status).to.equal(200, `Unable to update user status to non-superuser via userId. ${getResponseError(response)}`);
                          expect(response.body).to.have.property('result');

                          result = response.body.result;
                          expect(result).to.equal('User is now not a super user');

                          // Verify that user is superuser
                          userAccess = (await api.getUserPrivateInformation(user.responseData.id, token)).access;
                          expect(userAccess).to.equal(null, 'aUser status was not successfully updated to non-superuser');
                      }
                  } finally {
                      // Clean up created test user account
                      await api.deleteUserByEmail(user.responseData.email, token);
                  }
              }
          });
          
          it('Should not be able to clear cache if email/userId is empty', async () => {
              const response = await api.patch(`/superUser/toggleSuperUser/`, payload, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });
          
          it('Should not be able to clear cache if email/userId is invalid', async () => {
              const response = await api.patch(`/superUser/toggleSuperUser/${invalidUUID}`, payload, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });

          it('Should not be able to clear cache if user is not superuser', async () => {
              const response = await api.patch(`/superUser/toggleSuperUser/${invalidUUID}`, payload, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to refresh entity type curated events cache using nonsuperuser account. ${getResponseError(response)}`);
          });
      });
    });



    describe('DELETE', async () => {  
      describe('DELETE /superuser/{{email}} - Delete user by email', async () => {

          // CORE-2971. Able to successfully delete user but does not completely delete information
          it('Should be able to delete a user provided valid email', async () => {
              let user = await api.createUser('artist');
              
              if (user) {
                const response = await api.delete(`/superUser/${user.responseData.email}`, token);
                  try {
                      expect(response.status).to.equal(200, `Unable to delete user. ${getResponseError(response)}`);
                      expect(response.body).to.have.property('message');

                      let message = response.body.message;
                      expect(message).to.equal('User deleted successfully.')

                      // Verify that deleted user account does not exist
                      let userHasAccount = await api.checkIfUserExist(user.responseData.email);
                      expect(userHasAccount).to.equal(false, 'Deleted account still exists');

                      return response.status;
                  } finally {
                      // Clean up created test user account
                      if (response.status !== 200) await api.deleteUserByEmail(user.email, token);   
                  }
              }
          });
          
          it('Should not delete user if email is empty', async () => {
              const response = await api.delete(`/superUser/`, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });
          
          it('Should not delete user if email/userId is invalid', async () => {
              let invalidEmail = `this is not an email`;

              const response = await api.delete(`/superUser/${invalidEmail}`, token);
              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });

          it('Should not delete user if user is not superuser', async () => {
              let nonexistingEmail = `nonexistingEmail@mailinator.com`;

              const response = await api.delete(`/superUser/${nonexistingEmail}`, nonSuperuserToken);
              expect(response.status).to.equal(403, `Able to delete user using nonsuperuser account. ${getResponseError(response)}`);
          });
      });



      describe('DELETE /superuser/ticket/{{eventId}}/{{ticketId}} - Delete event ticket', async () => {
          
          it('Should be able to delete an event ticket', async () => {
              let eventId = (await eventApi.createEvent("stream", token)).id;

              if (eventId) {
                  let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token)

                  if (payment) {
                      let ticketId = payment.ticketId;
                      
                      if (ticketId) {
                          const response = await api.deleteTicket(eventId, ticketId, token);
                          expect(response.status).to.equal(200, `Unable to delete event ticket. ${getResponseError(response)}`);
                          expect(response.body).to.have.property('message');
                          expect(response.body.message).to.equal('Deleted successfully.');

                          // Verify if ticket has been deleted
                          let ticket = await api.getTicketInformation(ticketId, token);
                          expect(ticket).to.not.have.property('ticket');
                      }
                  }
              }
          });
          
          it('Should not delete an event ticket if eventId is empty', async () => {
              const response = await api.deleteTicket('', account.ticketId, token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });

          it('Should not delete an event ticket if ticketId is empty', async () => {
              const response = await api.deleteTicket(account.eventId, '', token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });

          it('Should not delete an event ticket if eventId and ticketId are empty', async () => {
              const response = await api.deleteTicket('', '', token);

              expect(response.status).to.equal(404, `${getResponseError(response)}`);
          });

          // Able to delete invalid ticketId
          it.skip('Should not delete an event ticket if eventId is invalid', async () => {
              let eventId = (await eventApi.createEvent("stream", token)).id;

              if (eventId) {
                  let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token)

                  if (payment) {
                      let ticketId = payment.ticketId;
                      
                      if (ticketId) {
                          const response = await api.deleteTicket(invalidUUID, account.ticketId, token);
                          expect(response.status).to.equal(404, `${getResponseError(response)}`);
                      }
                  }
              }
          });

          // Returning error 500
          it.skip('Should not delete an event ticket if ticketId is invalid', async () => {
              let eventId = (await eventApi.createEvent("stream", token)).id;

              if (eventId) {
                  let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token)

                  if (payment) {
                      let ticketId = payment.ticketId;
                      
                      if (ticketId) {
                        const response = await api.deleteTicket(account.eventId, invalidUUID, token);
                        expect(response.status).to.equal(404, `${getResponseError(response)}`);
                      }
                  }
              }
          });

          // Returning error 500
          it.skip('Should not delete an event ticket if eventId and ticketId are invalid', async () => {
              let eventId = (await eventApi.createEvent("stream", token)).id;

              if (eventId) {
                  let ticketPaymentIntent = generateTicketPaymentIntent(eventId, 188);
                  let payment = await paymentApi.buyEventTicket(ticketPaymentIntent, token)

                  if (payment) {
                      let ticketId = payment.ticketId;
                      
                      if (ticketId) {
                        const response = await api.deleteTicket(invalidUUID, invalidUUID, token);
                        expect(response.status).to.equal(404, `${getResponseError(response)}`);
                      }
                  }
              }

          });

          it('Should not delete an event ticket if user is not superuser', async () => {
              const response = await api.deleteTicket(account.eventId, account.ticketId, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to delete ticket using nonsuperuser account. ${getResponseError(response)}`);
          });
      });



      describe('DELETE /superuser/artist_brands/:artistBrandId/events - Delete all events', async () => {
          
          it('Should be able to delete all events of artist brand if conditions are met', async () => {
              // Create a user and set status to superuser
              let user = await api.createUser('artist');
              let isSuper = await api.toggleSuperuser(user.userData.email, token);
              let eventCount = 3;

              if (isSuper) {
                  // Get artistBrandId and user token
                  let artistBrandId = (await api.getArtistPublicInformation(user.responseData.id)).id;
                  let token = await api.getUserToken(user.userData.email, user.userData.password);

                  for(i = 0; i < eventCount; i++) {
                      await eventApi.createEvent('stream', token);
                  }

                  if (artistBrandId && token) {
                      const response = await api.deleteAllEvents(artistBrandId, token);
                      expect(response.status).to.equal(200, `Unable to delete all artist brand events. ${getResponseError(response)}`);
                      expect(response.body).to.have.property('deleted');
                      expect(response.body.deleted).to.equal(eventCount);

                      // Verify if all events are deleted
                      let events = await api.getArtistBrandPrivateEvents(artistBrandId, token);
                      expect(events).to.have.lengthOf(0);
                  }
              }
          });
          
          it('Should not delete all events of artist brand if artist is not superuser', async () => {
              // Create a user and do not set status to superuser
              let user = await api.createUser('artist');
              let eventCount = 3;

              if (user) {
                  // Get artistBrandId and user token
                  let artistBrandId = (await api.getArtistPublicInformation(user.responseData.id)).id;
                  let token = await api.getUserToken(user.userData.email, user.userData.password);

                  for(i = 0; i < eventCount; i++) {
                      await eventApi.createEvent('stream', token);
                  }

                  if (artistBrandId && token) {
                      const response = await api.deleteAllEvents(artistBrandId, token);
                      expect(response.status).to.equal(403, `Able to delete all artist brand events even if artist is not a account. ${getResponseError(response)}`);
                  }
              }
          });

          it('Should not delete all events of artist brand if artist do not have "test" in slug', async () => {
              // Generate a user data with no 'test' on slug. Set user to superuser
              let userData = generateUserData('artist', false);
              let user = await api.createUser('artist', userData);
              let isSuper = await api.toggleSuperuser(user.userData.email, token);
              let eventCount = 3;

              if (isSuper) {
                  // Get artistBrandId and user token
                  let artistBrandId = (await api.getArtistPublicInformation(user.responseData.id)).id;
                  let token = await api.getUserToken(user.userData.email, user.userData.password);

                  for(i = 0; i < eventCount; i++) {
                      await eventApi.createEvent('stream', token);
                  }

                  if (artistBrandId && token) {
                      const response = await api.deleteAllEvents(artistBrandId, token);
                      expect(response.status).to.equal(403, `Able to delete all artist brand events with no 'test' on slug. ${getResponseError(response)}`);
                      expect(response.body.error).to.equal(`Cannot delete an artist brand without 'test' in its slug name.`);
                  }
              }
          });

          it('Should not delete all events of artist brand if artist have event with sales', async () => {
              // User with event sales
              let user = users.artist2;
              
              const response = await api.deleteAllEvents(user.artistBrandId, token);
              expect(response.status).to.equal(500, `Able to delete all artist brand events with at least 1 event has sales. ${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
          });

          it('Should not delete all events of artist brand if artistBrandId is empty', async () => {
              const response = await api.deleteAllEvents(null, token);

              expect(response.status).to.equal(404, `Able to delete all artist brand events with empty artistBrandId field. ${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
          });

          it('Should delete all events of artist brand if artistBrandId is invalid', async () => {
              const response = await api.deleteAllEvents(invalidUUID, token);

              expect(response.status).to.equal(404, `Able to delete all artist brand events with empty artistBrandId field. ${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
          });

          it('Should delete all events of artist brand if user is not superuser', async () => {
              // User with event sales
              let user = users.artist2;

              const response = await api.deleteAllEvents(user.artistBrandId, nonSuperuserToken);

              expect(response.status).to.equal(403, `Able to delete all artist brand events using nonsuperuser account. ${getResponseError(response)}`);
              expect(response.body).to.have.property('error');
          });
      });
    });

});