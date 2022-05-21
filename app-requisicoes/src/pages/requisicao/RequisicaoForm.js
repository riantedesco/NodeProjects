import React from "react";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const RequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  const statusSelectItems = [
    {label: 'Aberto', value: 'Aberto'},
    {label: 'Em andamento', value: 'Em Andamento'},
    {label: 'Cancelado', value: 'Cancelado'},
    {label: 'Concluído', value: 'Concluído'}
];

  return (
    <form>
      <div class="form-group">
        <label>Título</label>
        <input
          class="form-control"
          type="text"
          name="titulo"
          value={props.requisicao.titulo}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <input
          class="form-control"
          type="text"
          name="descricao"
          value={props.requisicao.descricao}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Data Hora Criada</label>
        <br></br>
        <Calendar name="dataHoraCriada" value={props.requisicao.dataHoraCriada} onChange={handleInputChange}></Calendar>
      </div>
      <div class="form-group">
        <label>Status</label>
        <br></br>
        <Dropdown name="status" value={props.requisicao.status} options={statusSelectItems} onChange={handleInputChange} placeholder="Selecione um status"/>
      </div>
      <div class="form-group">
        <label>Prazo de Atendimento</label>
        <br></br>
        <Calendar name="prazoAtendimento" value={props.requisicao.prazoAtendimento} onChange={handleInputChange}></Calendar>
      </div>
      <div class="form-group">
        <button
          type="button"
          onClick={props.salvar}
          className="btn btn-primary btn-sm"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={props.cancelar}
          className="btn btn-primary btn-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
export default RequisicaoForm;
