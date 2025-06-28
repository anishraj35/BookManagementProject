# 📚 Book Management System

A full-stack Book Management application built with **React (Vite)**, **Spring Boot**, **MongoDB**, and **Bootstrap**. Users can add, view, delete books, and fetch extended book details via the **Google Books API**.

---

## 🚀 Features

- 📥 Add books with form validation (Title, Author, ISBN, Genre, etc.)
- 📄 List all books with **pagination** and **sortable table**
- ❌ Delete books from the list
- 🔍 View detailed info via **Google Books API**
- 🔁 Toggle "More Details" section like Flipkart's product view
- 📱 Responsive UI using Bootstrap

---

## 🧑‍💻 Tech Stack

| Layer      | Tech Used               |
|------------|--------------------------|
| Frontend   | React (Vite), Bootstrap  |
| Backend    | Spring Boot              |
| Database   | MongoDB (Atlas)          |
| External   | Google Books API         |
| Deployment | Vercel (frontend), Railway (backend) |

---

## 📂 Folder Structure

project-root/
│
├── backend/
│ └── src/
│ └── main/
│ ├── java/com/example/demo/
│ │ ├── controller/ # REST APIs
│ │ ├── model/ # Book model + Sequence
│ │ ├── repository/ # Mongo repo
│ │ ├── service/ # Sequence ID logic
│ │ └── BookServiceApplication.java
│ └── resources/
│ ├── application.properties
│ └── static/
│
├── frontend/
│ ├── public/ # Static files
│ ├── src/
│ │ ├── api/ # API calls to backend
│ │ ├── components/ # AddBookForm, BookList, Pagination, BookDetails
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.css # Custom styles
│ └── vite.config.js
│
└── README.md

yaml
Copy
Edit

---

## ⚙️ Setting Up Locally

### 🔧 Prerequisites

- Node.js & npm
- Java 17+
- MongoDB Atlas Account
- Vercel (optional for deployment)

---

### 🖥 Backend Setup (Spring Boot)

```bash
cd backend
# Open application.properties and add your MongoDB URI
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydb

# Run the backend (using IntelliJ, Eclipse or Maven CLI)
mvn spring-boot:run
🌐 Frontend Setup (React + Vite)
bash
Copy
Edit
cd frontend
npm install

# Run the frontend
npm run dev
Make sure your backend is running on port 8080 and frontend on 5173.

🔐 Environment Variables
Set the following:

MongoDB URI in application.properties (Spring Boot)

Google Books API Key (optional if proxying without key)

🧪 API Endpoints
🔹 Add a Book
bash
Copy
Edit
POST /api/books
Content-Type: application/json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "isbn": "9780261103344",
  "publicationDate": "1937-09-21",
  "genre": "Fantasy",
  "rating": 5
}
🔹 Get All Books (paginated & sorted)
bash
Copy
Edit
GET /api/books?page=0&size=10&sort=title,asc
🔹 Get Book by ID
bash
Copy
Edit
GET /api/books/{id}
🔹 Delete Book
bash
Copy
Edit
DELETE /api/books/{id}
🔹 Google Book Details (proxy API)
bash
Copy
Edit
GET /api/google/{isbn}
🗄 Database Schema
books collection
Field	Type	Constraints
_id	String	Custom ID like B-001
title	String	Required, ≤100 characters
author	String	Required, ≤50 characters
publicationDate	Date	Required
isbn	String	Required, 13-digit, unique
genre	String	Enum: Fiction, Non-Fiction...
rating	Int	1 to 5

database_sequences (for ID generation)
Field	Type	Description
_id	String	Sequence name (e.g., "book_seq")
seq	Int	Incremented number

📝 Code Comments
Code has inline comments for:

Sequence generation logic

Google API proxy handling

Frontend form validation using react-hook-form