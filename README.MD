# Library Management System

A full-stack Library Management System built using **React** (with Create React App), **Express.js**, **Node.js**, and **MySQL** as the database. This application allows users to manage library operations such as adding, updating, and deleting books, as well as managing user roles (e.g., admin and regular users).

---

## Features
- **Frontend**: Built with React for a responsive and interactive user interface.
- **Backend**: Built with Express.js and Node.js for handling API requests.
- **Database**: MySQL 8.0 for storing and managing data.
- **Authentication**: Role-based protected routes for admin and authenticated users.
- **Environment Variables**: Managed using `dotenv`.

---

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **MySQL** (v8.0 or later)
- **Git**

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/qayumXD/library-management-system-with-Reactjs-expressjs.git
cd library-management-system
```

### 2. Install Dependencies
Run the following command to install dependencies for both the backend and frontend:
```bash
npm run install-all
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=library_management
JWT_SECRET=your_jwt_secret
```

### 4. Set Up the Database
1. Open MySQL and create a database:
   ```sql
   CREATE DATABASE library_management;
   ```
2. Import the database schema:
   ```bash
   mysql -u your_mysql_username -p library_management < database/schema.sql
   ```

### 5. Start the Application
Run the following command to start both the backend and frontend concurrently:
```bash
npm start
```

- The **frontend** will run on `http://localhost:3000`.
- The **backend** will run on `http://localhost:5000`.

---

## Project Structure
```
library-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   └── borrowingController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── bookModel.js
│   │   └── borrowingModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   └── borrowingRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── BookForm.js
│   │   │   │   ├── ManageBooks.js
│   │   │   │   └── ManageBorrowings.js
│   │   │   ├── BookDetails.js
│   │   │   ├── BooksList.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── UserBorrowings.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
└── package.json
```

---

## Scripts
- **Install all dependencies**: `npm run install-all`
- **Start the application**: `npm start`
- **Start backend only**: `npm run server`
- **Start frontend only**: `npm run client`

---

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License
This project is licensed under the ISC License.

---

## Author
Developed by [Your Name](https://github.com/qayumXD).