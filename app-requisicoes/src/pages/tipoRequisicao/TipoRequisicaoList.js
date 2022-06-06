import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const TipoRequisicaoList = (props) => {
  const operacoesBodyTemplate = (rowData) => {
    return (
      <>
        <Button type="button" icon="pi pi-pencil" className="p-button-rounded p-button-text "
          onClick={() => props.editar(rowData._id)}></Button>
        <Button type="button" icon="pi pi-trash" className="p-button-rounded p-button-text"
          onClick={() => { props.excluir(rowData._id); }}></Button>
      </>
    )
  }

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      Listagem de Tipos de Requisição
      <Button icon="pi pi-file-o" label="Inserir" className="p-button-sm" onClick={() => props.inserir()} />
    </div>
  );

  const footer = `Total de itens: ${props.tiposRequisicao ? props.tiposRequisicao.length : 0}`;

  return (
    <div className="App">

      {/* Montando uma tabela com datatable  */}
      <DataTable value={props.tiposRequisicao} responsiveLayout="scroll" header={header} footer={footer}
        paginator className="p-datatable-sm" paginatorPosition="top"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Mostrando de {first} até {last} de {totalRecords}"
        rows={5} rowsPerPageOptions={[5, 10, 20, 50]}
        emptyMessage="Nenhum tipo de requisição encontrado."
        selectionMode="single" selection={props.tipoRequisicao} onSelectionChange={e => props.setTipoRequisicao(e.value)} dataKey="_id"
      >
        <Column field="_id" header="Id" sortable></Column>
        <Column field="descricao" header="Descrição" sortable filter></Column>
        <Column header="Operações" body={operacoesBodyTemplate}></Column>
      </DataTable>

    </div>
  );
};

export default TipoRequisicaoList;
