import React, { useState, useEffect } from "react";
import AtividadeSrv from "../atividade/AtividadeSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv"
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const AndamentoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAndamento({ ...props.andamento, [name]: value });
  };

  const [atividades, setAtividades] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    AtividadeSrv.listar().then((response) => {
      setAtividades(response.data);
    })
      .catch((e) => {
        console.log("Erro: " + e.message);
      });

    ColaboradorSrv.listar().then((response) => {
      setColaboradores(response.data);
    })
      .catch((e) => {
        console.log("Erro: " + e.message);
      });
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
        <label>Atividade</label>
        <br></br>
        <Dropdown name="atividade" value={props.andamento.atividade} options={atividades}
          optionLabel="titulo" optionValue="_id"
          onChange={handleInputChange} placeholder="Selecione uma atividade" />
      </div>
      <div class="form-group">
        <label>Colaborador</label>
        <br></br>
        <Dropdown name="colaborador" value={props.andamento.colaborador} options={colaboradores}
          optionLabel="nome" optionValue="_id"
          onChange={handleInputChange} placeholder="Selecione um colaboador" />
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
