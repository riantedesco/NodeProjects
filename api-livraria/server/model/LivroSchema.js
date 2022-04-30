const mongoose = require("mongoose");

const LivroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    dataLancamento: { type: Date, default: Date.now },
    classificacao: { type: Number, required: true },
    genero: { type: String, required: true },
    autor: { type: String, required: true },
    editora: { type: String, required: true }
});

module.exports = mongoose.model("Livro", LivroSchema);