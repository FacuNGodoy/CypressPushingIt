export class LoginPage {

  loginAPI(user, pass) {
    cy.request({
      method: "POST",
      url: "https://pushing-it-3.onrender.com/api/login",
      body: {
        username: user,
        password: pass,
      },
    }).then((response) => {
      const { token } = response.body;
      window.localStorage.setItem("token", token);
    });
  }

  abrirPagina() {
    cy.visit("");
  }

  iniciarSesion() {
    return cy.xpath(`//span[contains(text(),'Iniciá sesión')]`);
  }

  escribirUsuario() {
    return cy.xpath(`//input[@name="user"]`);
  }

  escribirContraseña() {
    return cy.xpath(`//input[@name="pass"]`);
  }

  botonLogin() {
    return cy.xpath(`//button[contains(text(),"Log in")]`);
  }

}
