# 🍲 Food Vault

**Food Vault** is a modern, full-stack recipe vault where users can view, bookmark, and manage their favorite recipes. It features dynamic tags, personalized bookmarking, and a smooth, responsive UI built with React and FastAPI.

> Built to provide a beautiful, fast, and intuitive recipe browsing experience.

---

## 🌍 Live Demo

*🔗 Will be hosted soon after some updates *

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
- Neon Postgresql
- REST APIs for recipes, bookmarks, and user data  

**Services**
- ImageKit 

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
|   |   ├── 📁 utlis/          # Utility tools eg jwt, json handler etc.
|	  │   └── 📄 main.py         # FastAPI application entry point
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

- [ ] OAuth and more secure login system.  
- [ ] Ingredient-based filtering & dark mode.
- [*] Image upload feature.
- [ ] Add more tags.
- [ ] More features.
- [ ] Blogs and artical space. 


---

_“A recipe is only as good as its structure. Food Vault gives it both.”_
