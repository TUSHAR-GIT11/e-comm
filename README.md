# ShopKart 🛒

A full-stack e-commerce web application built with **React** (frontend) and **Strapi** (backend/CMS), integrated with **Stripe** for payment processing and **GraphQL** for data fetching.

## 🌐 Live Demo

- **Frontend:** [e-comm-blond-nine.vercel.app](https://e-comm-blond-nine.vercel.app)
- **Backend:** [e-comm-nmu2.onrender.com](https://e-comm-nmu2.onrender.com)

## ✨ Features

- 🔐 User authentication (signup, login, protected routes)
- 🛍️ Browse products by category
- 🔍 Search products
- 🛒 Shopping cart (add, remove, update quantity)
- 💳 Stripe payment integration
- 📦 Order placement with shipping details
- ✅ Payment success notification with auto-redirect
- 📱 Fully responsive UI with Tailwind CSS

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router, Tailwind CSS |
| Backend | Strapi 5 (Headless CMS) |
| Database | SQLite (local) |
| API | GraphQL (Apollo Client) |
| Payments | Stripe |
| Hosting | Vercel (frontend), Render (backend) |

## 📁 Project Structure

```
e-comm/
├── e-commerce/        # Strapi backend
│   ├── src/api/       # API controllers, routes, services
│   ├── config/        # Server, database, middleware config
│   └── data/          # Seed data and uploads
│
└── ecomm-client/      # React frontend
    ├── src/
    │   ├── components/  # Navbar, Categories, Checkout, etc.
    │   ├── pages/       # Home, Product, Cart, Login, Signup
    │   └── gqloperations/ # GraphQL queries
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.0.0
- npm >= 6.0.0

### Run Backend (Strapi)

```bash
cd e-commerce
npm install
npm run dev
```

Strapi admin will be available at `http://localhost:1337/admin`

### Run Frontend (React)

```bash
cd ecomm-client
npm install
npm start
```

App will be available at `http://localhost:3000`

### Environment Variables

**Backend (`e-commerce/.env`):**
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
ENCRYPTION_KEY=
STRIPE_SECRET=
```

**Frontend (`ecomm-client/.env`):**
```
REACT_APP_API_URL=http://localhost:1337
```

## 💳 Test Payment

Use these Stripe test card details:

| Field | Value |
|-------|-------|
| Card Number | `4242 4242 4242 4242` |
| Expiry | `12/26` |
| CVV | `123` |

## 📄 License

This project is for educational purposes.

---

Made with ❤️ by Tushar Gupta
