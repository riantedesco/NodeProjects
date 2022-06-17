import React, { useState, useEffect } from "react";
import AtividadeSrv from "../atividade/AtividadeSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv"
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";

const AndamentoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAndamento({ ...props.andamento, [name]: value });
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => { props.salvar(); }

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="card">
          <h5>Cadastro de Andamentos</h5>
          <div className="p-fluid grid formgrid">

            <div className="field col-12 md:col-4">
              <label htmlFor="dataHora">Data e Hora</label>
              <Calendar id="dataHora" name="dataHora" defaultValue={props.andamento.dataHora}
                // {...register("dataHora", {
                //   required: { value: true, message: "A data e hora são obrigatórias." }
                // })}
                // A validação precisa acontecer de maneira diferente de imput
                onChange={handleInputChange} />
              {errors.dataHora && <span style={{ color: 'red' }}>{errors.dataHora.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="titulo">Título</label>
              <InputText id="titulo" name="titulo" defaultValue={props.andamento.titulo}
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
              <InputText id="descricao" name="descricao" defaultValue={props.andamento.descricao}
                {...register("descricao", {
                  required: { value: true, message: "A descrição é obrigatória." },
                  minLength: { value: 5, message: "A descrição deve ter pelo menos 5 caracteres." },
                  maxLength: { value: 100, message: "A descrição deve ter no máximo 100 caracteres." }
                })}
                onChange={handleInputChange} />
              {errors.descricao && <span style={{ color: 'red' }}>{errors.descricao.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="atividade">Atividade</label>
              <Dropdown id="atividade" name="atividade" value={props.andamento.atividade}
                onChange={handleInputChange} options={atividades}
                optionLabel="titulo" optionValue="_id" placeholder="Selecione uma atividade" />
              {errors.atividade && <span style={{ color: 'red' }}>{errors.atividade.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="colaborador">Colaborador</label>
              <Dropdown id="colaborador" name="colaborador" value={props.andamento.colaborador}
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

export default AndamentoForm;
