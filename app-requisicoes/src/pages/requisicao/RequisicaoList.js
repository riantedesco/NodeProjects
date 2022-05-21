import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const RequisicaoList = (props) => {

  const operacoesBodyTemplate = (rowData) => {
    return (
      <>
        <button
          onClick={() => props.editar(rowData._id)}
          className="btn btn-warning btn-sm">Editar</button>
        <button
          onClick={() => props.excluir(rowData._id)}
          className="btn btn-danger btn-sm">Excluir</button>
      </>
    )
  }

  return (
    <div className="App">
      <h4>Listagem de Requisições</h4>
      <button
        className="btn btn-primary btn-sm"
        onClick={props.onClickAtualizar}
      >
        Atualizar Lista
      </button>

      <button className="btn btn-success btn-sm" onClick={props.inserir}>
        Inserir
      </button>

      <DataTable value={props.requisicoes} paginator paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" currentPageReportTemplate="Mostrando de {first} até {last} de {totalRecords}" rows={5} rowsPerPageOptions={[5, 10, 20, 50]}
        responsiveLayout="scroll" emptyMessage="Nenhum tipo de requisição encontrado"
        selectionMode="single" selection={props.requisicao} onSelectionChange={e => props.setRequisicao(e.value)} dataKey="_id">
        <Column field="_id" header="Id" sortable></Column>
        <Column field="titulo" header="Título" sortable filter></Column>
        <Column field="descricao" header="Descrição" sortable filter></Column>
        <Column field="dataHoraCriada" header="Data Hora Criada" sortable filter></Column>
        <Column field="status" header="Status" sortable filter></Column>
        <Column field="prazoAtendimento" header="Prazo de Atendimento" sortable filter></Column>
        <Column header="Operações" body={operacoesBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};
export default RequisicaoList;
