import { Entry } from "../../components/Base/Entry/Entry.js";
import { ToolsHTML } from "../../scripts/tools/ToolsHTML.js"

export const Register = {
  create: () => {}
}

Register.create = () => {
  const container = ToolsHTML.createElementWithClass("div", "login");

  const closeButton = ToolsHTML.createElementWithClass("button", "close");
  closeButton.textContent = "X";
  container.appendChild(closeButton);

  const title = ToolsHTML.createElementWithClass("h3");
  title.textContent = "Registrar";
  container.appendChild(title);

  const user = new Entry({
    placeholder: "Usuário",
    mandatory: false,
    types: "text",
  })
  container.appendChild(user.create());

  const email = new Entry({
    placeholder: "Email",
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

  const confirmPassword = new Entry({
    placeholder: "Confirme a Senha",
    mandatory: true,
    types: ["password", "text"],
  })
  container.appendChild(confirmPassword.create());

  const buttonArea = ToolsHTML.createElementWithClass("div", "button_area");
  container.appendChild(buttonArea);

  const registerButton = ToolsHTML.createElementWithClass("button", "confirm");
  registerButton.textContent = "Registrar";
  buttonArea.appendChild(registerButton);

  const enterButton = ToolsHTML.createElementWithClass("button");
  enterButton.textContent = "Entrar";
  buttonArea.appendChild(enterButton);

  return container;
}