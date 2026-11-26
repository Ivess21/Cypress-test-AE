# QA Automation Suite — Automation Exercise (UI & API)

Suite de automatización de pruebas funcionales **End-to-End (E2E)** y validación de contratos de **API REST** desarrollada sobre la plataforma [Automation Exercise](https://automationexercise.com/). El proyecto integra pruebas de interfaz gráfica en distintos navegadores con pruebas automatizadas de backend ejecutables por línea de comandos.

## Estructura del proyecto

```text
Cypress-test-AE/
├── cypress/
│   ├── e2e/
│   │   └── smoketestae.cy.js               # Suite E2E principal (UI)
│   ├── fixtures/
│   │   ├── example.json                    # Datos de prueba estáticos
│   │   └── pruebaa.txt                     # Archivo adjunto para carga en formulario
│   └── support/
│       ├── commands.js                     # Comandos personalizados
│       └── e2e.js                          # Configuración global de soporte
├── postman/
│   └── ae-api.postman_collection.json      # Colección exportada (v2.1) con 5 requests y 11 aserciones
├── cypress.config.js                       # Configuración de Cypress (incluye política de retries)
├── package.json                            # Dependencias y scripts personalizados de ejecución
└── README.md
```

## Cobertura de pruebas

### 1. Pruebas de Interfaz Web (Cypress E2E)

Archivo: `cypress/e2e/smoketestae.cy.js`

| Caso de prueba | Flujo evaluado | Validaciones clave | 
| ----- | ----- | ----- | 
| **Página de inicio** | Disponibilidad y renderizado inicial del portal | Visibilidad de elementos base y estructura del home | 
| **Carrusel y navegación** | Interacción con sliders y controles visuales | Visibilidad de banners activos y botones de acción | 
| **Formulario de contacto** | Envío completo de consulta con archivo adjunto | Carga desde `fixtures` (`pruebaa.txt`), manejo de alerta `window:confirm` y mensaje de éxito | 
| **Carrito de compras** | Selección múltiple y cálculo de ítems | Agregado de productos, validación dinámica en tabla y verificación de totales | 

### 2. Pruebas de API REST (Postman / Newman)

Colección: `postman/ae-api.postman_collection.json` (**5 peticiones — 11 aserciones**)

| Endpoint | Método | Escenario | `responseCode` esperado | Validaciones implementadas | 
| ----- | ----- | ----- | ----- | ----- | 
| `/api/productsList` | `GET` | Consulta exitosa del catálogo | `200` | Estado HTTP `200`, tiempo de respuesta `< 3500 ms` y arreglo `products` no vacío | 
| `/api/searchProduct` | `POST` | Búsqueda filtrada (`search_product=top`) | `200` | Código interno `200`, listado no vacío y coincidencia del término en nombre o categoría | 
| `/api/searchProduct` | `POST` | Prueba negativa sin parámetro obligatorio | `400` | Manejo de error `400` y validación del mensaje de parámetro faltante | 
| `/api/verifyLogin` | `POST` | Prueba negativa con usuario inexistente | `404` | Rechazo de credenciales inválidas con código `404` y mensaje `"User not found!"` | 
| `/api/productsList` | `POST` | Prueba de seguridad por método no soportado | `405` | Bloqueo de método `POST` en endpoint de solo lectura (`"This request method is not supported."`) | 

## Decisiones técnicas destacadas

* **Resiliencia ante inestabilidad del servidor (`retries`):** En `cypress.config.js` se configuró `retries: { runMode: 2, openMode: 0 }` para absorber errores intermitentes `503 Service Unavailable` propios del entorno público de pruebas sin generar falsos negativos.

* **Inspección de códigos internos de la API:** Dado que los endpoints de *Automation Exercise* responden con HTTP `200` a nivel de transporte incluso en escenarios de error, las aserciones en Postman inspeccionan explícitamente la propiedad `responseCode` dentro del cuerpo JSON.

* **Validación cruzada en búsquedas:** La aserción de `/api/searchProduct` evalúa coincidencias tanto en el nombre del artículo (`producto.name`) como en su categoría (`producto.category.category`) para reflejar el comportamiento real del motor de búsqueda.

## Instalación y ejecución

### Requisitos previos

* [Node.js](https://nodejs.org/) (v18 o superior)

* Navegador **Google Chrome** y/o **Brave** instalados localmente

### Pasos de configuración

1. Clonar el repositorio e ingresar al directorio:

   ```bash
   git clone https://github.com/Ivess21/Cypress-test-AE.git
   cd Cypress-test-AE
   ```

2. Instalar las dependencias del proyecto (Cypress y Newman):

   ```bash
   npm install
   ```

### Comandos disponibles

* **Ejecutar pruebas E2E en Chrome (modo headless):**

  ```bash
  npm run pruebas-chrome
  ```

* **Ejecutar pruebas E2E en Brave:**

  ```bash
  npm run pruebas-brave
  ```

* **Ejecutar suite completa de API con Newman:**

  ```bash
  npm run pruebas-api
  ```

## Evidencias de ejecución

### Suite de API — Newman (5 requests / 11 assertions aprobadas)

### Suite E2E — Cypress

## Autor

**Ives Acosta**

QA Tester Jr. | Testing Manual y Funcional | Seguridad del Software | Estudiante de Ingeniería en Sistemas (UTN FRC)

[GitHub](https://github.com/Ivess21)