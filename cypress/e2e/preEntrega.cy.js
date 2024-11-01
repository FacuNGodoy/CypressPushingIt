/// <reference types= "cypress" /> 
import { LoginPage } from "../pageObjects/loginPage";
import { HomePage } from "../pageObjects/homePage";
import { ProductsPage } from "../pageObjects/onlineShop/productsPage";
import { CheckOutPage } from "../pageObjects/onlineShop/checkOutPage";
import { ReciptPage } from "../pageObjects/onlineShop/reciptPage";
import { ShoppingCartPage } from "../pageObjects/onlineShop/shoppingCartPage";

describe('Pre-Entrega Cypress', () => {
    let data;
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const productPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkOutPage = new CheckOutPage();
    const reciptPage = new ReciptPage();

    before('Cargo DB', () => {
        cy.fixture(`dataBase`).then(datosFixture => {
            data = datosFixture;
        })
    })

    beforeEach('Abre el ambiente', () => {
        loginPage.abrirPagina();
        loginPage.iniciarSesion().dblclick();
        loginPage.login(Cypress.env().user, Cypress.env().password);
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
        shoppingCartPage.botonGoToBillingSummary().click();
        shoppingCartPage.botonGoToCheckout().click();

        checkOutPage.formularioCheckOut("Facundo", "Godoy", "0123456789101112");
        checkOutPage.botonConfirmarFormulario().click();

        reciptPage.validarComprador("Facundo", "Godoy");
        reciptPage.validarItems(data.productos[0].cantidad, data.productos[0].name);
        reciptPage.validarItems(data.productos[1].cantidad, data.productos[1].name);
        reciptPage.validarTarjeta("0123456789101112");
        reciptPage.validarPrecioTotal(data.productos[0].cantidad, data.productos[0].precioUnitario, data.productos[1].cantidad, data.productos[1].precioUnitario)
    });
})