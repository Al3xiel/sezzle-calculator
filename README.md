# Sezzle Calculator - Español

Aplicación de calculadora Full-Stack modular, altamente testeable y lista para producción, construida utilizando **Go (Clean Architecture)** en el backend y **React con TypeScript (Atomic Design)** en el frontend, orquestada mediante contenedores Docker.

---

## Setup Instructions (Requisitos Previos)

Para poder ejecutar e interactuar con este proyecto en tu entorno local, asegúrate de tener instaladas las siguientes herramientas:

* **[Git](https://git-scm.com/):** Para clonar el repositorio.
* **[Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/):** (Recomendado) Para levantar ambos servicios simultáneamente mediante contenedores sin configurar entornos locales.
* **[Go](https://go.dev/dl/) (v1.27 o superior):** Requerido únicamente si deseas ejecutar o probar el backend de manera local (sin Docker).
* **[Node.js](https://nodejs.org/) (v20 o superior) y npm:** Requerido únicamente si deseas ejecutar, modificar o compilar el frontend de manera local.

---

## Arquitectura del Proyecto

El sistema está desacoplado en dos servicios independientes que se comunican a través de una API RESTful, aplicando principios estrictos de separación de responsabilidades y modularidad.

### 1. Backend (Go - Clean Architecture)
Estructurado bajo Clean Architecture para aislar la lógica de negocio de los detalles de infraestructura y entrega HTTP:
```text
backend/
├── cmd/                    # Punto de entrada de la aplicación (main.go)
├── internal/
│   ├── domain/             # Entidades principales y contratos de negocio
│   ├── usecase/            # Casos de uso y lógica matemática de la calculadora
│   └── infrastructure/     # Adaptadores externos, ruteo (Gin) y entrega HTTP
├── go.mod / go.sum         # Gestión de dependencias
└── Dockerfile              # Configuración multi-stage de compilación

```

### 2. Frontend (React + TypeScript - Atomic Design)

La estructura del cliente web sigue el patrón modular basado en la arquitectura estándar **[Shpendrr/react-app-structure](https://github.com/Shpendrr/react-app-structure)**, organizando los componentes jerárquicamente:

```text
frontend/
├── src/
│   ├── assets/             # Recursos estáticos (imágenes, fuentes)
│   ├── components/         # Componentes UI (Atomic Design)
│   │   ├── atoms/          # Componentes básicos reutilizables (Button, Badge)
│   │   ├── molecules/      # Agrupaciones funcionales (CalculatorDisplay, KeypadGrid)
│   │   ├── organisms/      # Estructuras complejas (CalculatorCard)
│   │   └── templates/      # Layouts de página (MainLayout)
│   ├── lib/                # Lógica de negocio, hooks personalizados y tipos
│   │   ├── hooks/          # useCalculator (gestión de estado y edge cases)
│   │   └── types/          # Interfaces TypeScript compartidas
│   ├── pages/              # Vistas principales de la aplicación
│   ├── services/           # Conectores y peticiones HTTP a la API (api.ts)
│   ├── styles/             # Estilos globales y configuración Tailwind
│   └── App.tsx             # Componente raíz
├── Dockerfile              # Multi-stage build con Nginx para SPA
└── package.json

```

---

## Decisiones de Diseño y Asunciones UI/UX

* **Disposición de la Botonera (Windows 11):** La distribución geométrica de los botones numéricos y operadores se diseñó inspirándose en la calculadora nativa de Windows 11 para garantizar una experiencia de usuario altamente intuitiva y familiar.
* **Componente Insignia (`Badge`):** Incorporado en la parte superior para aportar escalabilidad arquitectónica. Está pensado para soportar futuras variantes de la aplicación (como calculadoras científicas, financieras o de conversión de unidades) permitiendo alternar contextos visuales de manera limpia.
* **Lógica de Porcentajes:** El cálculo de porcentajes opera de manera relativa al operando base según el estándar:

$$\text{[Número Base]} \ \% \ \text{[Porcentaje]} = \text{[Valor equivalente en unidades]}$$

* *Ejemplo:* Si el usuario ingresa `200`, presiona `%` y luego `15`, la operación equivale a calcular el $15\%$ de $200$, devolviendo **`30`** al presionar `=`.

---

## Guía de Ejecución Local

Puedes poner en marcha el proyecto mediante contenedorización completa o ejecutando los servicios de manera local en tu máquina.

### Opción A: Contenedorización con Docker Compose (Recomendado)

Asegúrate de tener Docker instalado y ejecuta en la raíz del proyecto:

```bash
docker-compose up --build

```

* **Frontend:** `http://localhost:3000`
* **Backend:** `http://localhost:8080`

### Opción B: Ejecución Local (Terminal Doble / Split Terminal)

Si deseas depurar el código fuente en tiempo real, puedes levantar cada servicio por separado usando dos terminales:

* **Terminal 1 (Backend - Go):**
```bash
cd backend
go run cmd/main.go

```

*(El servidor iniciará escuchando en `http://localhost:8080`)*
* **Terminal 2 (Frontend - React):**
```bash
cd frontend
npm install
npm run dev

```

*(Vite levantará el entorno local, normalmente en `http://localhost:5173`)*

---

## Ejemplos de Peticiones a la API (REST)

El backend expone un endpoint POST centralizado para las operaciones de cálculo:

* **Endpoint:** `POST /calculate`
* **Content-Type:** `application/json`

### 1. Operación Binaria (Ej. Porcentaje)

* **Request Body:**
```json
{
  "operation": "percentage",
  "a": 200,
  "b": 15
}

```

* **Response (200 OK):**
```json
{
  "result": 30
}

```

### 2. Operación Unaria (Ej. Raíz Cuadrada)

* **Request Body:**
```json
{
  "operation": "sqrt",
  "a": 16
}

```


* **Response (200 OK):**
```json
{
  "result": 4
}

```

---

## Pruebas Unitarias y Cobertura (Backend)

La capa de casos de uso del backend cuenta con una suite robusta de pruebas automatizadas basadas en tablas (*Table-Driven Tests*).

Para ejecutar las pruebas y medir la cobertura del código desde la carpeta `backend/`, utiliza los siguientes comandos:

1. **Ejecutar pruebas de forma recursiva con reporte resumido:**
```bash
go test -v -cover ./...

```

2. **Generar el perfil binario de cobertura:**
```bash
go test -coverprofile=coverage.out ./...

```

3. **Ver el porcentaje detallado por función en la terminal:**
```bash
go tool cover -func=coverage.out

```

4. **Visualizar el reporte interactivo en el navegador:**
```bash
go tool cover -html=coverage.out

```

---

# Sezzle Calculator - English

Modular, highly testable, and production-ready Full-Stack calculator application, built using **Go (Clean Architecture)** on the backend and **React with TypeScript (Atomic Design)** on the frontend, orchestrated via Docker containers.

---

## Setup Instructions (Prerequisites)

To be able to run and interact with this project in your local environment, make sure you have the following tools installed:

* **[Git](https://git-scm.com/):** To clone the repository.
* **[Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/):** (Recommended) To spin up both services simultaneously using containers without configuring local environments.
* **[Go](https://go.dev/dl/) (v1.27 or higher):** Required only if you want to run or test the backend locally (without Docker).
* **[Node.js](https://nodejs.org/) (v20 or higher) and npm:** Required only if you want to run, modify, or build the frontend locally.

---

## Project Architecture

The system is decoupled into two independent services that communicate via a RESTful API, applying strict principles of separation of concerns and modularity.

### 1. Backend (Go - Clean Architecture)
Structured under Clean Architecture to isolate business logic from infrastructure details and HTTP delivery:
```text
backend/
├── cmd/                    # Application entry point (main.go)
├── internal/
│   ├── domain/             # Main entities and business contracts
│   ├── usecase/            # Use cases and calculator mathematical logic
│   └── infrastructure/     # External adapters, routing (Gin), and HTTP delivery
├── go.mod / go.sum         # Dependency management
└── Dockerfile              # Multi-stage build configuration

```

### 2. Frontend (React + TypeScript - Atomic Design)



The web client structure follows the modular pattern based on the standard architecture **[Shpendrr/react-app-structure](https://github.com/Shpendrr/react-app-structure)**, organizing components hierarchically:

```text
frontend/
├── src/
│   ├── assets/             # Static resources (images, fonts)
│   ├── components/         # UI Components (Atomic Design)
│   │   ├── atoms/          # Basic reusable components (Button, Badge)
│   │   ├── molecules/      # Functional groupings (CalculatorDisplay, KeypadGrid)
│   │   ├── organisms/      # Complex structures (CalculatorCard)
│   │   └── templates/      # Page layouts (MainLayout)
│   ├── lib/                # Business logic, custom hooks, and types
│   │   ├── hooks/          # useCalculator (state management and edge cases)
│   │   └── types/          # Shared TypeScript interfaces
│   ├── pages/              # Main application views
│   ├── services/           # Connectors and HTTP requests to the API (api.ts)
│   ├── styles/             # Global styles and Tailwind configuration
│   └── App.tsx             # Root component
├── Dockerfile              # Multi-stage build with Nginx for SPA
└── package.json

```

---

## Design Decisions and UI/UX Assumptions



* **Keypad Layout (Windows 11):** The geometric distribution of the numeric and operator buttons was designed drawing inspiration from the native Windows 11 calculator to ensure a highly intuitive and familiar user experience.


* **Badge Component (`Badge`):** Incorporated at the top to provide architectural scalability. It is designed to support future variants of the application (such as scientific, financial, or unit conversion calculators) by allowing visual contexts to be switched cleanly.


* **Percentage Logic:** The percentage calculation operates relative to the base operand according to the standard:



$$\text{[Base Number]} \ \% \ \text{[Percentage]} = \text{[Equivalent value in units]}$$

* *Example:* If the user enters `200`, presses `%` and then `15`, the operation is equivalent to calculating $15\%$ of $200$, returning **`30`** when `=` is pressed.



---

## Local Execution Guide



You can launch the project using full containerization or by running the services locally on your machine.

### Option A: Containerization with Docker Compose (Recommended)



Make sure you have Docker installed and run in the project root:

```bash
docker-compose up --build

```

* **Frontend:** `http://localhost:3000`

* **Backend:** `http://localhost:8080`


### Option B: Local Execution (Double Terminal / Split Terminal)



If you want to debug the source code in real-time, you can spin up each service separately using two terminals:

* **Terminal 1 (Backend - Go):**


```bash
cd backend
go run cmd/main.go

```

*(The server will start listening on `http://localhost:8080`)*

* **Terminal 2 (Frontend - React):**


```bash
cd frontend
npm install
npm run dev

```

*(Vite will spin up the local environment, normally at `http://localhost:5173`)*

---

## API Request Examples (REST)



The backend exposes a centralized POST endpoint for calculation operations:

* **Endpoint:** `POST /calculate`

* **Content-Type:** `application/json`


### 1. Binary Operation (e.g., Percentage)



* **Request Body:**


```json
{
  "operation": "percentage",
  "a": 200,
  "b": 15
}

```

* **Response (200 OK):**


```json
{
  "result": 30
}

```

### 2. Unary Operation (e.g., Square Root)



* **Request Body:**


```json
{
  "operation": "sqrt",
  "a": 16
}

```

* **Response (200 OK):**


```json
{
  "result": 4
}

```

---

## Unit Tests and Coverage (Backend)



The backend's use cases layer features a robust suite of automated tests based on tables (*Table-Driven Tests*).

To run the tests and measure code coverage from the `backend/` folder, use the following commands:

1. **Run tests recursively with a summary report:**


```bash
go test -v -cover ./...

```

2. **Generate the binary coverage profile:**


```bash
go test -coverprofile=coverage.out ./...

```

3. **View the detailed percentage by function in the terminal:**


```bash
go tool cover -func=coverage.out

```

4. **Visualize the interactive report in the browser:**


```bash
go tool cover -html=coverage.out

```