import React from 'react';

const LivroForm = (props) => {

    const handleInputChange = (event) => {
        const { name, value } = event.target
        props.setLivro({ ...props.livro, [name]: value })
    }

    return (
        <form>
            <div class="form-group">
                <label>Titulo</label>
                <input class="form-control" type="text" name="titulo"
                    value={props.livro.nome} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Data de Lançamento</label>
                <input class="form-control" type="text" name="dataLancamento"
                    value={props.livro.dataLancamento} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Classificação</label>
                <input class="form-control" type="text" name="classificacao"
                    value={props.livro.classificacao} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Gênero</label>
                <input class="form-control" type="text" name="genero"
                    value={props.livro.genero} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Autor</label>
                <input class="form-control" type="text" name="autor"
                    value={props.livro.autor} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <label>Editora</label>
                <input class="form-control" type="text" name="editora"
                    value={props.livro.editora} onChange={handleInputChange} />
            </div>
            <div class="form-group">
                <button type="button" onClick={props.salvar}
                    className="btn btn-primary btn-sm">Salvar</button>
                <button type="button" onClick={props.cancelar}
                    className="btn btn-primary btn-sm">Cancelar</button>
            </div>
        </form>
    )
}
export default LivroForm;