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
}