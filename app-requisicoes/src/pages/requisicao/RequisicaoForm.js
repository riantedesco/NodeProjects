import React, { useState, useEffect } from "react";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";
import SolicitanteSrv from "../solicitante/SolicitanteSrv";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const RequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  const statusSelectItems = [
    { label: 'Aberto', value: 'Aberto' },
    { label: 'Em andamento', value: 'Em Andamento' },
    { label: 'Cancelado', value: 'Cancelado' },
    { label: 'Concluído', value: 'Concluído' }
  ];

  const [tiposRequisicao, setTiposRequisicao] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    TipoRequisicaoSrv.listar().then((response) => {
      setTiposRequisicao(response.data);
    })
      .catch((e) => {
        console.log("Erro: " + e.message);
      });
      
    SolicitanteSrv.listar().then((response) => {
      setSolicitantes(response.data);
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
        <Dropdown name="status" value={props.requisicao.status} options={statusSelectItems} onChange={handleInputChange} placeholder="Selecione um status" />
      </div>
      <div class="form-group">
        <label>Prazo de Atendimento</label>
        <br></br>
        <Calendar name="prazoAtendimento" value={props.requisicao.prazoAtendimento} onChange={handleInputChange}></Calendar>
      </div>
      <div class="form-group">
        <label>Tipo de Requisição</label>
        <br></br>
        <Dropdown name="tipoRequisicao" value={props.requisicao.tipoRequisicao} options={tiposRequisicao}
          optionLabel="descricao" optionValue="_id"
          onChange={handleInputChange} placeholder="Selecione um tipo de requisição" />
      </div>
      <div class="form-group">
        <label>Solicitante</label>
        <br></br>
        <Dropdown name="solicitante" value={props.requisicao.solicitante} options={solicitantes}
          optionLabel="nome" optionValue="_id"
          onChange={handleInputChange} placeholder="Selecione um solicitante" />
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
