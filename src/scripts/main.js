import { Banner } from "../pages/Banner/Banner.js";
import { Login } from "../pages/Login/Login.js";
import { Register } from "../pages/Register/Register.js";
import { TopMenu } from "../pages/TopMenu/TopMenu.js";

function init () {
  const body = document.querySelector("body");
  // Banner
  body.appendChild(Banner.create());
  // Menu
  body.appendChild(TopMenu.create());
  // // Login
  body.appendChild(Login.create());
  // // Registro
  body.appendChild(Register.create());
  // // Perfil
  // // Logout
  // Schedule
  // // Título
  // // Carrossel de cartões
  // Destination
  // // Título
  // // Carrossel de cartões
  // Hosters
  // // Título
  // // Carrossel de cartões
  // Tours
  // // Título
  // // Carrossel de cartões
  // Quizz
  // // Título
  // // Carrossel de cartões
  // Form
  // // Apresentação das perguntas
  // // Validação das respostas
  // Budget
  // // Apresentação do orçamento
  // // Mostrar e Esconder
  // // Detalhamento do orçamento
}

init ();