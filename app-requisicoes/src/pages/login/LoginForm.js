import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef } from "react";
import LoginSrv from "./LoginSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const LoginForm = (props) => {
    const [credenciais, setCredenciais] = useState({ "email": "", "senha": "" })

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setCredenciais({ ...credenciais, [id]: value });
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const toastRef = useRef();
    
    const onSubmit = data => {
        LoginSrv.login(credenciais).then(response => {
            let token = response.data;
            if (token) {
                sessionStorage.setItem('token', token);
                window.location = "/";
            } else {
                toastRef.current.show({ severity: 'error', summary: 'Erro no login', life: 5000 });
            }
        }).catch(({ response }) => {
            toastRef.current.show({ severity: 'error', summary: response.data, life: 5000 });
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Toast ref={toastRef} />
            <div>
            <div className="card" style={{ width: '200px', textAlign: "center", marginLeft: '40%', marginTop: '15%' }}>
                <h5>Login</h5>
                <br></br>
                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="senha">Email</label>
                        <InputText id="email" className="p-inputtext-sm block mb-2"
                            {...register("email", {
                                required: { value: true, message: "Email é obrigatório" },
                                minLength: { value: 2, message: "O email deve ter no mínimo 2 caracteres" },
                                maxLength: { value: 70, message: "O email deve ter no máximo 70 caracteres" },
                            })}
                            defaultValue={credenciais.email} onChange={handleInputChange} />

                        <label htmlFor="senha">Senha</label>
                        <InputText type={'password'} id="senha" className="p-inputtext-sm block mb-2"
                            {...register("senha", {
                                required: { value: true, message: "Senha é obrigatória" },
                                minLength: { value: 2, message: "A senha deve ter no mínimo 3 caracteres" },
                                maxLength: { value: 70, message: "A senha deve ter no máximo 70 caracteres" },
                            })}
                            defaultValue={credenciais.senha} onKeyUp={handleInputChange} />
                        {errors.senha && <span style={{ color: 'red' }}>{errors.senha.message}</span>}
                    </div>
                </div>
                <br />
                <Button icon="pi pi-sign-in" type="submit" label="Login" className="p-button-text" />
            </div>
            </div>
        </form>
    );
}

export default LoginForm;