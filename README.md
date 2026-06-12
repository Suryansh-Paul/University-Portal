# 🎓 University Portal Management System

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=1000&color=2F81F7&width=600&lines=Full+Stack+University+Portal+System;Spring+Boot+%2B+React+%2B+MySQL;REST+API+Architecture+Project;Built+for+real-world+learning" />

---

## 👋 Welcome

Hi there! This is a full-stack **University Portal Management System** built to manage students and courses using Spring Boot, React, and MySQL.

---

## 🧠 Developer Contribution

- 🟢 Backend (Spring Boot): 100% built from scratch
- 🟡 Frontend (React): AI-generated base, heavily modified and integrated
- 🔧 Full API integration, debugging, and system design handled manually
- 📈 Focused on real-world full-stack development experience

---

## 🛠️ Tech Stack

| Layer        | Technology         | Purpose              |
|--------------|------------------|----------------------|
| Backend      | Spring Boot       | REST API development |
| Database     | MySQL             | Data storage         |
| Frontend     | React             | UI layer             |
| ORM          | Spring Data JPA   | Database interaction |
| Validation   | Jakarta Validation| Input validation     |
| Build Tool   | Maven             | Dependency management|
| Version Ctrl | Git & GitHub      | Source control      |

---

## ✨ Features

- 🧑‍🎓 Student Management (CRUD)
- 📚 Course Management (CRUD)
- 🔍 JPQL Search functionality
- ⚠️ Global Exception Handling
- ✅ Input validation using annotations
- 🔗 React + Spring Boot integration

---

## 🧱 Architecture

Frontend (React) → Axios → Spring Boot Controller → Service Layer → Repository Layer → MySQL Database

---

## 🔌 API Endpoints

Students:
GET /api/students  
POST /api/students  
PUT /api/students/{id}  
DELETE /api/students/{id}

Courses:
GET /api/courses  
POST /api/courses  
PUT /api/courses/{id}  
DELETE /api/courses/{id}

Search:
GET /api/students/search?keyword=

---

## ⚙️ Setup Instructions

git clone https://github.com/your-username/university-portal.git  
cd backend  
mvn clean install  
mvn spring-boot:run

cd frontend  
npm install  
npm start

### Database Setup
Create MySQL database: university_portal  
Update credentials in application.properties

---

## 📚 Learning Outcomes

- Built REST APIs using Spring Boot
- Worked with JPA & JPQL queries
- Implemented validation and exception handling
- Integrated React with backend services
- Learned full-stack architecture and debugging

---



## 🚀 Status

✔ Backend complete  
✔ Frontend integrated  
✔ End-to-end working system

---

## 📌 Note

Built for real-world full-stack learning with strong backend architecture focus.