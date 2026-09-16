
---
# Español
---

# Registro de Prompts y Asistencia de Inteligencia Artificial

Este documento detalla los prompts, directrices y estrategias de consulta empleadas durante el desarrollo del proyecto **Sezzle Calculator**, delimitando el criterio técnico del desarrollador y la asistencia de la IA en la revisión de lógica, pruebas y control de errores.

---

## 1. Directrices Generales y Criterio de Arquitectura

> **Nota aclaratoria:**
> Todas las estructuras base y patrones arquitectónicos empleados en el backend (**Clean Architecture**) y en el frontend (**Atomic Design**) fueron definidos por **elección personal del desarrollador**, no por sugerencia de la IA.
> La inteligencia artificial se empleó como soporte para:
> 1. Revisar y adaptar la lógica a las estructuras provistas por el desarrollador.
> 2. Generar la suite de pruebas unitarias para la capa de casos de uso.
> 3. Detectar y corregir inconsistencias en la elaboración de la infraestructura Docker.
> 4. Subsanar fallos de lógica de interacción en el cliente (como el spam de operadores).

---

## 2. Categorías de Prompts y Aplicación

### A. Estructura Atomic Design y Revisión de Lógica (Frontend)

La definición de carpetas y la jerarquía de componentes (Atomic Design) correspondió a una decisión de diseño propia del desarrollador. Se suministró esta estructura a la IA con el propósito de validar que el frontend cumpla estrictamente con este patrón modular y para la elaboración del estilo visual de la interfaz (UI).

* **Prompt empleado:**
> *"Siguiendo la siguiente estructura [árbol de carpetas basado en Atomic Design]: validar el cumplimiento de esta estructura en la parte frontend de la calculadora y elaborar los estilos UI"*


* **Aporte y corrección de la IA:**
* Validación de que la distribución de las responsabilidades funcionales cumpla correctamente con la jerarquía de átomos, moléculas, organismos, plantillas y páginas dictada por Atomic Design.
* Elaboración y refinamiento del diseño visual de la interfaz de usuario (UI), asegurando que los estilos y componentes gráficos se mantengan limpios y desacoplados de la lógica de estado y llamadas a la API (gestionadas en el hook `useCalculator`).

---

### B. Pruebas Unitarias para Casos de Uso (Backend Go)

Tomando como base la implementación de **Clean Architecture** estructurada en el backend, se solicitó la creación de pruebas automatizadas específicamente para aislar y validar la lógica contenida en la capa de casos de uso (`usecase`).

* **Prompt empleado:**
> *"En base a la estructura backend apliquemos sobre `calculator_usecase.go`: Unit tests and coverage report"*

* **Aporte de la IA:**
* Diseño de pruebas unitarias bajo el estándar *Table-Driven Tests* de Go en `internal/usecase/calculator_usecase_test.go`.
* Cobertura de escenarios válidos (suma, resta, producto, cociente, potencias, porcentajes y raíces) y escenarios de validación/error (división por cero, raíces de números negativos y operaciones no soportadas).
* Instrucciones para la medición y reporte visual de cobertura mediante las herramientas nativas `go test -cover ./...` y `go test -coverprofile=coverage.out ./...`.

---

### C. Detección de Errores en la Contenedorización (Docker y Docker Compose)

El desarrollador construyó la propuesta integral de contenerización (`Dockerfile` para backend, `Dockerfile` para frontend y `docker-compose.yml`), suministrándola a la IA para una auditoría técnica orientada a detectar errores en su elaboración.

* **Prompt empleado:**
> *"Al momento tengo el siguiente dockerfile para el backend ¿debo cambiar algo al realizar la nueva implementación? [código de Dockerfiles y docker-compose.yml]"*


* **Detección y correcciones identificadas por la IA:**
* **Ruta de compilación en Go:** Corrección del comando `go build` en el backend, pasando de `./cmdn/` a `./cmd`, que es donde realmente residía el punto de entrada `main.go`.
* **Enrutamiento Nginx en SPA:** Incorporación de la directiva `try_files` en la configuración de Nginx del contenedor de frontend para prevenir códigos de estado 404.

---

### D. Corrección de Lógica: Prevención de Spam de Operadores

Durante la interacción con la botonera de la calculadora, se detectaron fallas de estado al pulsar operadores de manera sucesiva o en secuencias rápidas.

* **Prompt empleado:**
> *"Hay un nuevo error en el frontend cuando se spamea operadores, comienza a dar error. Al Presionar múltiples operadores consecutivamente disparaba peticiones concurrentes a la API, enviaba valores no numéricos (`NaN`) al servidor y desincronizaba los operandos almacenados en memoria. ¿qué maneras hay de solucionarlo?"*

* **Solución y corrección de la IA:**
* **Reemplazo dinámico de operador:** Si el usuario presiona un nuevo operador mientras espera el segundo número, el sistema actualiza la operación pendiente sin efectuar cálculos innecesarios ni despachar peticiones HTTP.
* **Sanitización de valores:** Validación estricta de cadenas numéricas para asegurar que no se envíen operandos incompletos al backend.

