# 📅 EventFinder - FR.CRCE Event Hosting & Management Platform

A MERN stack web application built for **Fr. Conceicao Rodrigues College of Engineering (FR.CRCE)** to host and manage college events and hackathons. The platform allows students to register, log in, and participate in events. It also includes an admin dashboard where admins can securely log in and manage events independently from student users.

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

## 🔧 How to Run the Project (Full Setup)

⚠️ Make sure:
- Ensure you have Node.js installed
- MongoDB is installed and running locally (default: mongodb://localhost:27017)
- If you're using a remote MongoDB, update the connection string in the backend .env file

Clone the project and navigate to project folder
```
git clone https://github.com/NL0711/SEB_EventFinder_NathashaLewis_10257.git
cd SEB_EventFinder_NathashaLewis_10257
```

---

### 2️⃣ Setup and Run Backend

```
cd backend
```
- Create a .env file in the backend directory.
- Add the following lines
```
MONGO_URI=<your_mongodb_connection_string>
PORT=<some_port_number>
JWTPASSWORD=<jwt_secret_password>  
```
Replace:
- <your_mongodb_connection_string> with your actual MongoDB connection string
- <some_port_number> with a specific port (Optional, defaults to 3000)
- <jwt_secret_password> with a valid JWT string
- 
```
npm install  //install dependencies
node index.js  //start server
```

---

### 3️⃣ Setup and Run Frontend

Open a new, separate terminal window/tab. Navigate back to the project's root directory.
```
cd frontend  //naviagate to frontend dir
npm install  //install dependencies
npm run dev  //run the app
```
Keep this terminal running as well

🌐 The frontend will start by default at:  
http://localhost:5173

---

## 📁 Folder Structure

frcrce-event-platform/  
├── backend/       # Node.js + Express.js backend with MongoDB  
│   └── index.js  
│  
├── frontend/      # React.js frontend  
│   └── src/  
│  
└── README.md      # Project documentation

---

## 👤 Author

Developed by:
- Nathasha Lewis(10257)
- Adnan Khan(10254)
- Chris Fernandes(10244) 
For academic/institutional use at **FR.CRCE**

---

## 📜 License

This project is licensed under MIT License.

