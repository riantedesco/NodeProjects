import React from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useForm } from "react-hook-form";

const ColaboradorForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setColaborador({ ...props.colaborador, [name]: value });
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => { props.salvar(); }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="card">
          <h5>Cadastro de Colaboradores</h5>
          <div className="p-fluid grid formgrid">

            <div className="field col-12 md:col-4">
              <label htmlFor="nome">Nome</label>
              <InputText id="nome" name="nome" defaultValue={props.colaborador.nome}
                {...register("nome", {
                  required: { value: true, message: "O nome é obrigatório." },
                  minLength: { value: 2, message: "O nome deve ter pelo menos 2 caracteres." },
                  maxLength: { value: 50, message: "O nome deve ter no máximo 50 caracteres." }
                })}
                onChange={handleInputChange} />
              {errors.nome && <span style={{ color: 'red' }}>{errors.nome.message}</span>}
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="email">Email</label>
              <InputText id="email" name="email" defaultValue={props.colaborador.email}
                {...register("email", {
                  required: { value: true, message: "O email é obrigatório." },
                  minLength: { value: 10, message: "O email deve ter pelo menos 10 caracteres." },
                  maxLength: { value: 100, message: "O email deve ter no máximo 100 caracteres." }
                })}
                onChange={handleInputChange} />
              {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
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

export default ColaboradorForm;
