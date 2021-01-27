const axios = require("axios");
const md5 = require("md5");

module.exports = {
  async requestToken(request, response) {
    const { name, cpf, paymentMethod, number, expirationDate } = request.body;

    try {
      const res = await axios.post(
        process.env.TEST ? process.env.PAYU_TEST_URL : process.env.PAYU_URL,

        {
          language: "es",
          command: "CREATE_TOKEN",
          merchant: {
            apiLogin: process.env.API_LOGIN,
            apiKey: process.env.PUBLIC_KEY,
          },
          creditCardToken: {
            payerId: "0",
            name,
            identificationNumber: cpf,
            paymentMethod,
            number,
            expirationDate,
          },
        }
      );

      return response.json(res.data);
    } catch (err) {
      return response.status(500);
    }
  },
};
