import React, { useState, useEffect } from "react";
import RequisicaoSrv from "../requisicao/RequisicaoSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const AtividadeForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAtividade({ ...props.atividade, [name]: value });
  };

  const statusSelectItems = [
    { label: 'Aberto', value: 'Aberto' },
    { label: 'Em andamento', value: 'Em Andamento' },
    { label: 'Cancelado', value: 'Cancelado' },
    { label: 'Concluído', value: 'Concluído' }
  ];

  const [requisicoes, setRequisicoes] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    RequisicaoSrv.listar().then((response) => {
      setRequisicoes(response.data);
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
        <label>Título</label>
        <input
          class="form-control"
          type="text"
          name="titulo"
          value={props.atividade.titulo}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Descrição</label>
        <input
          class="form-control"
          type="text"
          name="descricao"
          value={props.atividade.descricao}
          onChange={handleInputChange}
        />
      </div>
      <div class="form-group">
        <label>Status</label>
        <br></br>
        <Dropdown name="status" value={props.atividade.status} options={statusSelectItems} onChange={handleInputChange} placeholder="Selecione um status" />
      </div>
      <div class="form-group">
        <label>Prazo</label>
        <br></br>
        <Calendar name="prazo" value={props.atividade.prazo} onChange={handleInputChange}></Calendar>
      </div>
      <div class="form-group">
        <label>Agenda Início</label>
        <br></br>
        <Calendar name="agendaInicio" value={props.atividade.agendaInicio} onChange={handleInputChange}></Calendar>
      </div>
      <div class="form-group">
        <label>Data Hora Término</label>
        <br></br>
        <Calendar name="dataHoraTermino" value={props.atividade.dataHoraTermino} onChange={handleInputChange}></Calendar>
      </div>
      <div class="form-group">
        <label>Requisição</label>
        <br></br>
        <Dropdown name="requisicao" value={props.atividade.requisicao} options={requisicoes}
          optionLabel="titulo" optionValue="_id"
          onChange={handleInputChange} placeholder="Selecione uma requisição" />
      </div>
      <div class="form-group">
        <label>Colaborador</label>
        <br></br>
        <Dropdown name="colaborador" value={props.atividade.colaborador} options={colaboradores}
          optionLabel="nome" optionValue="_id"
          onChange={handleInputChange} placeholder="Selecione um colaborador" />
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

export default AtividadeForm;
