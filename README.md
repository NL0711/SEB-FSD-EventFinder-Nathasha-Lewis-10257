# 📅 FR.CRCE Event Hosting & Management Platform

A MERN stack web application built for **Fr. Conceicao Rodrigues College of Engineering (FR.CRCE)** to host and manage college events and hackathons. The platform allows students to register, log in, and participate in events. It also includes an admin dashboard where admins can securely log in and manage events independently from student users.

---

## 🚀 Features

- 🔐 **Student Login** – Secure authentication for students
- 🗓️ **Event Listing** – Browse and register for college events and hackathons
- 📊 **Student Dashboard** – View registered events and participation history
- 🛠️ **Admin Panel** – Separate login and dashboard for admins to:
  - Add/update/delete events
  - View participants

---

## 🛠️ Tech Stack

- **MongoDB** – NoSQL database  
- **Express.js** – Backend framework  
- **React.js** – Frontend library  
- **Node.js** – Backend runtime  
- **VS Code** – Recommended IDE

---

## 🔧 How to Run the Project (Full Setup)

### 1️⃣ Clone the Repository

git clone https://github.com/yourusername/frcrce-event-platform.git  
cd frcrce-event-platform

---

### 2️⃣ Setup and Run Backend

cd backend  
npm install  
node index.js

⚠️ Make sure:
- MongoDB is installed and running locally (default: mongodb://localhost:27017)
- If you're using a remote MongoDB, update the connection string in the backend config file

---

### 3️⃣ Setup and Run Frontend

cd frontend  
npm install  
npm run dev

🌐 The frontend will start by default at:  
http://localhost:5173

---

## 📁 Folder Structure

frcrce-event-platform/  
├── backend/       # Express backend with MongoDB  
│   └── index.js  
│  
├── frontend/      # React frontend  
│   └── src/  
│  
└── README.md      # Project documentation

---

## 👤 Author

Developed by Adnan Khan(10254), Nathasha Lewis(10257),Chris Fernandes(10244) 
For academic/institutional use at **FR.CRCE**

---

## 📜 License

This project is licensed under MIT License.

