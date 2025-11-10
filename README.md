# 🛍️ E-Commerce Web Application (MERN Stack)

A modern **Full-Stack E-Commerce Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)** with full **admin and user functionality**, including product management, image uploads, cart system, and order handling.

---

## 🚀 Features

### 👤 User
- Register and log in using JWT Authentication  
- Browse and search products  
- Add or remove items from the shopping cart  
- Checkout with address and order summary  

### 🧑‍💼 Admin
- Secure admin login  
- Create, edit, and delete products with image uploads  
- Manage and track user orders  
- Dashboard for viewing analytics  

---

## ⚙️ Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios

**Backend**
- Node.js & Express.js  
- MongoDB & Mongoose  
- Multer (for image upload)
- JWT Authentication  
- bcrypt.js  
- dotenv  

---
## 🗂️ Project Structure

```

e-commerceapp/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ ├── utils/
│ ├── .env
│ ├── server.js
│ └── package.json
│
└── ecommerce-frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── store/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx
├── vite.config.js
├── package.json
└── .env
```


---

## ⚡ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/shaz-code/e-commerceapp.git
cd e-commerceapp

2️⃣ Setup Backend
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run the server:

npm start

3️⃣ Setup Frontend
cd ../ecommerce-frontend
npm install
npm run dev


Access the app at http://localhost:5173


