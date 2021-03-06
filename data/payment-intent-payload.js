const defaultPaymentMethod = "pm_card_us";

exports.paymentIntent = (eventIds, price, paymentMethodId = defaultPaymentMethod) => {
	return {
		"accessCode": "",
		"captchaToken": "HFMnZpIQ9OUiwTGXJcHFxNHRZiNxliSTARXhEDbnASUDAMNwt8X0MJSzFQBCxJcgEzXwlLVgUaG0NYezIGOA87Tm8fX1UpDlswCilAZ0drH1JpFlAsCnJLPxBHPFoNQXFcEjwqFSciMVlRCEdrZE1aMUYqAjUTdnVWIlJeaVJ_A39GFnlPEkdBB1YjcU99a3FOAEpbMi9WXjROaEc4XHZPEm0OGCFScgEzXwlLVgUaAltGaQp8Txp9CnALPWk8KxtXIHAUeBhtUg8uQAAb",
		"eventIds": [`${eventIds}`],
		"giftingInfo": {
		"purchaserName": "",
		"gifteeName": "",
		"gifteeEmail": "",
		"sendToGiftee": false
		},
		"location": {
		"locationData": {
			"data": {
						"ip": "226.198.1.185",
						"country": "Philippines",
						"countryCode": "PH",
						"continent": "Asia",
						"city": "Quezon City",
						"zip": "1008",
						"state": "11",
						"lat": 7.0758,
						"lon": 125.6139,
						"timezone": "Asia/Manila"
			},
			"status": 200,
			"statusText": "",
			"headers": {
			"content-type": "application/json; charset=utf-8"
			},
			"config": {
			"url": "https://api.momenthousestage.com/info/ip",
			"method": "get",
			"headers": {
				"Accept": "application/json, text/plain, */*"
			},
			"transformRequest": [null],
			"transformResponse": [null],
			"timeout": 0,
			"xsrfCookieName": "XSRF-TOKEN",
			"xsrfHeaderName": "X-XSRF-TOKEN",
			"maxContentLength": -1,
			"maxBodyLength": -1,
			"transitional": {
				"silentJSONParsing": true,
				"forcedJSONParsing": true,
				"clarifyTimeoutError": false
			}
			},
			"request": {
			"__sentry_xhr__": {
				"method": "GET",
				"url": "https://api.momenthousestage.com/info/ip",
				"status_code": 200,
				"body": null
			}
			}
		},
		"address": {
			"normalized_shipping_country": null
		}
		},
		"mailingList": true,
		"method": "stripe",
		"paymentMethodId": paymentMethodId,
		"price": 0,
		"priceDisplay": 63810,
		"saveCard": false,
		"selectedCurrency": "PHP",
		"shippingAddressId": null,
		"shoppingBag": [{
		"id": "a0c42a30-46d9-495b-b39e-d58f741d0e09",
		"event": {
			"id": `${eventIds}`,
			"artistBrandId": "4e8a6084-5775-4994-b179-71837fbe615f",
			"slug": "testmhstagingapitests-apimoment65rjua1vckn0iaw",
			"displayName": "API_Moment_65rjua1vckn0iaw",
			"description": null,
			"ticketPrice": price,
			"datetime": "2022-08-29T14:46:00.000Z",
			"actualStart": null,
			"actualEnd": null,
			"duration": "180",
			"image": null,
			"createdAt": "2021-08-29T06:46:35.694Z",
			"updatedAt": "2021-08-29T06:46:35.694Z",
			"pinnedMessage": null,
			"state": "CREATED",
			"activeStreamId": null,
			"sponsorImage": null,
			"deletedAt": null,
			"isPublic": true,
			"meetInterval": null,
			"eventType": "stream",
			"unsplashImage": null,
			"pwyw": false,
			"isFree": false,
			"isWaitlist": false,
			"geofenceTitle": null,
			"needsAccessCode": false,
			"atCheckoutOnly": true,
			"enableDiscountCode": false,
			"hideChat": false,
			"isCharityEnabled": false,
			"ticketImage": null,
			"streamArchive": null,
			"parentId": null,
			"allowQuestions": false,
			"streamProvider": "ivs",
			"nextEventId": null,
			"prevEventId": null,
			"payoutProcessed": false,
			"vodStreamId": null,
			"merchCountries": null,
			"customButton": null,
			"gcalEventId": null,
			"reminderConfig": {
			"prerecord": [],
			"reminders": [{
				"hasRun": false,
				"beforeMinutes": 35
			}, {
				"hasRun": false,
				"beforeMinutes": 203
			}],
			"subscribers": [{
				"hasRun": false,
				"beforeMinutes": 10080
			}]
			},
			"dropDate": null,
			"staticSoldOut": null,
			"chatExport": null,
			"eventEndLengthHours": 24,
			"vodDelayMin": 15,
			"groupEventId": null,
			"accessCodeDropDate": null,
			"copyCustomization": {},
			"airtableRecordId": null,
			"youtubeOverride": null,
			"chatModulo": null,
			"pwywMinPrice": null,
			"tieredPricing": {
			"tiers": [{
				"name": "Base",
				"price": 901,
				"hasRun": true,
				"datetime": "2021-08-29T06:46:35.694Z",
				"increase": 0,
				"increaseType": "percentage",
				"applyToBundles": true
			}]
			},
			"tippingEnabled": null,
			"vodDuration": null,
			"payNotificationSent": false,
			"allowAnonymousChat": false,
			"isPrivate": false,
			"currencyOverrides": {},
			"openGraphSrc": null,
			"automatedStream": null,
			"ticketCountNotification": null,
			"geofences": [],
			"artistBrand": {
			"id": "4e8a6084-5775-4994-b179-71837fbe615f",
			"displayName": "Test MH Staging API Tests",
			"slug": "testmhstagingapitests",
			"bio": "Artist Bio - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			"image": "user/1624310150818_cropped.jpg",
			"merch": null,
			"spotify": null,
			"applemusic": null,
			"venmo": null,
			"cashApp": null,
			"createdAt": "2021-05-21T17:41:20.803Z",
			"updatedAt": "2021-05-21T17:41:20.803Z",
			"youtube": null,
			"instagram": null,
			"isVerified": false,
			"showAttendeesCount": false,
			"paypal": null,
			"backgroundImage": null,
			"privacyPolicy": {},
			"retargetPixel": "",
			"conversionPixel": null,
			"shopify": null,
			"ein": null,
			"stripeAccountId": "acct_1ItcSFRMX9vxx6T9",
			"paypalAccountId": null,
			"facebook": null,
			"studioSessionTime": 2,
			"serviceFeePct": "0.10",
			"googleConversionPixel": null,
			"googleRetargetPixel": null,
			"needsAccessCode": false,
			"customButton": null,
			"maxTicketQuantity": 20,
			"payoutDelay": 2,
			"defaultCurrency": "usd",
			"whiteLabelId": null,
			"marketPixels": {},
			"merchServiceFeePct": "0.00000001",
			"stripeErrors": {},
			"twitter": null,
			"tippingServiceFeePct": "0.0",
			"chatRateLimit": 5,
			"accessCodeDropDate": "2021-10-14T23:00:00.000Z",
			"customConfirmation": null,
			"tidal": null,
			"requiresOverflow": null,
			"preStreamCreationHour": 72,
			"hasAmbientNoise": null,
			"soundcloud": null,
			"housesEnabled": true,
			"salesTaxEnabled": true,
			"airtableRecordId": null,
			"tippingEnabled": true,
			"logoBlack": null,
			"logoWhite": null,
			"hasSubscription": null,
			"reminderConfig": {},
			"videoHousesEnabled": false,
			"productionAdvance": false,
			"shopifyWebhookSecret": null,
			"creatorPageTheme": "Light",
			"pageBackgroundImage": null,
			"pagePrimaryColor": null,
			"theme": {},
			"musicBrainzId": null,
			"extraItemShippingRate": "1",
			"source": "whiteglove",
			"pollsEnabled": false,
			"closedCaptionEnabled": false,
			"seo": {},
			"verificationStatus": "APPROVED",
			"verificationProof": null,
			"wmgNewsletterId": null,
			"dmEnabled": false,
			"minimumServiceFee": "100"
			},
			"upsellEvent": null,
			"vodStream": null,
			"parentEvent": null,
			"prevEvent": null,
			"nextEvent": null,
			"tours": [],
			"childEvents": [],
			"groupEvents": [],
			"artistBrandName": "Test MH Staging API Tests",
			"bundles": [],
			"merchGalleryBundles": [],
			"externalAddOnBundles": [],
			"merchAddOnBundles": [],
			"soldOut": false,
			"freeNFTBundle": null,
			"hasFreeNFTBundle": false
		},
		"idType": "bundle",
		"quantity": 1
		}],
		"timezone": "America/Los_Angeles",
		"userInfo": {
		"isLoggedIn": true,
		"name": "",
		"password": ""
		}
	}
};


