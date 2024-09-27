export class ProductsPage {
    
    botonAgregarAlCarrito(producto) {
        return cy.get(`button[name= '${producto}']`);
    }

    botonCerrarModal() {
        return cy.get(`#closeModal`);
    }

    botonIrAlCarrito() {
        return cy.get(`#goShoppingCart`);
    }

}