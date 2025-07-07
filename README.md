# 🚀 Wanderlust

A full-stack MERN travel-stay marketplace where users can list, browse, and book properties—built with user authentication, cloud image upload, and interactive maps.

---

## 🔍 Features

- 🧑‍💼 **User Authentication** – Signup, login, and role-based access  
- 🏞 **Add/Edit/Delete Listings** – CRUD support for property listings  
- 🗺 **Mapbox Integration** – Display locations on interactive maps  
- 🖼 **Cloudinary Image Upload** – Store & manage listing images in cloud  
- 📱 **Responsive UI** – Mobile-friendly design with smooth navigation  
- 🔎 **Search and Filters** – Quickly find desired stays  
- 🔐 **Secure Sessions** – Managed using express-session & cookies  
- ⚠ **Error Handling** – Graceful user feedback with custom error pages

---

## 🛠️ Tech Stack

| Layer        | Technology                                 |
|--------------|---------------------------------------------|
| Frontend     | React, EJS, Bootstrap, Axios               |
| Backend      | Node.js, Express.js                        |
| Database     | MongoDB, Mongoose                          |
| Auth         | Passport.js, bcryptjs, express-session     |
| File Uploads | Cloudinary                                 |
| Maps         | Mapbox                                     |
| Deployment   | [Render / Vercel / Netlify / Railway]      |

---

## 📂 Project Structure

Wanderlust/
│
├── models/ # Mongoose models
├── routes/ # Express routes
├── views/ # EJS templates (if used)
├── controllers/ # Route controllers
├── public/ # Static assets
├── config/ # DB & Passport configs
├── utils/ # Middleware, error handlers
├── client/ # React Frontend (if separated)
├── .env # Environment variables
├── server.js # App entry point
└── README.md

---

## 🚀 Getting Started

### 1. Clone the repository
git clone https://github.com/Pranav25-06/Wanderlust.git
cd Wanderlust
### 2. Install dependencies
npm install
cd client && npm install     # If using a React client
### 3. Create .env file in root directory
env
DATABASE_URL=your_mongo_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
SESSION_SECRET=your_random_session_secret
### 4. Start the development server
nodemon app.js

## 🧪 How to Use
Sign up or log in

View listings or create your own

Upload images and set property details

View the map to locate your stay

Edit or delete listings you created

## 🔮 Upcoming Features
⭐ Reviews and Ratings

💬 Chat between host & guest

💳 Payment integration with Stripe

🗓 Booking calendar availability

📩 Email notifications (Nodemailer)

## 🤝 Contributing
Contributions are welcome!

Fork the repository

Create a new branch

Make your changes

Submit a pull request

Ensure proper commit messages and clean code format.

📬 Contact
Pranav Gore
📧 Email: [pranavgore2506@gmail.com]
🌐 GitHub: @Pranav25-06

Built with 💖 to make travel booking simple, elegant, and secure.

---

✅ **Replace** the following placeholders before pushing:

- `your-email@example.com` – with your contact email
- `.env` values – provide your keys safely (don’t push `.env` to GitHub)

Let me know if you also want:

- 📸 Screenshots section
- 🚦 GitHub badges (build, license, stars, etc.)
- 📁 Architecture diagram

Happy building!
