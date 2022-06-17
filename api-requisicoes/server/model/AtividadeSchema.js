const mongoose = require("mongoose");

const AtividadeSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique:true },
    descricao: { type: String, required: true },
    status: { type: String, required: true },
    prazo: { type: Date, required: true},
    agendaInicio: { type: Date, required: true},
    dataHoraTermino: { type: Date, required: true},
    requisicao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Requisicao',
        //required: true,
    },
    colaborador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colaborador',
        //required: true,
    },
});

module.exports = mongoose.model("Atividade", AtividadeSchema);