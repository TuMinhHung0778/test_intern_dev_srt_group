# SRT Group Intern Developer Test - Todo List

A simple **Todo List** application built for the **Intern Developer Technical Test** at **SRT Group**.

The project uses **React + Vite** for the frontend, **Node.js + Express** for the backend, and **MongoDB Atlas** as the database. It provides full CRUD functionality, search, filtering, pagination, and a responsive user interface.

---

## 🌐 Live Demo

**Website**

https://test-intern-dev-srt-group-1.onrender.com/

## ✨ Features

- Display all tasks
- Create a new task
- Edit an existing task
- Delete a task
- Mark a task as completed or active
- Search tasks by title
- Filter tasks by status:
  - All
  - Active
  - Completed
- Filter tasks by creation date:
  - Today
  - This Week
  - This Month
  - All
- Pagination
- Responsive design for desktop and mobile devices

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React
- Sonner

### Backend

- Node.js
- Express.js
- Mongoose

### Database

- MongoDB Atlas

### Deployment

- Render

---

## 📁 Project Structure

```text
test_intern_dev_srt_group/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Requirements

- Node.js 18 or later
- npm
- MongoDB Atlas

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/TuMinhHung0778/test_intern_dev_srt_group.git

cd test_intern_dev_srt_group
```

---

## 2. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5001

MONGODB_CONNECTIONSTRING=mongodb+srv://<username>:<password>@cluster.mongodb.net/todo_db

NODE_ENV=development
```

---

## 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5001/api
```

---

# ▶️ Run the Project

## Start the backend server

```bash
cd backend

npm run dev
```

Backend URL:

```text
http://localhost:5001
```

---

## Start the frontend application

```bash
cd frontend

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 📦 Build the Frontend

```bash
cd frontend

npm run build
```

---

# 📡 REST API

Base URL:

```text
http://localhost:5001/api
```

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/tasks?filter=all`   | Get all tasks          |
| GET    | `/tasks?filter=today` | Get today's tasks      |
| GET    | `/tasks?filter=week`  | Get this week's tasks  |
| GET    | `/tasks?filter=month` | Get this month's tasks |
| POST   | `/tasks`              | Create a new task      |
| PUT    | `/tasks/:id`          | Update a task          |
| DELETE | `/tasks/:id`          | Delete a task          |

---

## Create Task

Request Body:

```json
{
  "title": "Complete the SRT Group Intern Developer Test"
}
```

---

## Update Task

Request Body:

```json
{
  "title": "Complete the SRT Group Intern Developer Test",
  "status": "complete",
  "completedAt": "2026-07-06T12:00:00.000Z"
}
```

---

## Supported Filter Values

| Value   | Description              |
| ------- | ------------------------ |
| `today` | Tasks created today      |
| `week`  | Tasks created this week  |
| `month` | Tasks created this month |
| `all`   | All tasks                |

---

# ✅ Validation

### Frontend

- Prevents users from creating an empty task.
- Prevents users from saving an empty task.
- Displays success and error notifications for user actions.

### Backend

- Validates that the `title` field is required.
- Returns **404 Not Found** when a task does not exist.
- Restricts the `status` field to:
  - `active`
  - `complete`

---

# 🌍 Deployment

### Live Demo

https://test-intern-dev-srt-group-1.onrender.com/

### Frontend

- Render

### Backend

- Render

### Database

- MongoDB Atlas

---

# 📝 Notes

- The frontend and backend are separated and communicate through REST APIs.
- During development, the backend only allows CORS requests from:

```text
http://localhost:5173
```

- All application data is stored in MongoDB Atlas.

---

# 👨‍💻 Author

**Minh Hung Tu**

GitHub:

https://github.com/TuMinhHung0778
