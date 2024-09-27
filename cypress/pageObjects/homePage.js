export class HomePage {
    
    botonOnlineShop() {
        return cy.get(`a`, {timeout: 60000}).contains(`Online Shop`);
    }

}