# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# **GitHub Documentation for FRESHBEEF Project**  

## **📌 Project Overview**  
**FRESHBEEF** is a React-based web application built with **Vite** for fast development and optimized builds. The project follows a modular structure with clear separation of components, pages, API logic, and assets.  

---

## **📂 Project Structure**  
```plaintext
FRESHBEEF/  
├── node_modules/          # Dependencies (auto-generated)  
├── public/               # Static assets (copied directly to build)  
├── src/  
│   ├── api/               # API services and requests  
│   ├── assets/            # Images, fonts, etc.  
│   ├── components/        # Reusable UI components  
│   ├── context/           # React context providers  
│   ├── data/              # Mock data or JSON files  
│   ├── dist/css/          # Compiled CSS (output)  
│   ├── pages/             # Page-level components (route-based)  
│   ├── App.jsx            # Root React component  
│   └── main.jsx           # Entry point  
├── .gitignore            # Specifies files to ignore in Git  
├── eslint.config.js      # ESLint configuration  
├── index.html            # Base HTML template  
├── package.json          # Project metadata & dependencies  
├── package-lock.json     # Exact dependency versions  
├── README.md             # Project documentation  
└── vite.config.js        # Vite configuration  
```

---

## **🚀 Getting Started**  

### **Prerequisites**  
- Node.js (v16+)  
- npm / yarn / pnpm  

### **Installation**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/your-username/FRESHBEEF.git
   ```
2. Navigate to the project directory:  
   ```sh
   cd FRESHBEEF
   ```
3. Install dependencies:  
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
4. Menjalankan JSON server
  ```sh
  npx json-server --watch src/api/data.json --port 3001
   ```

### **Running the App**  
- **Development Mode** (Hot Reload):  
  ```sh
  npm run dev
  ```
- **Production Build**:  
  ```sh
  npm run build
  ```
- **Preview Production Build**:  
  ```sh
  npm run preview
  ```

---

## **🛠️ Development Guide**  

### **Key Scripts**  
| Command | Description |  
|---------|-------------|  
| `npm run dev` | Starts Vite dev server |  
| `npm run build` | Builds for production |  
| `npm run preview` | Locally previews production build |  
| `npm run lint` | Runs ESLint for code quality checks |  

### **Adding a New Page**  
1. Create a new `.jsx` file in `src/pages/`.  
2. Import and use it in the router (if applicable).  

### **Adding a New Component**  
1. Create a new `.jsx` file in `src/components/`.  
2. Import and use it in the desired page/component.  

### **API Integration**  
- Place API-related functions in `src/api/`.  
- Use `fetch`/`axios` for HTTP requests.  

---

## **🔧 Tools & Configurations**  

### **Vite**  
- Config file: `vite.config.js`  
- Features:  
  - Fast HMR (Hot Module Replacement)  
  - Optimized production builds  

### **ESLint**  
- Config file: `eslint.config.js`  
- Ensures consistent code style  

### **Git Ignore**  
- `node_modules/` and build artifacts are excluded.  

---

## **📜 License**  
Specify your project's license (e.g., MIT, Apache 2.0).  

---

## **📝 Contribution Guidelines**  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature/your-feature`).  
3. Commit changes (`git commit -m "Add feature"`).  
4. Push to the branch (`git push origin feature/your-feature`).  
5. Open a **Pull Request**.  

---

###  Endpoint Machine Learning   
 ```sh
https://web-production-049b.up.railway.app
 ```
*description:*
	Endpoint Machine Learning untuk melakukan prediksi gambar daging (misalnya: segar atau tidak).
---

###  Endpoint Backend API 
 ```sh
https://backend-meatwatch-production.up.railway.app
 ```
*description:*
	Endpoint REST API untuk mengambil riwayat klasifikasi atau menyimpan hasil klasifikasi ke database dan mengambil data.
---




### **📌 Note**  
- Update `README.md` with project-specific details (e.g., purpose, screenshots).  
- Include environment variables (if any) in a `.env.example` file.  

Would you like me to refine any section or add more details? 😊

