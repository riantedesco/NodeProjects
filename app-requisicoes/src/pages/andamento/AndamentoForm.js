import React from "react";
import { Calendar } from 'primereact/calendar';

const AndamentoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAndamento({ ...props.andamento, [name]: value });
  };

  return (
    <form>
      <div class="form-group">
        <label>Data Hora</label>
        <br></br>
        <Calendar name="dataHora" value={props.andamento.dataHora} onChange={handleInputChange}></Calendar>
      </div>
      <div class="form-group">
        <label>Título</label>
        <input
          class="form-control"
          type="text"
          name="titulo"
          value={props.andamento.titulo}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <input
          class="form-control"
          type="text"
          name="descricao"
          value={props.andamento.descricao}
          onChange={handleInputChange}
        />
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

export default AndamentoForm;
