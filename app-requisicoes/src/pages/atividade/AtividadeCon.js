import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import AtividadeList from "./AtividadeList";
import AtividadeForm from "./AtividadeForm";
import AtividadeSrv from "./AtividadeSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function AtividadeCon() {
  const [atividades, setAtividades] = useState([]);
  const initialState = { id: null, titulo: "", descricao: "", status: "", prazo: "", agendaInicio: "", dataHoraTermino: "" };
  const [atividade, setAtividade] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    AtividadeSrv.listar().then((response) => {
        setAtividades(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Atividades Atualizadas!",
          life: 3000,
        });
      })
      .catch((e) => {
        console.log("Erro: " + e.message);
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  };

  const inserir = () => {
    setAtividade(initialState);
    setEditando(true);
  };

  const salvar = () => {
    console.log(atividade);
    if (atividade._id == null) { // inclusão
      AtividadeSrv.incluir(atividade)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    } else { // alteração
      AtividadeSrv.alterar(atividade)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    }
  };

  const cancelar = () => {
    setEditando(false);
  };

  const editar = (id) => {
    setAtividade(
      atividades.filter((atividade) => atividade._id == id)[0]
    );
    setEditando(true);
  };

  const excluir = (_id) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(_id),
    });
  };

  const excluirConfirm = (_id) => {
    AtividadeSrv.excluir(_id)
      .then((response) => {
        onClickAtualizar();
        toastRef.current.show({
          severity: "success",
          summary: "Excluído",
          life: 2000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 4000,
        });
      });
  };


  if (!editando) {
    return (
      <div>
        <ConfirmDialog />
        <AtividadeList
          atividades={atividades}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
        <Toast ref={toastRef} />
      </div>
    );
  } else {
    return (
      <div>
        <AtividadeForm
          atividade={atividade}
          setAtividade={setAtividade}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }

}

export default AtividadeCon;
