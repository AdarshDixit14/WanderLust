# 🏡 Wanderlust - Travel & Stay Listing Platform

Wanderlust is a full-stack web application inspired by travel and accommodation platforms. 
Users can explore different listings, create their own listings, upload images, and share reviews.

The project is built using Node.js, Express.js, MongoDB, EJS, Bootstrap, and Cloudinary.

---

## 🚀 Live Demo

https://wanderlust-ajp4.onrender.com

---

## ✨ Features

- 🔐 User Registration & Login
- 🚪 User Logout
- 🏠 View All Listings
- 🔍 Search Listings
- 🏷️ Category-based Listings
- ➕ Create New Listings
- ✏️ Edit Listings
- 🗑️ Delete Listings
- ☁️ Image Upload using Cloudinary
- ⭐ Add Reviews & Ratings
- 🗑️ Delete Reviews
- 👤 Review Author Display
- 🔒 Ownership Authorization
- 💬 Flash Messages
- 💰 Listing Price & Location Details
- 🗄️ MongoDB Atlas Database Integration

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- Bootstrap
- JavaScript
- EJS (Embedded JavaScript Templates)

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- Passport.js
- Express Session
- Passport Local Mongoose

** Image Storage **
* Cloudinary
*  Multer

** Deployment:**
* Render

---



## 📂 Project Structure

```
Wanderlust/
│
├── app.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
│
├── controllers/
│   ├── listings.js
│   └── reviews.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   │
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   │
│   └── includes/
│       ├── navbar.ejs
│       └── footer.ejs
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── init/
│   ├── index.js
│   └── data.js
│
├── utils/
│   ├── ExpressError.js
│   ├── wrapAsync.js
│   └── multer.js
│
├── middleware.js
├── schema.js
└── cloudConfig.js
```

---


## 📸 Project Pages

### 🏠 Home Page


Users can browse available stays and explore different categories such as:

- Trending
- Rooms
- Iconic Cities
- Castles
- Amazing Pools
- Camping
- Farms
- Arctic
- Boats

### 📄 Listing Details Page

Each listing displays:

- Listing image
- Title
- Description
- Price
- Country
- Location
- Owner
- Reviews and ratings

### ➕ Create Listing

Logged-in users can create a new listing by providing:

- Title
- Description
- Image
- Price
- Country
- Location
- Category

### ✏️ Edit Listing

Listing owners can update their listing information.

### ⭐ Review System

Users can:

- Add ratings
- Write reviews
- View reviews
- Delete their own reviews

---

## 📸 Screenshots

### 🏠 Home Page
<img width="1909" height="876" alt="homepage" src="https://github.com/user-attachments/assets/52b54bc6-cdc8-4427-a207-b25fecfb7e99" />


### 📄 Listing Details Page
<img width="1868" height="892" alt="ListingDetails" src="https://github.com/user-attachments/assets/2a965f66-cde6-4633-a914-c7fec872c67f" />


### ➕ Create Listing Page
<img width="1896" height="873" alt="CreateListing" src="https://github.com/user-attachments/assets/801bc236-f2a8-4b5c-8f40-99d739cfc064" />


### ✏️ Edit Listing Page
<img width="1903" height="870" alt="EditPage" src="https://github.com/user-attachments/assets/4f640eee-34a5-47b1-af2c-8c7bd481cf48" />


### 💬 Reviews Section
<img width="1896" height="862" alt="Review" src="https://github.com/user-attachments/assets/a893ad83-c29f-4333-841b-4f95e1442d79" />




⚙️ Installation
```
git clone <your-repository-url>
cd Wanderlust
npm install
```
🔑 Environment Variables

Create a .env file in the root directory:

```
ATLASDB_URL=your_mongodb_atlas_url

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

▶️ Run the Project

Start the application:

```
node app.js
```

Or use Nodemon:
```
nodemon app.js
```
Open your browser:
```
http://localhost:8080
```
---
🌱 Seed Database

To insert sample listings into the database:
```
node init/index.js
```
---
## 🔐 Authentication & Authorization

The application uses Passport.js for authentication.

### User Authentication

- Register
- Login
- Logout

### Authorization

- Only logged-in users can create listings.
- Only listing owners can edit their listings.
- Only listing owners can delete their listings.
- Only review authors can delete their reviews.

---

## ☁️ Image Upload

-Images are uploaded using Cloudinary.
-The application uses Multer to handle file uploads before storing the images in Cloudinary.
-This allows listing images to be stored securely in cloud storage instead of directly inside the project.

---

## 🗄️ Database

-The application uses MongoDB Atlas as the database.

---


## 📈 Future Improvements
Some features planned for future versions:

* Search & filtering system
* Booking system
* Wishlist feature
* Payment integration
* User profile pages
* Notifications
* More Listing Categories
---

## 👨‍💻 Author
 ** Adarsh Dixit

B.Tech Computer Science & Engineering Student
Frontend & Full-Stack Web Developer

GitHub: https://github.com/AdarshDixit14
LinkedIn: https://www.linkedin.com/in/adarshdixit14
---
 ## 📜 License
This project was created for educational and learning purposes.




