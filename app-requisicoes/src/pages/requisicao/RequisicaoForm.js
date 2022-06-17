import React, { useState, useEffect } from "react";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";
import SolicitanteSrv from "../solicitante/SolicitanteSrv";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";

const RequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => { props.salvar(); }

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="card">
          <h5>Cadastro de Requisições</h5>
          <div className="p-fluid grid formgrid">

            <div className="field col-12 md:col-4">
              <label htmlFor="titulo">Título</label>
              <InputText id="titulo" name="titulo" defaultValue={props.requisicao.titulo}
                {...register("titulo", {
                  required: { value: true, message: "O título é obrigatório." },
                  minLength: { value: 5, message: "O título deve ter pelo menos 5 caracteres." },
                  maxLength: { value: 100, message: "O título deve ter no máximo 100 caracteres." }
                })}
                onChange={handleInputChange} />
              {errors.titulo && <span style={{ color: 'red' }}>{errors.titulo.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="descricao">Descrição</label>
              <InputText id="descricao" name="descricao" defaultValue={props.requisicao.descricao}
                {...register("descricao", {
                  required: { value: true, message: "A descrição é obrigatória." },
                  minLength: { value: 5, message: "A descrição deve ter pelo menos 5 caracteres." },
                  maxLength: { value: 100, message: "A descrição deve ter no máximo 100 caracteres." }
                })}
                onChange={handleInputChange} />
              {errors.descricao && <span style={{ color: 'red' }}>{errors.descricao.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="dataHoraCriada">Data e Hora Criação</label>
              <Calendar id="dataHoraCriada" name="dataHoraCriada" defaultValue={props.requisicao.dataHoraCriada}
                // {...register("dataHoraCriada", {
                //   required: { value: true, message: "A data e hora de criação são obrigatórias." }
                // })}
                // A validação precisa acontecer de maneira diferente de imput
                onChange={handleInputChange} />
              {errors.dataHoraCriada && <span style={{ color: 'red' }}>{errors.dataHoraCriada.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="status">Status</label>
              <Dropdown id="status" name="status" value={props.requisicao.status}
                // {...register("status", {
                //   required: { value: true, message: "O status é obrigatório." }
                // })}
                // A validação precisa acontecer de maneira diferente de imput
                onChange={handleInputChange} options={statusSelectItems}
                placeholder="Selecione um status" />
              {errors.status && <span style={{ color: 'red' }}>{errors.status.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="prazoAtendimento">Prazo de Atendimento</label>
              <Calendar id="prazoAtendimento" name="prazoAtendimento" defaultValue={props.requisicao.prazoAtendimento}
                // {...register("prazoAtendimento", {
                //   required: { value: true, message: "O prazo de atendimento é obrigatório." }
                // })}
                // A validação precisa acontecer de maneira diferente de imput
                onChange={handleInputChange} />
              {errors.prazoAtendimento && <span style={{ color: 'red' }}>{errors.prazoAtendimento.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="tipoRequisicao">Tipo de Requisição</label>
              <Dropdown id="tipoRequisicao" name="tipoRequisicao" value={props.requisicao.tipoRequisicao}
                onChange={handleInputChange} options={tiposRequisicao}
                optionLabel="descricao" optionValue="_id" placeholder="Selecione um tipo de requisição" />
              {errors.tipoRequisicao && <span style={{ color: 'red' }}>{errors.tipoRequisicao.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="solicitante">Solicitante</label>
              <Dropdown id="solicitante" name="solicitante" value={props.requisicao.solicitante}
                onChange={handleInputChange} options={solicitantes}
                optionLabel="nome" optionValue="_id" placeholder="Selecione um solicitante" />
              {errors.solicitante && <span style={{ color: 'red' }}>{errors.solicitante.message}</span>}
            </div>

          </div>
        </div>
      </div>

      <div>
        <Button label="Salvar" icon="pi pi-save" type="submit"
          className="p-button-secondary p-button-text" />
        <Button label="Cancelar" icon="pi pi-times-circle" onClick={props.cancelar}
          className="p-button-secondary p-button-text" />
      </div>

    </form>
  );
};

export default RequisicaoForm;