exports.ticketPaymentIntent = (eventIds, price, paymentMethodId = defaultPaymentMethod, email) => {
	return {
		"accessCode": "",
		"captchaToken": "HFM3BuIAlJUyoUGHRbHVpKHBBlNh9lSDYWXxcJY3EUUTQCMQB7XkUOSjdXBSpOcwc0Xg9MVwMdGkVfejQBOQk8T2kYXlMuD103Cy9HZkFsHlRuF1YrC3RMPhZAPVwKQHdbEzotFCElMF9WCUFsZUtdMEAtAzMUd3NRI1RZaFR4AnlBF39IE0FGBlAkcEl6andJAUxcMylRCnELeUU5WnFRCW5LF3ZBcwc0Xg9MVwMdK1lAUz8VYWVgC1lfVFo2FmBJCw9abGVBUwkpQQYc",
		"eventIds": [`${eventIds}`],
		"giftingInfo": {
			"purchaserName": "",
			"gifteeName": "",
			"gifteeEmail": "",
			"sendToGiftee": false
		},
		"location": {
			"locationData": {
				"data": {
					"ip": "226.198.1.185",
					"country": "Philippines",
					"countryCode": "PH",
					"continent": "Asia",
					"city": "Quezon City",
					"zip": "1008",
					"state": "11",
					"lat": 7.0758,
					"lon": 125.6139,
					"timezone": "Asia/Manila"
				},
				"status": 200,
				"statusText": "",
				"headers": {
					"content-type": "application/json; charset=utf-8"
				},
				"config": {
					"url": "https://api.momenthousestage.com/info/ip",
					"method": "get",
					"headers": {
						"Accept": "application/json, text/plain, */*"
					},
					"transformRequest": [null],
					"transformResponse": [null],
					"timeout": 0,
					"xsrfCookieName": "XSRF-TOKEN",
					"xsrfHeaderName": "X-XSRF-TOKEN",
					"maxContentLength": -1,
					"maxBodyLength": -1,
					"transitional": {
						"silentJSONParsing": true,
						"forcedJSONParsing": true,
						"clarifyTimeoutError": false
					}
				},
				"request": {
					"__sentry_xhr__": {
						"method": "GET",
						"url": "https://api.momenthousestage.com/info/ip",
						"status_code": 200
					}
				}
			},
			"address": {
				"normalized_shipping_country": null
			}
		},
		"mailingList": true,
		"method": "stripe",
    	"paymentMethodId": paymentMethodId,
		"price": 0,
		"priceDisplay": 67620,
		"saveCard": false,
		"selectedCurrency": "PHP",
		"shippingAddressId": null,
		"shoppingBag": [{
			"id": `${eventIds}`,
			"event": {
				"id": `${eventIds}`,
				"artistBrandId": "4e8a6084-5775-4994-b179-71837fbe615f",
				"slug": "testmhstagingapitests-apimomentcv0zqg6wzqkrg0c",
				"displayName": "API_Moment_cv0zqg6wzqkrg0c",
				"description": null,
				"ticketPrice": price,
				"datetime": "2022-08-27T14:13:00.000Z",
				"actualStart": null,
				"actualEnd": null,
				"duration": "180",
				"image": null,
				"createdAt": "2021-08-27T14:13:01.200Z",
				"updatedAt": "2021-08-27T14:13:01.200Z",
				"pinnedMessage": null,
				"state": "CREATED",
				"activeStreamId": null,
				"sponsorImage": null,
				"deletedAt": null,
				"isPublic": true,
				"meetInterval": null,
				"eventType": "stream",
				"unsplashImage": null,
				"pwyw": false,
				"isFree": false,
				"isWaitlist": false,
				"geofenceTitle": null,
				"needsAccessCode": false,
				"atCheckoutOnly": true,
				"enableDiscountCode": false,
				"hideChat": false,
				"isCharityEnabled": false,
				"ticketImage": null,
				"streamArchive": null,
				"parentId": null,
				"allowQuestions": false,
				"streamProvider": "ivs",
				"nextEventId": null,
				"prevEventId": null,
				"payoutProcessed": false,
				"vodStreamId": null,
				"merchCountries": null,
				"customButton": null,
				"gcalEventId": null,
				"reminderConfig": {
					"prerecord": [],
					"reminders": [{
						"hasRun": false,
						"beforeMinutes": 35
					}, {
						"hasRun": false,
						"beforeMinutes": 203
					}],
					"subscribers": [{
						"hasRun": false,
						"beforeMinutes": 10080
					}]
				},
				"dropDate": null,
				"staticSoldOut": null,
				"chatExport": null,
				"eventEndLengthHours": 24,
				"vodDelayMin": 15,
				"groupEventId": null,
				"accessCodeDropDate": null,
				"copyCustomization": {},
				"airtableRecordId": null,
				"youtubeOverride": null,
				"chatModulo": null,
				"pwywMinPrice": null,
				"tieredPricing": {
					"tiers": [{
						"name": "Base",
						"price": 958,
						"hasRun": true,
						"datetime": "2021-08-27T14:13:01.200Z",
						"increase": 0,
						"increaseType": "percentage",
						"applyToBundles": true
					}]
				},
				"tippingEnabled": null,
				"vodDuration": null,
				"payNotificationSent": false,
				"allowAnonymousChat": false,
				"isPrivate": false,
				"currencyOverrides": {},
				"openGraphSrc": null,
				"automatedStream": null,
				"ticketCountNotification": null,
				"artistBrand": {
					"id": "4e8a6084-5775-4994-b179-71837fbe615f",
					"displayName": "Test MH Staging API Tests",
					"slug": "testmhstagingapitests",
					"bio": "Artist Bio - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					"image": "user/1624310150818_cropped.jpg",
					"merch": null,
					"spotify": null,
					"applemusic": null,
					"venmo": null,
					"cashApp": null,
					"createdAt": "2021-05-21T17:41:20.803Z",
					"updatedAt": "2021-05-21T17:41:20.803Z",
					"youtube": null,
					"instagram": null,
					"isVerified": false,
					"showAttendeesCount": false,
					"paypal": null,
					"backgroundImage": null,
					"privacyPolicy": {},
					"retargetPixel": "",
					"conversionPixel": null,
					"shopify": null,
					"ein": null,
					"stripeAccountId": "acct_1ItcSFRMX9vxx6T9",
					"paypalAccountId": null,
					"facebook": null,
					"studioSessionTime": 2,
					"serviceFeePct": "0.10",
					"googleConversionPixel": null,
					"googleRetargetPixel": null,
					"needsAccessCode": false,
					"customButton": null,
					"maxTicketQuantity": 20,
					"payoutDelay": 2,
					"defaultCurrency": "usd",
					"whiteLabelId": null,
					"marketPixels": {},
					"merchServiceFeePct": "0.00000001",
					"stripeErrors": {},
					"twitter": null,
					"tippingServiceFeePct": "0.0",
					"chatRateLimit": 5,
					"accessCodeDropDate": "2021-10-21T23:00:00.000Z",
					"customConfirmation": null,
					"tidal": null,
					"requiresOverflow": null,
					"preStreamCreationHour": 72,
					"soundcloud": null,
					"housesEnabled": true,
					"salesTaxEnabled": true,
					"airtableRecordId": null,
					"tippingEnabled": true,
					"logoBlack": null,
					"logoWhite": null,
					"hasSubscription": null,
					"reminderConfig": {},
					"videoHousesEnabled": false,
					"productionAdvance": false,
					"shopifyWebhookSecret": null,
					"creatorPageTheme": "Light",
					"pageBackgroundImage": null,
					"pagePrimaryColor": null,
					"theme": {},
					"musicBrainzId": null,
					"extraItemShippingRate": "1",
					"source": "whiteglove",
					"pollsEnabled": false,
					"closedCaptionEnabled": false,
					"seo": {},
					"verificationStatus": "APPROVED",
					"verificationProof": null,
					"wmgNewsletterId": null,
					"dmEnabled": false,
					"minimumServiceFee": "100"
				},
				"geofences": [],
				"upsellEvent": null,
				"vodStream": null,
				"parentEvent": null,
				"prevEvent": null,
				"nextEvent": null,
				"tours": [],
				"childEvents": [],
				"groupEvents": [],
				"artistBrandName": "Test MH Staging API Tests",
				"bundles": [],
				"merchGalleryBundles": [],
				"externalAddOnBundles": [],
				"merchAddOnBundles": [],
				"soldOut": false,
				"freeNFTBundle": null,
				"hasFreeNFTBundle": false
			},
			"idType": "event",
				"quantity": 1
			}
		],
		"timezone": "America/Los_Angeles",
		"userInfo": {
			"data": {
				"id": "ec732169-79a9-437d-b5d2-685cf5ca1a88",
				"firstName": "Test MH",
				"lastName": "Staging API Tests~updated",
				"slug": "test-mhstaging-api-tests",
				"email": email,
				"passwordHash": "$2b$10$fi.TEeUJ3Z55ahQvoEqvxORkI5JXXXfgGFoSNSNf9b6HQAybwVEU.",
				"createdAt": "2021-05-21T17:41:20.769Z",
				"updatedAt": "2021-05-21T17:41:20.769Z",
				"isSuper": true,
				"stripeAccountId": null,
				"phone": null,
				"resetPasswordToken": null,
				"isVerified": true,
				"paypal": null,
				"stripeCustomerId": null,
				"externalBillingId": "cus_JYA9gbtzsIm36e",
				"lang": "en",
				"timezone": "",
				"image": "user/1631234403959_test-image.jpeg",
				"bio": null,
				"instagram": null,
				"access": "super",
				"signupSource": "native",
				"shippingAddresses": [{
					"id": "2ec671ff-ecc3-48d3-8d24-82da22dc8847",
					"userId": "ec732169-79a9-437d-b5d2-685cf5ca1a88",
					"fullName": "FullName+09366640102009927",
					"line1": "788  Rogers Street",
					"line2": "line 2",
					"city": "Sharonville",
					"province": "Ohio",
					"country": null,
					"zip": "45241",
					"rawAddress": "788  Rogers Street Sharonville Ohio 45241",
					"createdAt": "2021-08-11T23:39:07.364Z",
					"updatedAt": "2021-08-11T23:39:07.364Z",
					"deletedAt": null,
					"countryAlpha2Code": "OH",
					"countryAlpha3Code": "OH",
					"smartyStreetValidated": false,
					"phoneNumber": "567-277-1685",
					"type": "mailing"
				}],
				"artistBrandId": "4e8a6084-5775-4994-b179-71837fbe615f"
			},
			"isLoggedIn": true,
			"name": "",
			"password": ""
		}
	}
};


