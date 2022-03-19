module.exports = (app) => {

    app.get('/colaboradores', (req, res) => {
        //res.send('retornar colaboradores');
        db.collection('colaboradores').find().toArray((err, results)=>{
            if (err) throw err;
            res.json(results);
        });
    });

    app.post('/colaboradores', (req, res, next) => {
        db.collection('colaboradores').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({success: "Incluído com sucesso."});
        })
    });

    app.put('/colaboradores', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {$set:{
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }};
        db.collection('colaboradores').updateOne(
            {_id: id},
            newvalues,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount < 1)
                    return res.json({aviso: "Nada alterado."});
                res.json({success: "Alterado com sucesso."});
        })
    });

    app.delete('/colaboradores/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('colaboradores').deleteOne({_id: id}, (err, result)=>{
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({aviso: "Nada excluído." });
            res.json({success: "Excluído com sucesso." });
        });
    });

    app.get('/colaboradores/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('colaboradores').findOne({_id: id}, (err, result)=>{
            if (err) throw err;
            res.json(result);
        });
    });

    app.get('/colaboradores/filtro/:valor' , (req, res) => {
        db.collection('colaboradores').find({
            $or: [
                { nome: { $regex: req.params.valor, $options: "i" } },
                { email: { $regex: req.params.valor, $options: "i" } },
            ],
        }).toArray((err, results)=>{
            if (err) throw err;
            res.json(results);
        });
    });
    
}
