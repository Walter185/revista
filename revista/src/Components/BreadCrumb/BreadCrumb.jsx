import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Ol=styled.ol`
    --bs-breadcrumb-divider: '>';
`;

export default function BreadCrumb({ currentPage }) {

    switch (currentPage) { // fallthrough switch
        case 'All':
            return (
                <div className='container pt-4 ps-5 pb-1'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item active">Productos</li>
                    </ol>
                </div>
            )
        case 'Cosecha':
        case 'Almacenamiento':
        case 'Mixer':
        case 'Henificacion':
        case 'Silaje':
        case 'Repuestos':
        case 'Manuales':
        case 'Usados':
            return (
                <div className='container pt-4 ps-5 pb-1'>
                    <Ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/category/All">Productos</Link></li>
                        <li className="breadcrumb-item active">{currentPage}</li>
                    </Ol>
                </div>
            )
        case 'Checkout':
        case 'Orden':
        default:
            return (
                <div className='container pt-4 ps-5 pb-1'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item active">{currentPage}</li>
                    </ol>
                </div>
            )
    }
}
