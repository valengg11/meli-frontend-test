# MercadoLibre Frontend Challenge

Este proyecto es una implementación del Test frontend de MercadoLibre, creando una aplicación web de búsqueda de productos. La aplicación consta de tres componentes principales:

1. SearchBox: Permite a los usuarios buscar productos ingresando términos de búsqueda.
2. SearchResults: Muestra una lista de productos que coinciden con la búsqueda del usuario. Cada resultado incluye una imagen del producto, precio, título y condición, con un indicador especial para envío gratuito.
3. ProductDetails: Proporciona información detallada sobre un producto específico. Cada resultado incluye una imagen del producto, descripción, precio, título y condición.

Características clave:

- Búsqueda en tiempo real
- Visualización de resultados con imágenes, precios y condición del producto
- Navegación fluida entre la lista de resultados y los detalles del producto
- Diseño responsivo para una experiencia óptima en dispositivos móviles y de escritorio
- Integración con la API de MercadoLibre para obtener datos de productos en tiempo real
- Servidor Express para manejar las solicitudes a la API y formatear los datos

## Tecnologías Utilizadas

- React
- Vite (como bundler y herramienta de desarrollo)
- SCSS (para estilos)
- React Router (para la navegación)
- Axios (para peticiones HTTP)
- Express (para el servidor backend)
- React Icons

## Requisitos Previos

Asegúrate de tener instalado Node.js (versión 14 o superior) y npm en tu sistema.

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/valengg11/meli-frontend-test.git
```

2. Navega al directorio del proyecto:

```bash
cd meli-frontend-test
```

3. Instala las dependencias:

```bash
npm install
```

## Ejecución del Proyecto

Para ejecutar el proyecto, necesitas iniciar tanto el servidor backend como la aplicación frontend.

### Servidor Backend

1. Navega al directorio del servidor:

```bash
cd server
```

2. Inicia el servidor:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`.

### Aplicación Frontend

1. En otra terminal, navega al directorio raíz del proyecto.

2. Inicia la aplicación frontend:

```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

## Estructura del Proyecto

- `/src`: Contiene el código fuente de la aplicación React
- `/components`: Componentes reutilizables
- `/styles`: Estilos globales y variables SCSS
- `/utils`: Funciones y utilidades auxiliares
- `/server`: Contiene el código del servidor Express

## Características

- Búsqueda de productos
- Visualización de resultados de búsqueda
- Detalle de producto
- Diseño responsivo
- Autocompletado en la búsqueda

## Mejoras Implementadas

- SEO optimizado con meta tags dinámicos
- Lazy loading de imágenes y componentes
- Implementación de service workers para mejor rendimiento offline
- Sistema de caché en el servidor para reducir llamadas a la API de MercadoLibre

