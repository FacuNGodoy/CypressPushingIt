export class CheckOutPage {
    
    formularioCheckOut(nombre, apellido, tarjeta) {
        cy.get(`input#FirstName`).type(nombre);
        cy.get(`input#lastName`).type(apellido);
        cy.get(`input#cardNumber`).type(tarjeta)
    }

    botonConfirmarFormulario() {
        return cy.get(`button[data-cy="purchase"]`)
    }
}