const axios = require("axios");
const md5 = require("md5");
const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = {
  async requestCardPayment(request, response) {
    const { amount, cardToken, description } = request.body;

    try {
      const charge = await stripe.charges.create({
        amount: amount * 100,
        currency: "brl",
        source: cardToken,
        description,
      });

      return response.json(charge);
    } catch (err) {
      return response.status(500);
    }
  },
};

/*

{
  id: 'tok_1IDsaCHPl1YQKYYUiLXtylcR',
  object: 'token',
  card: {
    id: 'card_1IDsaCHPl1YQKYYUFeo5E5at',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'MasterCard',
    country: 'BR',
    cvc_check: 'unchecked',
    dynamic_last4: null,
    exp_month: 8,
    exp_year: 2028,
    funding: 'credit',
    last4: '8961',
    name: 'FERNANDO S ALMEIDA',
    tokenization_method: null
  },
  client_ip: '201.34.56.94',
  created: 1611671512,
  livemode: true,
  type: 'card',
  used: false
}

*/
