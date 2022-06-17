import React, { useState, useEffect } from "react";
import RequisicaoSrv from "../requisicao/RequisicaoSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";

const AtividadeForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAtividade({ ...props.atividade, [name]: value });
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => { props.salvar(); }

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="card">
          <h5>Cadastro de Atividades</h5>
          <div className="p-fluid grid formgrid">

            <div className="field col-12 md:col-4">
              <label htmlFor="titulo">Título</label>
              <InputText id="titulo" name="titulo" defaultValue={props.atividade.titulo}
                {...register("titulo", {
                  required: { value: true, message: "O título é obrigatório." },
                  minLength: { value: 5, message: "O título deve ter pelo menos 5 caracteres." },
                  maxLength: { value: 100, message: "O título deve ter no máximo 100 caracteres." }
                })}
                onChange={handleInputChange} />
              {errors.atividade && <span style={{ color: 'red' }}>{errors.atividade.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="descricao">Descrição</label>
              <InputText id="descricao" name="descricao" defaultValue={props.atividade.descricao}
                {...register("descricao", {
                  required: { value: true, message: "A descrição é obrigatória." },
                  minLength: { value: 5, message: "A descrição deve ter pelo menos 5 caracteres." },
                  maxLength: { value: 100, message: "A descrição deve ter no máximo 100 caracteres." }
                })}
                onChange={handleInputChange} />
              {errors.descricao && <span style={{ color: 'red' }}>{errors.descricao.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="status">Status</label>
              <Dropdown id="status" name="status" value={props.atividade.status}
                // {...register("status", {
                //   required: { value: true, message: "O status é obrigatório." }
                // })}
                // A validação precisa acontecer de maneira diferente de imput
                onChange={handleInputChange} options={statusSelectItems} 
                placeholder="Selecione um status"/>
              {errors.status && <span style={{ color: 'red' }}>{errors.status.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="prazo">Prazo</label>
              <Calendar id="prazo" name="prazo" defaultValue={props.atividade.prazo}
                // {...register("prazo", {
                //   required: { value: true, message: "O prazo é obrigatório." }
                // })}
                // A validação precisa acontecer de maneira diferente de imput
                onChange={handleInputChange} />
              {errors.prazo && <span style={{ color: 'red' }}>{errors.prazo.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="agendaInicio">Agenda início</label>
              <Calendar id="agendaInicio" name="agendaInicio" defaultValue={props.atividade.agendaInicio}
                // {...register("agendaInicio", {
                //   required: { value: true, message: "A agenda início é obrigatória." }
                // })}
                // A validação precisa acontecer de maneira diferente de imput
                onChange={handleInputChange} />
              {errors.agendaInicio && <span style={{ color: 'red' }}>{errors.agendaInicio.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="dataHoraTermino">Data e Hora Término</label>
              <Calendar id="dataHoraTermino" name="dataHoraTermino" defaultValue={props.atividade.dataHoraTermino}
                // {...register("dataHoraTermino", {
                //   required: { value: true, message: "A data e hora do término são obrigatórias." }
                // })}
                // A validação precisa acontecer de maneira diferente de imput
                onChange={handleInputChange} />
              {errors.dataHoraTermino && <span style={{ color: 'red' }}>{errors.dataHoraTermino.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="requisicao">Requisição</label>
              <Dropdown id="requisicao" name="requisicao" value={props.atividade.requisicao}
                onChange={handleInputChange} options={requisicoes}
                optionLabel="titulo" optionValue="_id" placeholder="Selecione uma requisição" />
              {errors.requisicao && <span style={{ color: 'red' }}>{errors.requisicao.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="colaborador">Colaborador</label>
              <Dropdown id="colaborador" name="colaborador" value={props.atividade.colaborador}
                onChange={handleInputChange} options={colaboradores}
                optionLabel="nome" optionValue="_id" placeholder="Selecione um colaborador" />
              {errors.colaborador && <span style={{ color: 'red' }}>{errors.colaborador.message}</span>}
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

export default AtividadeForm;