exports.merchPaymentIntent = (eventIds, merchGallery, paymentMethodId = defaultPaymentMethod) => {
	return {
		"eventIds": [`${eventIds}`],
		"location": {
			"locationData": {
				"data": {
					"ip": "226.198.1.185",
					"country": "Philippines",
					"countryCode": "PH",
					"continent": "Asia",
					"city": "Quezon City",
					"zip": "1008",
					"state": "11",
					"lat": 7.0758,
					"lon": 125.6139,
					"timezone": "Asia/Manila"
				},
				"status": 200,
				"statusText": "",
				"headers": {
					"content-type": "application/json; charset=utf-8"
				},
				"config": {
					"url": "https://api.momenthousestage.com/info/ip",
					"method": "get",
					"headers": {
						"Accept": "application/json, text/plain, */*"
					},
					"transformRequest": [null],
					"transformResponse": [null],
					"timeout": 0,
					"xsrfCookieName": "XSRF-TOKEN",
					"xsrfHeaderName": "X-XSRF-TOKEN",
					"maxContentLength": -1,
					"maxBodyLength": -1,
					"transitional": {
						"silentJSONParsing": true,
						"forcedJSONParsing": true,
						"clarifyTimeoutError": false
					}
				},
				"request": {
					"__sentry_xhr__": {
						"method": "GET",
						"url": "https://api.momenthousestage.com/info/ip",
						"status_code": 200,
						"body": null
					}
				}
			},
			"address": {
				"address1": "788  Rogers Street",
				"city": "Sharonville",
				"country_code": "BQ",
				"fullName": "Sherlock Freeman 283931014",
				"line2": "line 2",
				"province_code": "Ohio",
				"raw": "788  Rogers Street Sharonville Ohio 45241",
				"zip": "45241",
				"normalized_shipping_country": {
					"name": "United States of America",
					"topLevelDomain": [".us"],
					"alpha2Code": "US",
					"alpha3Code": "USA",
					"callingCodes": ["1"],
					"capital": "Washington, D.C.",
					"altSpellings": ["US", "USA", "United States of America"],
					"region": "Americas",
					"subregion": "Northern America",
					"population": 323947000,
					"latlng": [38, -97],
					"demonym": "American",
					"area": 9629091,
					"gini": 48,
					"timezones": ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC+10:00", "UTC+12:00"],
					"borders": ["CAN", "MEX"],
					"nativeName": "United States",
					"numericCode": "840",
					"currencies": [{
						"code": "USD",
						"name": "United States dollar",
						"symbol": "$"
					}],
					"languages": [{
						"iso639_1": "en",
						"iso639_2": "eng",
						"name": "English",
						"nativeName": "English"
					}],
					"translations": {
						"de": "Vereinigte Staaten von Amerika",
						"es": "Estados Unidos",
						"fr": "??tats-Unis",
						"ja": "?????????????????????",
						"it": "Stati Uniti D'America",
						"br": "Estados Unidos",
						"pt": "Estados Unidos",
						"nl": "Verenigde Staten",
						"hr": "Sjedinjene Ameri??ke Dr??ave",
						"fa": "???????????? ?????????? ????????????"
					},
					"flag": "https://restcountries.eu/data/usa.svg",
					"regionalBlocs": [{
						"acronym": "NAFTA",
						"name": "North American Free Trade Agreement",
						"otherAcronyms": [],
						"otherNames": ["Tratado de Libre Comercio de Am??rica del Norte", "Accord de Libre-??change Nord-Am??ricain"]
					}],
					"cioc": "USA"
				}
			}
		},
		"method": "stripe",
    "paymentMethodId": paymentMethodId,
		"saveCard": false,
		"selectedCurrency": "USD",
		"shoppingBag": [{
			"id": `933ce254-7540-43d0-bd20-003666fe319b-{\"${merchGallery.id}\":{\"Size\":\"XS\"}}`,
			"bundle": {
				"id": "933ce254-7540-43d0-bd20-003666fe319b",
				"eventId": `${eventIds}`,
				"name": "merch",
				"price": 1200,
				"createdAt": "2021-10-22T17:30:46.669Z",
				"deletedAt": null,
				"bundleCap": null,
				"displayOrder": null,
				"staticSoldOut": null,
				"merchType": "merch_gallery",
				"description": "{\"html\":\"<p>This is a random description</p>\",\"content\":{\"ops\":[{\"insert\":\"asdsad\\n\"}]}}",
				"shippingRates": {},
				"taxInfo": {},
				"isPublic": true,
				"geofenceRestrictions": {},
				"addOnInfo": {},
				"fulfillmentCost": 0,
				"serviceFeePct": "0.10",
				"image": null,
				"hasAfterparty": false,
				"meetEventId": null,
				"sold": "0",
				"limitedInventory": false,
				"linkOutUrl": null,
				"digitalGoods": [],
				"physicalGoods": [{
					"id": merchGallery.id,
					"bundleId": null,
					"productId": merchGallery.id,
					"type": "physical",
					"importedGood": {
						"name": merchGallery.name,
						"images": [{
							"src": "https://static.mhcdn.tv/merch/1623966517885_blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6364.jpeg"
						}],
						"options": [{
							"name": "Size",
							"values": ["XS", "S", "M", "L", "XL", "XXL"]
						}],
						"description": merchGallery.description
					},
					"provider": "merch_upload",
					"artistBrandId": "4e8a6084-5775-4994-b179-71837fbe615f",
					"createdAt": "2021-06-17T21:48:38.281Z",
					"deletedAt": null,
					"shippingAddressRequired": true,
					"walletRequired": false,
					"digtalInfo": {},
					"cap": "-1",
					"sold": "0",
					"variantCaps": {},
					"geofenceRestrictions": {},
					"name": "Merch.bhlcrij",
					"images": [{
						"src": "https://static.mhcdn.tv/merch/1623966517885_blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6364.jpeg"
					}],
					"options": [{
						"name": "Size",
						"values": ["XS", "S", "M", "L", "XL", "XXL"]
					}]
				}],
				"soldOut": false
			},
			"quantity": 1,
			"variant": {
				"6aefbd1a-9ce6-4fd9-b4cf-232d5b081806": {
					"Size": "XS" }
			}
		}],
		"checkoutType": "gallery",
		"userInfo": {
			"data": {
				"id": "ec732169-79a9-437d-b5d2-685cf5ca1a88",
				"firstName": "Test MH",
				"lastName": "Staging API Tests~updated",
				"slug": "test-mhstaging-api-tests",
				"email": "test.mh.staging+apitests@gmail.com",
				"passwordHash": "$2b$10$fi.TEeUJ3Z55ahQvoEqvxORkI5JXXXfgGFoSNSNf9b6HQAybwVEU.",
				"createdAt": "2021-05-21T17:41:20.769Z",
				"updatedAt": "2021-05-21T17:41:20.769Z",
				"isSuper": true,
				"stripeAccountId": null,
				"phone": null,
				"resetPasswordToken": null,
				"isVerified": true,
				"paypal": null,
				"stripeCustomerId": null,
				"externalBillingId": "cus_JYA9gbtzsIm36e",
				"lang": "en",
				"timezone": "",
				"image": "user/1631234403959_test-image.jpeg",
				"bio": null,
				"instagram": null,
				"access": "super",
				"signupSource": "native",
				"shippingAddress": [{
					"id": "2ec671ff-ecc3-48d3-8d24-82da22dc8847",
					"userId": "ec732169-79a9-437d-b5d2-685cf5ca1a88",
					"fullName": "FullName+09366640102009927",
					"line1": "788  Rogers Street",
					"line2": "line 2",
					"city": "Sharonville",
					"province": "Ohio",
					"country": null,
					"zip": "45241",
					"rawAddress": "788  Rogers Street Sharonville Ohio 45241",
					"createdAt": "2021-08-11T23:39:07.364Z",
					"updatedAt": "2021-08-11T23:39:07.364Z",
					"deletedAt": null,
					"countryAlpha2Code": "OH",
					"countryAlpha3Code": "OH",
					"smartyStreetValidated": false,
					"phoneNumber": "567-277-1685",
					"type": "mailing"
				}],
				"artistBrandId": "4e8a6084-5775-4994-b179-71837fbe615f"
			},
			"isLoggedIn": true,
			"name": "",
			"password": ""
		},
		"shippingAddressId": "2ec671ff-ecc3-48d3-8d24-82da22dc8847"
	}
}


