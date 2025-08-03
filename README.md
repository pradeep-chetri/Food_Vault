# 🍲 Food Vault

**Food Vault** is a modern, full-stack recipe vault where users can view, bookmark, and manage their favorite recipes. It features dynamic tags, personalized bookmarking, and a smooth, responsive UI built with React and FastAPI.

> Built to provide a beautiful, fast, and intuitive recipe browsing experience.

---

## 🌍 Live Demo

🔗 [https://foodvault.example.com](https://foodvault.example.com)

---

## 📸 Features

- 🔖 **Bookmark recipes** and persist your saved ones across sessions.
- 🧠 **Smart tags** with consistent auto-colored labels.
- 🔎 **Search + filter** through your saved recipes.
- 👤 **User dashboard** to view your added content.
- 📊 **Statistics banner** showing total recipes, users, and more (optional).

---

## 🧱 Built With

**Frontend**  
- React + TypeScript  
- Tailwind CSS v4 
- Context API + Custom Hooks  
- Lucide Icons  

**Backend**  
- FastAPI (Python)  
- SQLite (lightweight embedded DB)  
- REST APIs for recipes, bookmarks, and user data  

---

## 🗂️ Internal Structure

```
food-vault/
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   ├── 📁 context/        # React Context providers
│   │   ├── 📁 hooks/          # Custom React hooks
│   │   ├── 📁 pages/          # Main application pages
│   │   ├── 📁 utils/          # Helper functions
│   │   └── 📁 types/          # TypeScript type definitions
│   ├── 📁 public/             # Static assets
|   └── 📄 start.ps1           # start backend server
├── 📁 backend/
│   ├── 📁 app/
│   │   ├── 📁 routes/         # FastAPI route handlers
│   │   ├── 📁 models/         # Database models
│   │   ├── 📁 schemas/        # Pydantic schemas
│   │   ├── 📁 database/       # Database configuration
|	│   └── 📄 main.py         # FastAPI application entry point
|   └── 📁 data/
|        └── 📄 foodvault.sqlite
├── 📄 server_laucher.ps1      # frontend and backend server launcher
└── 📄 README.md
```

---

## ⚡ Quick Glance

- ✅ Built with developer maintainability in mind
- 🎨 Uses `string-hash` and Tailwind `@source inline` for tag color consistency
- ⚙️ Clean separation between API logic and UI components
- 🔒 Ready for auth integration (email-based)

---

## 🙋‍♂️ Creator

Built with ❤️ by [Pradeep](https://github.com/pradeep-chetri)

---

## 📌 Future Roadmap

- [ ] OAuth / secure login system  
- [ ] Ingredient  and instruction integration
- [ ] Ingredient-based filtering & dark mode  


---

_“A recipe is only as good as its structure. Food Vault gives it both.”_