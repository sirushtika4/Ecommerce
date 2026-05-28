# E-Commerce GUI Project

A Vue 3 Single Page Application for browsing and viewing products from the DummyJSON API.

## Project Description

This project is a mini e-commerce GUI built with Vue 3, TypeScript, and Tailwind CSS. It allows users to browse products, search by title, view product details, and add items to a shopping cart.

## Technologies Used

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Vue Router** for client-side routing
- **Axios** for API requests
- **Pinia** for state management (shopping cart)

## Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory.
3. Install dependencies:

   ```bash
   npm install
   ```

## Running the Project

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To build the project for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── NavBar.vue
│   ├── ProductCard.vue
│   ├── ProductList.vue
│   └── SearchBar.vue
├── pages/
│   ├── Home.vue
│   └── ProductDetail.vue
├── router/
│   └── index.ts
├── services/
│   └── api.ts
├── store/
│   └── cart.ts
├── types/
│   └── index.ts
├── App.vue
├── main.ts
└── style.css
```

## Features

- Browse products in a responsive grid layout
- Search products by title (real-time filtering)
- View detailed product information
- Add products to shopping cart
- Persistent cart using localStorage
- Responsive design for mobile, tablet, and desktop

## API

The application fetches data from [DummyJSON Products API](https://dummyjson.com/products).