exports.tippingPaymentIntent = (eventId, price, paymentMethodId = defaultPaymentMethod) => {
	return {
		"paymentMethodId": paymentMethodId,
		"method": "stripe",
		"eventId": eventId,
		"location": {
		"locationData": null,
		"address": {}
		},
		"selectedCurrency": "USD",
		"timezone": "America/Los_Angeles",
		"saveCard": false,
		"userInfo": {
		"data": {
			"id": "a4533f82-ffde-4791-9608-e226ab5fd093",
			"firstName": "Test MH",
			"lastName": "Staging",
			"slug": "test-mhstaging4",
			"email": "test.mh.staging+main@gmail.com",
			"passwordHash": "$2b$10$OfX2xnQJa6qa6HwyJ0SifeClBFPN1RWKJRi6OfhINjWgz1Rxg0Obe",
			"createdAt": "2021-05-10T22:06:15.869Z",
			"updatedAt": "2021-05-10T22:06:15.869Z",
			"isSuper": true,
			"stripeAccountId": null,
			"phone": null,
			"resetPasswordToken": null,
			"isVerified": false,
			"paypal": null,
			"stripeCustomerId": null,
			"externalBillingId": "cus_JScl6IybXE9tio",
			"lang": "en",
			"timezone": "America/Los_Angeles",
			"image": "user/1621280654978_blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6364.jpeg",
			"bio": null,
			"instagram": null,
			"shippingAddresses": [{
			"id": "3522a634-f11f-4049-8995-29c1a3bd5534",
			"userId": "a4533f82-ffde-4791-9608-e226ab5fd093",
			"fullName": "Test PH Address",
			"line1": "blk 7 lot 10",
			"line2": "Cottage Ave",
			"city": "Sharon Springs",
			"province": "Davao del Sur",
			"country": "Philippines",
			"zip": "8001",
			"rawAddress": "blk 7 lot 10 Sharon Springs Davao del Sur 8001",
			"createdAt": "2021-06-01T20:59:26.772Z",
			"updatedAt": "2021-06-01T20:59:26.772Z",
			"deletedAt": null,
			"countryAlpha2Code": "PH",
			"countryAlpha3Code": "PHL",
			"smartyStreetValidated": false,
			"phoneNumber": "+6311002312",
			"type": "mailing"
			}, {
			"id": "02b5bbbe-2ea9-4038-8d69-31ad29e2ce6e",
			"userId": "a4533f82-ffde-4791-9608-e226ab5fd093",
			"fullName": "a",
			"line1": "Cottage Avenue",
			"line2": "Sharon Springs",
			"city": "Baltimore",
			"province": "MD",
			"country": "United States of America",
			"zip": "21215",
			"rawAddress": "Cottage Avenue, Baltimore, MD, USA",
			"createdAt": "2021-06-02T22:48:07.024Z",
			"updatedAt": "2021-06-02T22:48:07.024Z",
			"deletedAt": null,
			"countryAlpha2Code": "US",
			"countryAlpha3Code": "USA",
			"smartyStreetValidated": true,
			"phoneNumber": "",
			"type": "mailing"
			}],
			"paymentMethods": [{
			"id": "pm_1IxK1mIm56RF6P9ofbSeEyF7",
			"userId": "a4533f82-ffde-4791-9608-e226ab5fd093",
			"stripeCustomerId": "cus_JScl6IybXE9tio",
			"isDefault": true,
			"paymentMethodType": "card",
			"billingName": "Declined card~",
			"cardBrand": "visa",
			"cardCountry": "US",
			"cardExpMonth": "11",
			"cardExpYear": "2031",
			"cardLast4": "4954",
			"cardFunding": "credit",
			"deletedAt": null,
			"createdAt": "2021-05-31T22:56:12.433Z"
			}, {
			"id": "pm_1IxdP7Im56RF6P9oIgdQ3pKr",
			"userId": "a4533f82-ffde-4791-9608-e226ab5fd093",
			"stripeCustomerId": "cus_JScl6IybXE9tio",
			"isDefault": true,
			"paymentMethodType": "card",
			"billingName": "Auto Tester",
			"cardBrand": "visa",
			"cardCountry": "US",
			"cardExpMonth": "12",
			"cardExpYear": "2031",
			"cardLast4": "4242",
			"cardFunding": "credit",
			"deletedAt": null,
			"createdAt": "2021-06-01T19:37:34.806Z"
			}]
		},
		"isLoggedIn": true,
		"name": "",
		"password": "",
		"email": "free@momenthouse.com"
		},
		"price": price,
		"messageText": "hey I just sent you tip!"
	}
};


