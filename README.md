# 📅 EventFinder - FR.CRCE Event Hosting & Management Platform

A MERN stack web application built for **Fr. Conceicao Rodrigues College of Engineering (FR.CRCE)** to host and manage college events and hackathons. The platform allows students to register, log in, and participate in events. It also includes an admin dashboard where admins can securely log in and manage events independently from student users.

---

[Event Finder Demo Video Link](https://drive.google.com/file/d/1P8RZKWXTmFxgpvRcVzZeCSVlyr_QeDSu/view?usp=sharing)

---

## 🚀 Features

🔐 **Student Login** – Secure authentication for students
🗓️ **Event Listing** – Browse and register for college events and hackathons
📊 **Student Dashboard** – View registered events and participation history
🛠️ **Admin Panel** – Separate login and dashboard for admins to:
  - Add/update/delete events
  - View participants

---

## 🛠️ Tech Stack

**MongoDB** – NoSQL database  
**Express.js** – Backend framework
**Node.js** – Backend server  
**React.js** – React frontend library
**VS Code** – Recommended IDE

---

## 🔧 How to Run the Project

⚠️ Make sure:
- Ensure you have Node.js installed
- MongoDB is installed and running locally (default: mongodb://localhost:27017)
- If you're using a remote MongoDB, update the connection string in the backend .env file

Clone the project and navigate to project folder
``` bash
git clone https://github.com/NL0711/SEB_EventFinder_NathashaLewis_10257.git
```
``` bash
cd SEB_EventFinder_NathashaLewis_10257
```

---

### 2️⃣ Setup and Run Backend

``` bash
cd backend #naviagate to backend dir
```
Create a .env file in the backend directory.
Add the following lines
``` bash
MONGO_URI=<your_mongodb_connection_string>
PORT=<some_port_number>
JWTPASSWORD=<jwt_secret_password>  
```
Replace:
- <your_mongodb_connection_string> with your actual MongoDB connection string
- <some_port_number> with a specific port (Optional, defaults to 3000)
- <jwt_secret_password> with a valid JWT string
``` bash
npm install  #install dependencies
```
``` bash
node index.js  #start server
```

---

### 3️⃣ Setup and Run Frontend

Open a new, separate terminal window/tab. Navigate back to the project's root directory.
```bash
cd frontend  #naviagate to frontend dir
```
```bash
npm install  #install dependencies
```
```bash
npm run dev  #run the app
```

🌐 The frontend will start by default at: http://localhost:5173

---

## 📁 Folder Structure

``` bash
fsdproject/
├── backend/
│   ├── Database/
│   │   └── dbConnection.js   # Handles DB connection
│   ├── Routes/               # Defines API endpoints
│   ├── Controllers/          # Handles request logic
│   ├── Models/               # Defines database schemas
│   ├── index.js              # Backend server entry point
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables (MONGO_URI, etc.) - YOU CREATE THIS
│
├── frontend/
│   ├── src/                  # Main frontend source code
│   │   ├── components/       # Reusable UI parts
│   │   ├── App.jsx           # Main application component (likely)
│   │   └── main.jsx          # Frontend entry point (likely)
│   ├── index.html            # HTML entry point
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Frontend build config (likely if using Vite)
│
└── README.md                 # Project setup and info
```
---

## 👤 Author

Developed by:
- Nathasha Lewis(10257)
- Adnan Khan(10254)
- Chris Fernandes(10244)

## 📜 License

This project is licensed under MIT License.

