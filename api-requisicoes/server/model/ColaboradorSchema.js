const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const ColaboradorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { 
        type: String, 
        unique:true,
        // required: true
    },
    senha: { 
        type: String,
        // required: true
    },
});

ColaboradorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, nome: this.nome },
        process.env.JWT_PRIV_KEY, { expiresIn: process.env.TOKEN_EXPIRE }
        );
        return token;
};

module.exports = mongoose.model("Colaborador", ColaboradorSchema);