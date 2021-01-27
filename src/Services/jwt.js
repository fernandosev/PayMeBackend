const jwt = require("jsonwebtoken");

module.exports = {
  verifyJWT(req, res, next) {
    var token = req.headers["access-token"];
    if (!token)
      return res.status(401).json({
        auth: false,
        message: "User not unauthorized!",
        messageEN: "User not unauthorized!",
        messageBR: "Usuário não autorizado!",
      });

    jwt.verify(token, process.env.SESSION_TOKENIZE, function (err, decoded) {
      if (err)
        return res.status(401).json({
          auth: false,
          message: "User not unauthorized!",
          messageEN: "User not unauthorized!",
          messageBR: "Usuário não autorizado!",
        });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  },
};