exports.addonPaymentIntent = (parentEventId, addonType, addonId, paymentMethodId = defaultPaymentMethod, ticketId) => {
	return {
		"method": "stripe",
		"paymentMethodId": paymentMethodId,
		"parentEventId": parentEventId,
		"addOnType": addonType,
		"addOnId": addonId,
		"saveCard": false,
		"ticketId": ticketId,
		"selectedCurrency": "PHP",
		"userInfo": {
			"data": {
				"id": "a4533f82-ffde-4791-9608-e226ab5fd093",
				"firstName": "Test MH",
				"lastName": "Staging",
				"slug": "test-mhstaging4",
				"email": "test.mh.staging+main@gmail.com",
				"passwordHash": "$2b$10$OfX2xnQJa6qa6HwyJ0SifeClBFPN1RWKJRi6OfhINjWgz1Rxg0Obe",
				"createdAt": "2021-05-10T22:06:15.869Z",
				"updatedAt": "2021-05-10T22:06:15.869Z",
				"isSuper": true,
				"stripeAccountId": null,
				"phone": null,
				"resetPasswordToken": null,
				"isVerified": false,
				"paypal": null,
				"stripeCustomerId": null,
				"externalBillingId": "cus_JScl6IybXE9tio",
				"lang": "en",
				"timezone": "America/Los_Angeles",
				"image": "user/1621280654978_blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6364.jpeg",
				"bio": null,
				"instagram": null,
				"shippingAddresses": [{
					"id": "3522a634-f11f-4049-8995-29c1a3bd5534",
					"userId": "a4533f82-ffde-4791-9608-e226ab5fd093",
					"fullName": "Test PH Address",
					"line1": "blk 7 lot 10",
					"line2": "Cottage Ave",
					"city": "Sharon Springs",
					"province": "Davao del Sur",
					"country": "Philippines",
					"zip": "8001",
					"rawAddress": "blk 7 lot 10 Sharon Springs Davao del Sur 8001",
					"createdAt": "2021-06-01T20:59:26.772Z",
					"updatedAt": "2021-06-01T20:59:26.772Z",
					"deletedAt": null,
					"countryAlpha2Code": "PH",
					"countryAlpha3Code": "PHL",
					"smartyStreetValidated": false,
					"phoneNumber": "+6311002312",
					"type": "mailing"
				}, {
					"id": "02b5bbbe-2ea9-4038-8d69-31ad29e2ce6e",
					"userId": "a4533f82-ffde-4791-9608-e226ab5fd093",
					"fullName": "a",
					"line1": "Cottage Avenue",
					"line2": "Sharon Springs",
					"city": "Baltimore",
					"province": "MD",
					"country": "United States of America",
					"zip": "21215",
					"rawAddress": "Cottage Avenue, Baltimore, MD, USA",
					"createdAt": "2021-06-02T22:48:07.024Z",
					"updatedAt": "2021-06-02T22:48:07.024Z",
					"deletedAt": null,
					"countryAlpha2Code": "US",
					"countryAlpha3Code": "USA",
					"smartyStreetValidated": true,
					"phoneNumber": "",
					"type": "mailing"
				}],
				"paymentMethods": [{
					"id": "pm_1IxK1mIm56RF6P9ofbSeEyF7",
					"userId": "a4533f82-ffde-4791-9608-e226ab5fd093",
					"stripeCustomerId": "cus_JScl6IybXE9tio",
					"isDefault": true,
					"paymentMethodType": "card",
					"billingName": "Declined card~",
					"cardBrand": "visa",
					"cardCountry": "US",
					"cardExpMonth": "11",
					"cardExpYear": "2031",
					"cardLast4": "4954",
					"cardFunding": "credit",
					"deletedAt": null,
					"createdAt": "2021-05-31T22:56:12.433Z"
				}, {
					"id": "pm_1IxdP7Im56RF6P9oIgdQ3pKr",
					"userId": "a4533f82-ffde-4791-9608-e226ab5fd093",
					"stripeCustomerId": "cus_JScl6IybXE9tio",
					"isDefault": true,
					"paymentMethodType": "card",
					"billingName": "Auto Tester",
					"cardBrand": "visa",
					"cardCountry": "US",
					"cardExpMonth": "12",
					"cardExpYear": "2031",
					"cardLast4": "4242",
					"cardFunding": "credit",
					"deletedAt": null,
					"createdAt": "2021-06-01T19:37:34.806Z"
				}]
			},
			"isLoggedIn": true,
			"name": "",
			"password": "",
			"email": "free@momenthouse.com"
		}
	}
};