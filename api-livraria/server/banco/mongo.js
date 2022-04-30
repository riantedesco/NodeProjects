const mongoose = require("mongoose");

const uri = "mongodb://admin:admin@localhost:27018/baselivraria?authSource=baselivraria";

mongoose.connect(uri,  {} );
