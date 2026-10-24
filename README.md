# TaskTrack – Task Management Application

TaskTrack is a simple and user-friendly task management web application that helps users organize their daily activities, track pending tasks, and manage completed tasks.

## Features

- Add new tasks

- Edit existing tasks

- Delete tasks

- Mark tasks as completed or pending

- View total, pending, and completed task counts

- Data persistence using MongoDB Atlas

- Empty state message when no tasks are available

- Responsive user interface

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML | Website structure |
| CSS | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |

## Project Structure

```
tasktrack/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```
git clone https://github.com/Satwik23srivastava/Task-Track.git
```

### 2. Open the project folder

```
cd Task-Track
```

### 3. Install dependencies

```
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Never upload your actual `.env` file or database credentials to GitHub.

### 5. Start the application

```
node server.js
```

Open your browser and visit:

```
http://localhost:3000
```

## Future Improvements

- User authentication and login

- Task deadlines and reminders

- Task categories and filtering

- Search functionality

- Improved dashboard UI

## Author

**Satwik Kumar Srivastava**

GitHub: <https://github.com/Satwik23srivastava>

---

Made with HTML, CSS, JavaScript, Node.js, Express and MongoDB.