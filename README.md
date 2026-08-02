# JVault

A modern full-stack e-commerce web application built with React and Shopify Storefront API.

## Features

- Modern responsive UI
- Shopify Storefront API integration
- Dynamic product collections
- New Arrivals fetched from Shopify
- Product search
- Product filtering
- Wishlist
- Shopping cart
- Dark mode
- Product detail page

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- React Router
- Shopify Storefront API
- Shopify Developer Store
- Git & GitHub

## Shopify Integration

This project uses a **Shopify Developer Store** as the backend.

Products, collections, prices, images, and inventory are managed through Shopify. The frontend fetches live product data using the Shopify Storefront GraphQL API.

Adding a new product or collection in the Shopify Admin automatically updates the frontend without changing the React code.

## Installation

```bash
git clone https://github.com/Codewithjasveer05/JVault.git

cd JVault

npm install

npm run dev
```

## Environment Variables

Create a `.env` file:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-token
VITE_SHOPIFY_API_VERSION=2025-07
```

## Future Improvements

- Customer Authentication
- Checkout
- Order History
- Reviews & Ratings
- Payment Gateway
- Admin Dashboard

## Live Demo

Coming Soon

## Author

**Jasveer Singh**

GitHub: https://github.com/Codewithjasveer05