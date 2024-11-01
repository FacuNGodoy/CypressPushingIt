export class LoginPage {

    abrirPagina() {
        cy.visit('');
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

    login(user, password) {
        this.escribirUsuario().type(user);
        this.escribirContraseña().type(password);
        cy.intercept('POST', 'https://pushing-it-3.onrender.com/api/login').as('loginRequest');
        this.botonLogin().click();
        cy.wait('@loginRequest').then((interception) => {
            const { token, user } = interception.response.body;
            Cypress.env('token', token);
            Cypress.env('userId', user._id);
            cy.log(`Token: ${Cypress.env('token')}`);
            cy.log(`User ID: ${Cypress.env('userId')}`);
        });
    }
}