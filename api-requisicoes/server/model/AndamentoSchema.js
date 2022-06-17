const mongoose = require("mongoose");

const AndamentoSchema = new mongoose.Schema({
    dataHora: { type: Date, required: true},
    titulo: { type: String, required: true, unique:true },
    descricao: { type: String, required: true },
    atividade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Atividade',
        //required: true,
    },
    colaborador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colaborador',
        //required: true,
    },
});

module.exports = mongoose.model("Andamento", AndamentoSchema);