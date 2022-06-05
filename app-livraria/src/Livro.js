import React, { useState, useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LivroList from './LivroList';
import LivroForm from './LivroForm';
import LivroSrv from "./services/LivroSrv";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

function Livros() {
    // Declare variáveis de state

    const [livros, setLivros] = useState([]);
   
        
    useEffect(() => {
        onClickAtualizar(); // ao inicializar execula método para atualizar
    }, []);

    const onClickAtualizar = () => {
        LivroSrv.listar().then(response => {
            setLivros(response.data);
            toastRef.current.show({
                severity: 'success',
                summary: "Livros atualizados",
                life: 3000
            });
        }).catch(e => {
            toastRef.current.show({
                severity: 'error',
                summary: e.message,
                life: 3000
            });
        });
    }

    

    // operação inserir
    const initialState = { id: null, titulo: '', dataLancamento: '', classificacao: '', genero: '', autor: '', editora: '' }
    const [livro, setLivro] = useState(initialState)
    const [editando, setEditando] = useState(false)
    const inserir = () => {
        setLivro(initialState);
        setEditando(true);
    }

    const salvar = () => {
        console.log('Salvar ...');
        if (livro._id == null) { // inclussão
            LivroSrv.incluir(livro).then(response => {
                setEditando(false);
                onClickAtualizar();
                toastRef.current.show({ severity: 'success', summary: "Salvou", life: 2000 });
            })
                .catch(e => {
                    toastRef.current.show({ severity: 'error', summary: e.message, life: 4000 });
                });
        } else { // alteração
            LivroSrv.alterar(livro).then(response => {
                setEditando(false);
                onClickAtualizar();
                toastRef.current.show({ severity: 'success', summary: "Salvou", life: 2000 });
            })
                .catch(e => {
                    toastRef.current.show({ severity: 'error', summary: e.message, life: 4000 });
                });
        }
    }

    const toastRef = useRef();

    const editar = (_id) => {
        setLivro(livros.filter((livro) => livro._id == _id)[0]);
        setEditando(true);
    }

    const excluir = (_id) => {
        confirmDialog({
            message: 'Confirma a exclusão?',
            header: 'Confirmação',
            icon: 'pi pi-question',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptClassName: 'p-button-danger',
            accept: () => excluirConfirm(_id)
        });
    }

    const excluirConfirm = (_id) => {
        LivroSrv.excluir(_id).then(response => {
            onClickAtualizar();
            toastRef.current.show({
                severity: 'success',
                summary: "Excluído", life: 2000
            });
        })
            .catch(e => {
                toastRef.current.show({
                    severity: 'error',
                    summary: e.message, life: 4000
                });
            });
    }

    const cancelar = () => {
        console.log('Cancelou ...');
        setEditando(false);
    }

    if (!editando) {
        return (
            <div className="App">
                <ConfirmDialog />
                <Toast ref={toastRef} />
                <LivroList livros={livros} onClickAtualizar={onClickAtualizar}
                    inserir={inserir} editar={editar} excluir={excluir} />
            </div>

        );
    } else {
        return (
            <div className="App">
                <LivroForm livro={livro} setLivro={setLivro}
                    salvar={salvar} cancelar={cancelar} />
            </div>
        );
    }
}

export default Livros;