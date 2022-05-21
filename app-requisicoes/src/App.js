import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Menu from './Menu';

const Home = lazy(() => import('./pages/home/Home'));
const ColaboradorCon = lazy(() => import('./pages/colaborador/ColaboradorCon'));
const SolicitanteCon = lazy(() => import('./pages/solicitante/SolicitanteCon'));
const TipoRequisicaoCon = lazy(() => import('./pages/tipoRequisicao/TipoRequisicaoCon'));
const RequisicaoCon = lazy(() => import('./pages/requisicao/RequisicaoCon'));
const AtividadeCon = lazy(() => import('./pages/atividade/AtividadeCon'));
const AndamentoCon = lazy(() => import('./pages/andamento/AndamentoCon'));

function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Suspense fallback={<div>Carregando... </div>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/colaborador" element={<ColaboradorCon/>}/>
          <Route path="/solicitante" element={<SolicitanteCon/>}/>
          <Route path="/tipoRequisicao" element={<TipoRequisicaoCon/>}/>
          <Route path="/requisicao" element={<RequisicaoCon/>}/>
          <Route path="/atividade" element={<AtividadeCon/>}/>
          <Route path="/andamento" element={<AndamentoCon/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );

}

export default App;
