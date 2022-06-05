const mongoose = require("mongoose");

const SolicitanteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    senha: { type: String, required: true },
});

module.exports = mongoose.model("Solicitante", SolicitanteSchema);