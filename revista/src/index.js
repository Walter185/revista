import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styled from "styled-components";

const Whatsapp=styled.a`
    position: fixed;
    width: 60px;
    height: 63px;
    line-height: 60px;
    bottom: 50px;
    right: 50px;
    background: #25d366;
    color: #FFF;
    border-radius: 50px;
    text-align: center !important;
    font-size: 35px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
    z-index: 100;
    transition: all 300ms ease;
  &&:hover {
    background: #FFF;
    color: #25D366;
  }

`;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
          <App />
          <Whatsapp href="https://api.whatsapp.com/send?phone=59899743194" className="btn-wsp" target="_blank">
              <i className="fa fa-whatsapp icono"></i>
          </Whatsapp>
  </React.StrictMode>
);