## 3. Conclusión y Buenas Prácticas Aplicadas

El uso de la inteligencia artificial en este proyecto operó como un **asistente de implementación y depuración**, subordinado estrictamente a las directrices de diseño y arquitectura seleccionadas por el desarrollador. Esto garantizó:

* Código mantenible con responsabilidades desacopladas.
* Alta cobertura de pruebas sin lógica acoplada a infraestructura.
* Tiempos de despliegue reducidos mediante contenedores ligeros multi-stage.


---
# English
---

# Prompts Registry and Artificial Intelligence Assistance

This document details the prompts, guidelines, and query strategies employed during the development of the **Sezzle Calculator** project, defining the developer's technical criteria and the AI's assistance in logic review, testing, and error control.

---

## 1. General Guidelines and Architecture Criteria

> **Clarifying Note:**
> All base structures and architectural patterns used in the backend (**Clean Architecture**) and in the frontend (**Atomic Design**) were defined by the **developer's personal choice**, not by AI suggestion.
> The artificial intelligence was employed as support to:
> 1. Review and adapt the logic to the structures provided by the developer.
> 2. Generate the unit test suite for the use cases layer.
> 3. Detect and correct inconsistencies in the elaboration of the Docker infrastructure.
> 4. Resolve client-side interaction logic failures (such as operator spam).

---

## 2. Categories of Prompts and Application

### A. Atomic Design Structure and Logic Review (Frontend)

The definition of folders and the hierarchy of components (Atomic Design) corresponded to the developer's own design decision. This structure was provided to the AI with the purpose of validating that the frontend strictly complies with this modular pattern and for the elaboration of the visual style of the interface (UI).

* **Prompt used:**
> *"Following the following structure [folder tree based on Atomic Design]: validate compliance with this structure in the frontend part of the calculator and elaborate the UI styles"*

* **AI contribution and correction:**
* Validation that the distribution of functional responsibilities correctly complies with the hierarchy of atoms, molecules, organisms, templates, and pages dictated by Atomic Design.
* Elaboration and refinement of the visual design of the user interface (UI), ensuring that styles and graphical components remain clean and decoupled from state logic and API calls (managed in the `useCalculator` hook).

---

### B. Unit Tests for Use Cases (Go Backend)

Taking as a basis the implementation of **Clean Architecture** structured in the backend, the creation of automated tests was requested specifically to isolate and validate the logic contained in the use cases layer (`usecase`).

* **Prompt used:**
> *"Based on the backend structure let's apply on `calculator_usecase.go`: Unit tests and coverage report"*

* **AI contribution:**
* Design of unit tests under Go's *Table-Driven Tests* standard in `internal/usecase/calculator_usecase_test.go`.
* Coverage of valid scenarios (addition, subtraction, product, quotient, powers, percentages, and roots) and validation/error scenarios (division by zero, roots of negative numbers, and unsupported operations).
* Instructions for measuring and visually reporting coverage using the native tools `go test -cover ./...` and `go test -coverprofile=coverage.out ./...`.

---

### C. Error Detection in Containerization (Docker and Docker Compose)

The developer built the comprehensive containerization proposal (`Dockerfile` for backend, `Dockerfile` for frontend, and `docker-compose.yml`), providing it to the AI for a technical audit aimed at detecting errors in its preparation.

* **Prompt used:**
> *"Right now I have the following dockerfile for the backend, should I change anything when implementing the new setup? [Dockerfiles and docker-compose.yml code]"*

* **Detection and corrections identified by the AI:**
* **Go build path:** Correction of the `go build` command in the backend, changing from `./cmdn/` to `./cmd`, which is where the `main.go` entry point actually resided.
* **Nginx routing in SPA:** Incorporation of the `try_files` directive in the Nginx configuration of the frontend container to prevent 404 status codes.

---

### D. Logic Correction: Prevention of Operator Spam

During interaction with the calculator keypad, state faults were detected when pressing operators successively or in rapid sequences.

* **Prompt used:**
> *"There is a new error in the frontend when spamming operators, it starts throwing errors. Pressing multiple operators consecutively triggered concurrent API requests, sent non-numeric values (`NaN`) to the server, and desynchronized operands stored in memory. What are some ways to fix it?"*

* **AI solution and correction:**
* **Dynamic operator replacement:** If the user presses a new operator while waiting for the second number, the system updates the pending operation without performing unnecessary calculations or dispatching HTTP requests.
* **Value sanitization:** Strict validation of numeric strings to ensure that incomplete operands are not sent to the backend.

## 3. Conclusion and Applied Best Practices

The use of artificial intelligence in this project operated as an **implementation and debugging assistant**, strictly subordinated to the design and architecture guidelines selected by the developer. This guaranteed:

* Maintainable code with decoupled responsibilities.
* High test coverage without logic coupled to infrastructure.
* Reduced deployment times through lightweight multi-stage containers.