# 🍲 Food Vault

**Food Vault** is a modern, full-stack recipe vault designed to help you view, bookmark, and manage your favorite recipes with ease. Built with a responsive and intuitive UI using **React** and **FastAPI**, it provides a beautiful, fast, and personalized browsing experience.

> Built to provide a beautiful, fast, and intuitive recipe browsing experience.

---

## 🌍 Live Demo

*🔗 Will be hosted soon after some updates *

---

## 📸 Core Features

- **Personalized Bookmarks**: Securely **bookmark recipes** that persist across all your sessions.
    
- **Intelligent Tagging**: Navigate recipes effortlessly with **smart, auto-colored tags** that ensure a consistent and organized look.
    
- **Powerful Search**: Quickly find what you're looking for with robust **search and filter** capabilities for all your saved recipes.
    
- **User Dashboard**: A dedicated space to view and manage all the recipes you've added.
    
- **Recipe Creation**: Easily **add your own recipes** to your personal vault.

---

## 💻 Tech Stack

### **Frontend**

- **React + TypeScript**: A powerful combination for building a dynamic and type-safe user interface.
    
- **Tailwind CSS v4**: For fast and modern styling with utility-first CSS.
    
- **Context API + Custom Hooks**: For efficient state management and reusable logic.
    
- **Lucide Icons**: A library of beautiful, consistent icons.
    

### **Backend**

- **FastAPI (Python)**: A high-performance framework for building fast and reliable APIs.
    
- **Neon Postgresql**: A scalable, serverless Postgres database for storing recipe and user data.
    
- **REST APIs**: A clean and organized architecture for managing recipes, bookmarks, and user information.
    

### **Services**

- **ImageKit**: For efficient and optimized image delivery.
  
---

## 🗂️ Internal Structure

```

food-vault/

├── 📁 frontend/

│   ├── 📁 src/

│   │   ├── 📁 components/     # Reusable UI components

│   │   ├── 📁 context/        # React Context providers

│   │   ├── 📁 hooks/          # Custom React hooks

│   │   ├── 📁 pages/          # Main application pages

│   │   ├── 📁 utils/          # Helper functions

│   │   └── 📁 types/          # TypeScript type definitions

│   ├── 📁 public/             # Static assets

|   └── 📄 start.ps1           # start backend server

├── 📁 backend/

│   ├── 📁 app/

│   │   ├── 📁 routes/         # FastAPI route handlers

│   │   ├── 📁 models/         # Database models

│   │   ├── 📁 schemas/        # Pydantic schemas

│   │   ├── 📁 database/       # Database configuration

|   |   ├── 📁 utlis/          # Utility tools eg jwt, json handler etc.

|     │   └── 📄 main.py         # FastAPI application entry point

|   └── 📁 data/

|        └── 📄 foodvault.sqlite

├── 📄 server_laucher.ps1      # frontend and backend server launcher

└── 📄 README.md

```

---

## ⚡ Developer Highlights

- **Maintainable Codebase**: Designed with a clean separation between API logic and UI components, making it easy to maintain and scale.
    
- **Consistent Styling**: Leverages `string-hash` and Tailwind `@source inline` for consistent and unique tag colors.
    
- **Ready for Authentication**: The foundation is in place for future integration of email-based authentication.

---

## 🙋‍♂️ Creator

Built with ❤️ by [Pradeep](https://github.com/pradeep-chetri)

---

## 🚀 Future Enhancements

- **Enhanced Authentication**: Implement **OAuth** and a more secure login system.
    
- **Advanced Filtering**: Add **ingredient-based filtering** to find recipes based on what you have on hand.
    
- **User Experience**: Introduce a **dark mode** option for a more comfortable viewing experience.
    
- **Community Features**: Explore adding a blog or article section for sharing culinary insights and tips.

---

  

_“A recipe is only as good as its structure. Food Vault gives it both.”_