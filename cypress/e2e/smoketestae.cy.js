/// <reference types="cypress" />
describe("Test suite - Conjunto de pruebas", () => {
    beforeEach(() => {
    cy.visit("https://www.automationexercise.com/")
})
    it("Validar pagina de inicio", () =>{
        cy.url().should("eq","https://www.automationexercise.com/")
        cy.get("#slider").should("be.visible")
        cy.get('img[alt="Website for automation practice"]').should('be.visible')
        
    })

    it("Verificar carrusel y botones principales:", () => {
        cy.get('#slider-carousel > .carousel-inner > .active > :nth-child(1)').should("be.visible")
        cy.get("#slider-carousel > .right > .fa").click()
        cy.get(".active > :nth-child(2) > .girl").should("be.visible")
        cy.get("#slider-carousel > .right > .fa").click()
        cy.get(".active > :nth-child(2) > .girl").should("be.visible")
        cy.get('.active > :nth-child(1) > .test_cases_list > .btn').contains("Test Cases")
        cy.get(".active > :nth-child(1) > .apis_list > .btn").contains("APIs list for practice")
    })

    it("Validacion de formulario de contacto", () =>{
        cy.get(".shop-menu > .nav > :nth-child(8) > a").click()
        cy.get(".col-sm-12 > .title").should("be.visible")
        cy.get('[data-qa="name"]').type("Usuario de prueba")
        cy.get('[data-qa="email"]').type("emaildeprueba@gmail.com")
        cy.get('[data-qa="subject"]').type("Asunto de prueba")
        cy.get('[data-qa="message"]').type("Hola, esto es un mensaje de prueba")
        cy.get('[name="upload_file"]').selectFile('cypress/fixtures/pruebaa.txt')
        cy.on("window:confirm", (textoAlerta) => {
            expect(textoAlerta).to.equal("Press OK to proceed!")
            return true
        })
        cy.get('[data-qa="submit-button"]').click()
        cy.get(".status.alert.alert-success").should("be.visible").and("have.text", "Success! Your details have been submitted successfully.")
        cy.get("#form-section > .btn").click()
        cy.url().should("eq", "https://www.automationexercise.com/")
    })

    it("Validacion de funcionamiento adecuado de carrito de compras:", () =>{
        cy.get(".shop-menu > .nav > :nth-child(3) > a").should("be.visible")
        cy.get(".shop-menu > .nav > :nth-child(3) > a").click()
        cy.url().should("eq","https://www.automationexercise.com/view_cart")
        cy.get("#empty_cart > .text-center > a > u").click()
        cy.url().should("eq","https://www.automationexercise.com/products")
        cy.get(":nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn").click()
        cy.get(".modal-content").should("be.visible")
        cy.get(".modal-footer > .btn").click()
        cy.get(":nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn").click()
        cy.get(".modal-content").should("be.visible")
        cy.get('.modal-body a[href="/view_cart"]').click()
        cy.get("#cart_info_table tbody tr").should("have.length", 2)
        cy.get("#cart_info_table tbody tr").first().within(() => {
        cy.get(".cart_description").should("contain", "Blue Top")
        cy.get(".cart_price").should("contain", "Rs. 500")
        cy.get(".cart_quantity").should("contain", "1")
        cy.get(".cart_total").should("contain", "Rs. 500")
})
        cy.get("#cart_info_table tbody tr").last().within(() => {
        cy.get(".cart_description").should("contain", "Men Tshirt")
        cy.get(".cart_price").should("contain", "Rs. 400")
        cy.get(".cart_quantity").should("contain", "1")
        cy.get(".cart_total").should("contain", "Rs. 400")
})
})
})
