import React from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";

const TipoRequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setTipoRequisicao({ ...props.tipoRequisicao, [name]: value });
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => { props.salvar(); }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="card">
          <h5>Cadastro de Tipos de Requisição</h5>
          <div className="p-fluid grid formgrid">

            <div className="field col-12 md:col-4">
              <label htmlFor="descricao">Descrição</label>
              <InputText id="descricao" name="descricao" defaultValue={props.tipoRequisicao.descricao}
                {...register("descricao", {
                  required: { value: true, message: "A descrição é obrigatória." },
                  minLength: { value: 5, message: "A descrição deve ter pelo menos 5 caracteres." },
                  maxLength: { value: 100, message: "A descrição deve ter no máximo 100 caracteres." }
                })}
                onChange={handleInputChange} />
              {errors.descricao && <span style={{ color: 'red' }}>{errors.descricao.message}</span>}
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

export default TipoRequisicaoForm;
