
# 🚀 CourseMaster - Full-Featured EdTech Platform

Client Side : https://coursemasterbysaria.netlify.app/
Server Side : https://course-master-server-drab.vercel.app/ 

## 📚 Project Overview
**CourseMaster** is a production-ready online learning platform built using the **MERN stack**. This platform simulates a real-world EdTech environment where students, instructors, and administrators interact seamlessly.

- Students can browse, purchase, and consume courses.  
- Admins can manage courses, track enrollments, and review assignments.  
- The platform ensures secure authentication, efficient APIs, and a structured database design.

**Duration:** 4 Days  
**Assessment:** Technical Web Developer Project  

---

## 🛠 Technology Stack

- **Frontend:** React.js, TailwindCSS, Daisy UI
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** Firebase (Email/Password & Google), JWT  
- **State Management:** React Context API  
- **Hosting:** Netlify (Client), Vercel (Server)  
- **Other Tools:** SweetAlert2, Recharts  

---

## ⚡ Key Features

### 🧑‍🎓 Student Features
- Registration/Login/Logout (JWT-based authentication)  
- View enrolled courses on Student Dashboard  
- Track progress with dynamic progress bars  
- Watch video lessons (embedded YouTube/Vimeo links)  
- Mark lessons as complete (+ update progress)  
- Submit assignments (link/text)  
- Take quizzes with instant score  

### 🧑‍💼 Admin Features
- Course CRUD (Create, Read, Update, Delete)  
- Define course batches (e.g., Batch 1 starts Jan 1st)  
- View student enrollments per course/batch  
- Review submitted assignments  
- Analytics dashboard for enrollments (bonus)
- admin emails = admin@coursemaster.com  


### UI Features
- Fully responsive design for desktop, tablet, and mobile.
- Light and dark mode toggle supported throughout the site.
- Smooth hover effects and modern UI components using Tailwind CSS and ShadCN components.

---

### 🌐 Public Pages (Unprotected)
- Home / Course Listing with:  
  - Server-side pagination  
  - Searching by title/instructor  
  - Sorting by price (low/high)  
  - Filtering by category/tags  
- Course Details Page  
  - Course Title, Description, Instructor, Syllabus, Price  
  - "Enroll Now" button (with login/payment flow)  

### 📝 Feedback & Blog
- Submit feedback with name, email, message  
- Browse blogs/articles related to tech and learning  

---

## 📂 Project Structure for server side
```

root/
│
├── src/
│   ├── models/             # Mongoose schemas (Course, User, Enrollment)
│   ├── controllers/        # Route controllers
│   ├── services/           # Business logic
│   ├── validations/        # Input validation with Zod/Joi
│   ├── routes/             # Express routes
│   └── middlewares/        # Error handling, auth protection
│
└── server.js               # Entry point

````

---

## ⚙ Installation & Run Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/sariakhatun/course-master-server
cd coursemaster-master-server
````

### 2️⃣ Backend Setup
 

```bash
cd server
npm install
```

Create a `.env` file in `server/` with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Firebase Config
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

Run backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/sariakhatun/course-master-client
cd coursemaster-master-client




cd client
npm install
```

Create a `.env` file in `client/` for Firebase:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

Run frontend:

```bash
npm start
```

---

## 🔗 API Documentation

### Courses

* **GET** `/api/courses` → Get all courses
* **GET** `/api/courses/:id` → Get course details
* **POST** `/api/courses` → Create course (Admin)
* **PATCH** `/api/courses/:id` → Update course (Admin)
* **DELETE** `/api/courses/:id` → Delete course (Admin)

### Enrollment

* **GET** `/api/enroll` → Get all enrollments for user
* **GET** `/api/enroll/:email` → Get specific users enrollments 
* **POST** `/api/enroll` → Enroll in a course
* **PATCH** `/api/enroll/:id` → Update progress/completed lessons

### Assignments

* **GET** `/api/assignments` → Get user assignments
* **POST** `/api/assignments` → Submit assignment

### Users

* **POST** `/api/register` → Register new user
* **POST** `/api/login` → Login user
* **GET** `/api/users/:id` → Get user details

### Feedback

* **POST** `/api/feedback` → Submit feedback

### Blogs

* **GET** `/api/blogs` → Get all blogs

---

## 🌐 Deployment

* **Frontend:** Netlify (build folder after `npm run build`)
* **Backend:** Vercel (Node.js server with MongoDB connection via env vars)
* Ensure live links are functional.

---

## 🔑 Environment Variables Summary

### Backend

```
PORT=
MONGO_URI=
JWT_SECRET=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

### Frontend

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

---

## 🏆 Bonus Features Implemented

* Analytics Dashboard (Enrollments Over Time) using Recharts
* SweetAlert2 notifications for feedback & lesson completion

---

## 👩‍💻 Author

**Saria Khatun** – https://github.com/sariakhatun

---

