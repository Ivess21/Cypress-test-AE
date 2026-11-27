/// <reference types="cypress" />

describe("Automation Exercise - Smoke test UI", () => {
  const urlInicio = () => `${Cypress.config("baseUrl")}/`;

  beforeEach(() => {
    cy.visit("/");
  });

  it("Validar página de inicio", () => {
    cy.url().should("eq", urlInicio());
    cy.get("#slider").should("be.visible");
    cy.get('img[alt="Website for automation practice"]').should("be.visible");
  });

  it("Verificar carrusel y botones principales", () => {
    const slideActivo = "#slider-carousel .carousel-inner > .active";

    cy.get(slideActivo)
      .invoke("index")
      .then((indiceInicial) => {
        cy.get("#slider-carousel > .right").click();
        cy.get(slideActivo).should(($slide) => {
          expect($slide.index()).not.to.eq(indiceInicial);
        });
      });

    cy.get(`${slideActivo} .test_cases_list .btn`)
      .should("be.visible")
      .and("contain", "Test Cases");
    cy.get(`${slideActivo} .apis_list .btn`)
      .should("be.visible")
      .and("contain", "APIs list for practice");
  });

  it("Validar formulario de contacto", () => {
    const confirmar = cy.stub().returns(true).as("confirmar");
    cy.on("window:confirm", confirmar);

    cy.contains(".shop-menu a", "Contact us").click();
    cy.get(".col-sm-12 > .title").should("be.visible");
    cy.get('[data-qa="name"]').type("Usuario de prueba");
    cy.get('[data-qa="email"]').type("usuario@example.com");
    cy.get('[data-qa="subject"]').type("Asunto de prueba");
    cy.get('[data-qa="message"]').type("Hola, esto es un mensaje de prueba");
    cy.get('[name="upload_file"]').selectFile("cypress/fixtures/pruebaa.txt");
    cy.get('[data-qa="submit-button"]').click();

    cy.get("@confirmar").should(
      "have.been.calledOnceWith",
      "Press OK to proceed!"
    );
    cy.get(".status.alert.alert-success")
      .should("be.visible")
      .and("have.text", "Success! Your details have been submitted successfully.");
    cy.get("#form-section > .btn").click();
    cy.url().should("eq", urlInicio());
  });

  it("Validar productos en el carrito", () => {
    const agregarProducto = (nombre) => {
      cy.contains(".product-image-wrapper", nombre)
        .find(".productinfo .btn")
        .click();
      cy.get(".modal-content").should("be.visible");
    };

    const validarFila = (nombre, precio) => {
      cy.contains("#cart_info_table tbody tr", nombre).within(() => {
        const validarTexto = (selector, esperado) => {
          cy.get(selector).should(($el) => {
            expect($el.text().trim()).to.eq(esperado);
          });
        };

        validarTexto(".cart_price", precio);
        validarTexto(".cart_quantity", "1");
        validarTexto(".cart_total", precio);
      });
    };

    cy.get('.shop-menu a[href="/view_cart"]').should("be.visible").click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/view_cart`);
    cy.get("#empty_cart a").click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/products`);

    agregarProducto("Blue Top");
    cy.get(".modal-footer > .btn").click();
    agregarProducto("Men Tshirt");
    cy.get('.modal-body a[href="/view_cart"]').click();

    cy.get("#cart_info_table tbody tr").should("have.length", 2);
    validarFila("Blue Top", "Rs. 500");
    validarFila("Men Tshirt", "Rs. 400");
  });
});