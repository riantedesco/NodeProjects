import React from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

function Menu() {
    let navigate = useNavigate();
    const items = [
        {
            label: 'Home', icon: 'pi pi-home',
            command: () => { navigate("/") }
        },
        {
            label: 'Cadastros', icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Colaboradores', icon: 'pi pi-id-card',
                    command: () => { navigate("/colaborador") }
                }
            ]
        },
        {
            label: 'Sair', icon: 'pi pi-fw pi-power-off'
        }
    ];

    return (<Menubar model={items} />)
}

export default Menu;