/// <reference types= "cypress" /> 
import { LoginPage } from "../pageObjects/loginPage";
import { HomePage } from "../pageObjects/homePage";
import { ProductsPage } from "../pageObjects/onlineShop/productsPage";
import { ShoppingCartPage } from "../pageObjects/onlineShop/shoppingCartPage";

describe('Pre-Entrega Cypress', () => {
    let data;
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const productPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();

    before('Cargo DB', () => {
        cy.fixture(`dataBase`).then(datosFixture => {
            data = datosFixture;
        })
    })

    beforeEach('Abre el ambiente', () => {
        loginPage.abrirPagina();
        loginPage.iniciarSesion().dblclick();
        loginPage.escribirUsuario().type(Cypress.env().user);
        loginPage.escribirContraseña().type(Cypress.env().password);
        loginPage.botonLogin().click();
    })

    it('Desafio', () => {
        homePage.botonOnlineShop().click();

        productPage.botonAgregarAlCarrito(data.productos[0].name).click();
        productPage.botonCerrarModal().click();
        productPage.botonAgregarAlCarrito(data.productos[0].name).click();
        productPage.botonCerrarModal().click();
        productPage.botonAgregarAlCarrito(data.productos[1].name).click();
        productPage.botonCerrarModal().click();

        productPage.botonIrAlCarrito().click();

        shoppingCartPage.verificacionProducto(data.productos[0].name, data.productos[0].precioUnitario, data.productos[0].cantidad);
        shoppingCartPage.verificacionProducto(data.productos[1].name, data.productos[1].precioUnitario, data.productos[1].cantidad);
        
        shoppingCartPage.botonVerPrecioTotal().click();
        shoppingCartPage.valorTotalCarrito();
    });
})