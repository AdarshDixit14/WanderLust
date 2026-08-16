# 🏡 Wanderlust - Travel & Stay Listing Platform

Wanderlust is a full-stack web application inspired by travel and accommodation platforms. 
Users can explore different listings, create their own listings, upload images, and share reviews.

The project is built using Node.js, Express.js, MongoDB, EJS, Bootstrap, and Cloudinary.

---

## 🚀 Live Demo

https://wanderlust-s1wz.onrender.com

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
- 📱 Responsive Design
- 🎨 Modern and Aesthetic UI
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

### Image Storage

- Cloudinary
- Multer

### Deployment

- Render

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

Images are uploaded using Cloudinary.

The application uses Multer to handle file uploads before storing the images in Cloudinary.

This allows listing images to be stored securely in cloud storage instead of directly inside the project.

---

## 🗄️ Database

The application uses MongoDB Atlas as the database.

### Main Models

```text
User
Listing
Review
