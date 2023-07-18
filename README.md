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

<h4><a href="https://safanabekam-admin.onrender.com/">View Demo</a></h4>
<i>Note that hosted site might be slow on booting up due to server spindown.</i>
</div>

<!-- Screenshot -->
## 📸: Screenshot


### Dashboard
![image](https://github.com/JinChor1/SafanaBekamFrontendAdmin/assets/136385395/65aa95ba-7c94-4744-af92-5fa8dd94bb26)

### Calendar
![image](https://github.com/JinChor1/SafanaBekamFrontendAdmin/assets/136385395/f888ec18-b83b-4d05-b46a-91233e0b433e)

### Human Body Map
![image](https://github.com/JinChor1/SafanaBekamFrontendAdmin/assets/136385395/5c59bdd0-2f47-40c4-b02f-5db6156d14cb)


<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

Set up backend service using [this repo](https://github.com/JinChor1/SafanaBekamBackend)

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
