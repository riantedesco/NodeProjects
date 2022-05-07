const ColaboradorList = (props) => {
  return (
    <div className="App">
      <h4>Listagem de Colaboradores</h4>
      <button
        className="btn btn-primary btn-sm"
        onClick={props.onClickAtualizar}
      >
        Atualizar Lista
      </button>
      <button className="btn btn-success btn-sm" onClick={props.inserir}>
        Inserir
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Operações</th>
          </tr>
        </thead>
        <tbody>
          {props.colaboradores.length > 0 ? (
            props.colaboradores.map((o, index) => (
              <tr key={index}>
                <td>{o._id}</td>
                <td>{o.nome}</td>
                <td>{o.email}</td>
                <td>{o.senha}</td>
                <td>
                  <button
                    onClick={() => props.editar(o._id)}
                    className="btn btn-warning btn-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => props.excluir(o._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Nenhum colaborador!.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ColaboradorList;
