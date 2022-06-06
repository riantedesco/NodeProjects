import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import TipoRequisicaoList from "./TipoRequisicaoList";
import TipoRequisicaoForm from "./TipoRequisicaoForm";
import TipoRequisicaoSrv from "./TipoRequisicaoSrv";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function TipoRequisicaoCon() {
  const [tiposRequisicao, setTiposRequisicao] = useState([]);
  const initialState = { id: null, descricao: "" };
  const [tipoRequisicao, setTipoRequisicao] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar(); // ao inicializar execula método para atualizar
  }, []);

  const onClickAtualizar = () => {
    TipoRequisicaoSrv.listar().then((response) => {
      setTiposRequisicao(response.data);
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
    setTipoRequisicao(initialState);
    setEditando(true);
  };

  const salvar = () => {
    console.log(tipoRequisicao);
    if (tipoRequisicao._id == null) { // inclusão
      TipoRequisicaoSrv.incluir(tipoRequisicao)
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
      TipoRequisicaoSrv.alterar(tipoRequisicao)
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
    setTipoRequisicao(
      tiposRequisicao.filter((tipoRequisicao) => tipoRequisicao._id === id)[0]
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
    TipoRequisicaoSrv.excluir(_id)
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
        <TipoRequisicaoList
          tiposRequisicao={tiposRequisicao}
          tipoRequisicao={tipoRequisicao}
          setTipoRequisicao={setTipoRequisicao}
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
        <TipoRequisicaoForm
          tipoRequisicao={tipoRequisicao}
          setTipoRequisicao={setTipoRequisicao}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef} />
      </div>
    );
  }

}

export default TipoRequisicaoCon;
