const mongoose = require("mongoose");

const RequisicaoSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique:true },
    descricao: { type: String, required: true },
    dataHoraCriada: { type: Date, required: true},
    status: { type: String, required: true },
    prazoAtendimento: { type: Date, required: true},
    tipoRequisicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TipoRequisicao',
        //required: true,
    },
    solicitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solicitante',
        //required: true,
    },
});

module.exports = mongoose.model("RequisicaoSchema", RequisicaoSchema);