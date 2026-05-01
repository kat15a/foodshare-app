#🍽️FoodShare App

FoodShare App is a full-stack web application designed to manage and reduce food waste. It allows users to register, log in, and interact with the system to donate or request food.

---

## Tech Stack

Frontend:

* React.js
* JavaScript, HTML, CSS

Backend:

* Spring Boot (Java)
* REST APIs

Database:

* MySQL

---

## Project Structure

```
foodshare-app/
│
├── backend/                 # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│
├── food-waste-frontend/     # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

## Features

* User registration and login
* Authentication handling
* Frontend–backend API integration
* Food donation/request system (basic structure)

---

## How to Run the Project

### 1. Clone the repository

```
git clone https://github.com/your-username/foodshare-app.git
cd foodshare-app
```

---

### 2. Run Backend

```
cd backend
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

### 3. Run Frontend

```
cd food-waste-frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## Configuration

* Make sure MySQL is running
* Update database credentials in:

  ```
  backend/src/main/resources/application.properties
  ```

Example:

```
spring.datasource.url=jdbc:mysql://localhost:3306/foodshare
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## Notes

* Backend must be running before using the frontend
* API base URL in frontend should point to:

  ```
  http://localhost:8080
  ```
* Ensure CORS is enabled in backend for frontend requests

---

## Known Issues

* Login may fail if backend is not running
* Incorrect API URL or CORS configuration can cause errors

---

## Future Improvements

* Add proper authentication (JWT)
* Improve UI/UX
* Add real-time notifications
* Deploy frontend and backend separately


Your Name
