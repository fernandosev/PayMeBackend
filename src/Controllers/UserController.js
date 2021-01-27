const User = require("../Models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendCode } = require("../Services/sendVerificationCode");

module.exports = {
  async signUp(request, response) {
    const { name, email, password } = request.body;

    function PayMeError(code, messageEN, messageBR) {
      this.name = "SignUpError";
      this.code = code;
      this.errorMessageEN = messageEN;
      this.errorMessageBR = messageBR;
      this.stack = new Error().stack;
    }

    PayMeError.prototype = Object.create(PayMeError.prototype);
    PayMeError.prototype.constructor = PayMeError;

    try {
      if (!name || !email || !password)
        throw new PayMeError(
          500,
          "All informations is required!",
          "Informe todos os dados!"
        );

      const userExists = await User.findOne({
        email,
      });

      if (userExists)
        throw new PayMeError(
          500,
          "The user already exists!",
          "O usuário já existe!"
        );

      const passwordHash = await bcrypt.hash(password, 10);

      const verificationCode = Math.floor(Math.random() * 99999) + 10000;

      const user = await User.create({
        name,
        email,
        password: passwordHash,
        status: "created",
        verificationCode,
      });

      const formattedUser = { ...user._doc };
      formattedUser.messageEN = "Your user has been registered!";
      formattedUser.messageBR = "Seu suário foi cadastrado.";

      sendCode(verificationCode, email);

      return response.status(200).json(formattedUser);
    } catch (e) {
      return response.status(500).json({
        errorMessageEN:
          e.name && e.name === "SignUpError"
            ? e.errorMessageEN
            : "Internal server error",
        errorMessageBR:
          e.name && e.name === "SignUpError"
            ? e.errorMessageBR
            : "Erro! Tente novamente.",
      });
    }
  },

  async signIn(request, response) {
    const { email, password } = request.body;

    function PayMeError(code, messageEN, messageBR) {
      this.name = "SignInError";
      this.code = code;
      this.errorMessageEN = messageEN;
      this.errorMessageBR = messageBR;
      this.stack = new Error().stack;
    }

    PayMeError.prototype = Object.create(PayMeError.prototype);
    PayMeError.prototype.constructor = PayMeError;

    try {
      if (!email || !password)
        throw new PayMeError(
          500,
          "All informations is required!",
          "Informe todos os dados!"
        );

      const user = await User.findOne({
        email,
      });

      if (!user)
        throw new PayMeError(
          500,
          "The user does not exist!",
          "O usuário não existe!"
        );

      const validatePassword = await bcrypt.compare(password, user.password);

      if (!validatePassword)
        throw new PayMeError(
          500,
          "Verify your informations and try again!",
          "Verifique suas informações e tente novamente!"
        );

      const token = jwt.sign({ token: user._id }, process.env.SESSION_TOKENIZE);

      return response.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        token,
        messageEN: "You are logged in!",
        messageBR: "Você está autenticado!",
      });
    } catch (e) {
      return response.status(500).json({
        errorMessageEN:
          e.name && e.name === "SignInError"
            ? e.errorMessageEN
            : "Internal server error",
        errorMessageBR:
          e.name && e.name === "SignInError"
            ? e.errorMessageBR
            : "Erro! Tente novamente.",
      });
    }
  },

  async validateAccount(request, response) {
    const { id, code } = request.body;

    function PayMeError(code, messageEN, messageBR) {
      this.name = "ValidateAccountError";
      this.code = code;
      this.errorMessageEN = messageEN;
      this.errorMessageBR = messageBR;
      this.stack = new Error().stack;
    }

    PayMeError.prototype = Object.create(PayMeError.prototype);
    PayMeError.prototype.constructor = PayMeError;

    try {
      if (!id || !code)
        throw new PayMeError(
          500,
          "All informations is required!",
          "Informe todos os dados!"
        );

      const user = await User.findOne({
        _id: id,
      });

      if (!user)
        throw new PayMeError(
          500,
          "The user does not exist!",
          "O usuário não existe!"
        );

      console.log(user, code);

      if (user.verificationCode !== code)
        throw new PayMeError(500, "Invalid code!", "Código inválido!");

      await User.updateOne(
        { _id: id },
        { verificationCode: null, status: "active" }
      );

      return response.status(200).json({
        status: "active",
        messageEN: "Your account are active!",
        messageBR: "Sua conta está ativa!",
      });
    } catch (e) {
      return response.status(500).json({
        errorMessageEN:
          e.name && e.name === "ValidateAccountError"
            ? e.errorMessageEN
            : "Internal server error",
        errorMessageBR:
          e.name && e.name === "ValidateAccountError"
            ? e.errorMessageBR
            : "Erro! Tente novamente.",
      });
    }
  },
};
