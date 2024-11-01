export class ReciptPage {
    
    validarComprador(nombre, apellido) {
        cy.get(`p#name`).should('contain.text', `${nombre} ${apellido}`)
    }

    validarItems(cantidad, producto) {
        cy.get(`p[id="name"]`).siblings(`p`).should('contain.text', `${cantidad} x ${producto}`)
    }

    validarTarjeta(tarjeta) {
        cy.get(`span#creditCard`).should(`have.text`, tarjeta);
    }

    validarPrecioTotal(cantidad1, precio1, cantidad2, precio2) {
        const precioTotal = (cantidad1 * precio1) + (cantidad2 * precio2);
        cy.get(`p#totalPrice`).should(`contain.text`, precioTotal)
    }

}