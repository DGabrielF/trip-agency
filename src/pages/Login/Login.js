import { Entry } from "../../components/Base/Entry/Entry.js";
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js"

export const Login = {
  create: () => {}
}

Login.create = () => {
  const container = ToolsHTML.createElementWithClass("div", "login");

  const closeButton = ToolsHTML.createElementWithClass("button", "close");
  closeButton.textContent = "X";
  container.appendChild(closeButton);

  const title = ToolsHTML.createElementWithClass("h3");
  title.textContent = "Entrar";
  container.appendChild(title);

  const user = new Entry({
    placeholder: "Usuário",
    mandatory: true,
    types: "text",
  })

  container.appendChild(user.create());

  const password = new Entry({
    placeholder: "Senha",
    mandatory: true,
    types: ["password", "text"],
  })

  container.appendChild(password.create());

  const buttonArea = ToolsHTML.createElementWithClass("div", "button_area");
  container.appendChild(buttonArea);

  const enterButton = ToolsHTML.createElementWithClass("button", "confirm");
  enterButton.textContent = "Entrar";
  buttonArea.appendChild(enterButton);

  const registerButton = ToolsHTML.createElementWithClass("button", "confirm");
  registerButton.textContent = "Registrar";
  buttonArea.appendChild(registerButton);

  return container;
}