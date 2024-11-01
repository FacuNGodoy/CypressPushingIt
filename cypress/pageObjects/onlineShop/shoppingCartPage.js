export class ShoppingCartPage {

    valorNombreProducto() {
        return cy.get('p[data-cy=productName]');
    }

    valorTotalProducto(precioProducto, cantidadProducto) {
        cy.get(`p#totalPrice`).should('contain', `$${cantidadProducto * precioProducto}`);
    }

    valorTotalCarrito() {
        let sum = 0;

        cy.get('p#totalPrice').each(($el) => {
            const text = $el.text().trim();
            if (text.includes('$')) {
                const price = parseFloat(text.replace('$', '').trim()); 
                sum += price; 
            }
        }).then(() => {
            cy.get('p#price').invoke('text').then(totalText => {
                const totalCarrito = parseFloat(totalText.replace('Total $', '').trim())
                expect(sum).to.equal(totalCarrito);
            });
        });
    }

    botonVerPrecioTotal() {
        return cy.get(`button`).contains(`Show total price`);
    }

    verificacionProducto(nombreProducto, precioProducto, cantidadProducto) {
        this.valorNombreProducto(nombreProducto).should('contain', nombreProducto);
        this.valorNombreProducto(nombreProducto).siblings(`p`).should('contain', precioProducto);
        this.valorNombreProducto(nombreProducto).siblings(`p`).should('contain', cantidadProducto);
        this.valorTotalProducto(precioProducto, cantidadProducto);
    }

    botonGoToBillingSummary() {
        return cy.get(`button[data-cy="goBillingSummary"]`);
    }

    botonGoToCheckout() {
        return cy.get(`button[data-cy="goCheckout"]`);
    }

}