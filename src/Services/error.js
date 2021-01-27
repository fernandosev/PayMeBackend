module.exports = {
  PayMeError(message) {
    this.name = "MeuErro";
    this.message = message || "Mensagem de erro padrão";
    this.stack = new Error().stack;
  },
};
