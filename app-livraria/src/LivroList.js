const LivroList = (props) => (
    <div>
        <h4>Listagem de livros</h4>
        <button className="btn btn-primary btn-sm"
            onClick={props.onClickAtualizar} type="button">Atualizar Lista</button>
        <button className="btn btn-primary btn-sm"
            onClick={props.inserir}>Inserir</button>
        <table className="table">
            <thead>
                <tr><th>Index</th>
                    <th>Titulo</th>
                    <th>Data de Lançamento</th>
                    <th>Classificação</th>
                    <th>Gênero</th>
                    <th>Autor</th>
                    <th>Editora</th>
                </tr>
            </thead>
            <tbody>
                {props.livros.length > 0 ? (props.livros.map((o, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{o.titulo}</td>
                        <td>{o.dataLancamento}</td>
                        <td>{o.classificacao}</td>
                        <td>{o.genero}</td>
                        <td>{o.autora}</td>
                        <td>{o.editora}</td>
                        <td>
                            <button onClick={() => props.editar(o._id)} className="btn btn-primary btn-sm">Editar</button>
                            <button onClick={() => props.excluir(o._id)} className="btn btn-danger btn-sm">Excluir</button>
                        </td>
                    </tr>
                ))) : (
                    <tr> <td colSpan={3}>Nenhum livro.</td> </tr>
                )}
            </tbody>
        </table>
    </div>
)
export default LivroList;