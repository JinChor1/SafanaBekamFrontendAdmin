<div align="center">
  <h1>Safana Bekam Admin Site</h1>
  <p>
    Admin CMS Site for Safana Bekam System
  </p>

<p>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/JinChor1/SafanaBekamFrontendAdmin" alt="watchers" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/watchers/JinChor1/SafanaBekamFrontendAdmin" alt="last update" />
  </a>
</p>

<a href="https://safanabekam-admin.onrender.com/">View Demo</a>

</div>

<!-- Screenshot -->
## 📸: Screenshot


### Dashboard
![image](https://github.com/JinChor1/SafanaBekamFrontendAdmin/assets/136385395/e7916b09-de10-4c84-a9ee-7e4c081a6086)

### Calendar
![image](https://github.com/JinChor1/SafanaBekamFrontendAdmin/assets/136385395/045c9aeb-63d6-437e-8226-5876a3026d72)

### Human Body Map
![image](https://github.com/JinChor1/SafanaBekamFrontendAdmin/assets/136385395/a65878b6-80c1-4207-8bfd-fa04f052d095)


<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Run Locally -->
### :running: Run Locally or Remotely

Clone the project

```bash
  git clone https://github.com/JinChor1/SafanaBekamFrontendAdmin.git
```

Go to the project directory

```bash
  cd project-directory
```

Install dependencies

```bash
  npm install
```

Change api domain name

1. Go to src/hooks/ueseAuthAPI.js
2. Go to line 33
```bash
  const response = await fetch(`https://safanabekam-backend.onrender.com${req.apiRoute}`, {
```
3. Change route
  - Local
  ```bash
    const response = await fetch(`${req.apiRoute}`, {
  ```
  - Remote
  ```bash
    const response = await fetch(`[your hosting domain]${req.apiRoute}`, {
  ```

4. Do the same in
   - src/hooks/useLogIn.js

Run 
```bash
  npm start
```

<!-- To Do -->
## 	🔨: To Do

- environment variable for API route
