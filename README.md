

<a name="readme-top"></a>
 
 
<!-- PROJECT LOGO -->
<br />
<div align="center">
   
  <a href="https://github.com/ibrsec/plane-scape-fs">
    <img src="./client/public/logo-text.png" alt="Logo" width="250"   >
  </a>

  <h3 align="center">Full stack Plane Scape App</h3>

  <p align="center">
    An awesome Full-stack Flight Booking App
    <!-- <a href="https://github.com/ibrsec/stock-app"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <a href="https://plane-scape-fs.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/ibrsec/plane-scape-fs/tree/main/client">Frontend Repo</a>
    ·
    <a href="https://plane-scape-fs.onrender.com/api/documents/swagger">Backend Swagger</a>
    ·
    <a href="https://plane-scape-fs.onrender.com/api/documents/redoc">Backend Redoc</a>
    ·
    <a href="https://github.com/ibrsec/plane-scape-fs/issues">Report Bug</a>
    ·
    <a href="https://github.com/ibrsec/plane-scape-fs/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>📎 Table of Contents 📎 </summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
     <!-- <li><a href="#figma">Figma</a></li> -->
     <li><a href="#overview">Overview</a></li>
     <li><a href="#quick-setup">Quick Setup</a></li>
     <li><a href="#directory-structure">Directory structure</a></li>
     <li><a href="#built-with">Built With</a></li>
    <!-- <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li> -->

    
  </ol>
</details>





---

<!-- ABOUT THE PROJECT -->
<a name="about-the-project"></a>
## ℹ️ About The Project

[![plane-scape](./client/public/project.gif)](https://plane-scape-fs.onrender.com/) 
[![plane-scape](./client/public/project2.gif)](https://plane-scape-fs.onrender.com/) 
---
<b>ERD:</b>
[![stock-app-erd](./erd.png)](https://plane-scape-fs.onrender.com/)




<p align="right">(<a href="#readme-top">back to top</a>)</p>


---
 




<a name="overview"></a>
## 👀 Overview

📦 A Fullstack Plane Scape Project</br>
🏀 [Frontend Live](https://plane-scape-fs.onrender.com/) || [Backend Swagger](https://plane-scape-fs.onrender.com//api/documents/swagger) </br></br>
FRONTEND:</br>
🎯 <b>React Development:</b> Built a responsive frontend with React.js, delivering a seamless user experience.</br>

🛠 <b>State Management:</b> Utilized Redux Toolkit and Persist for consistent state management across sessions.</br>

🚀 <b>React Router:</b> Integrated React Router for smooth navigation between key sections like dashboard, products, and sales.</br>

📊 <b>UI Components:</b> Employed Material UI's DataGrid and Charts for interactive tables and data visualizations.</br>

📝 <b>Form Validation:</b> Managed forms with Formik and Yup for accurate data input and validation.</br>

🔔 <b>User Notifications:</b> Added real-time feedback using Toastify for actions like adding or editing records.</br>

💾 <b>CRUD Operations:</b> Implemented full CRUD functionality for products, sales, firms, and more.</br>

🃏 <b>Card Layouts:</b> Designed intuitive card-based interfaces for managing firms and brands.</br>

📊 <b>Data Tables:</b> Organized stock information in editable tables for easy data management.
</br></br>
BACKEND:</br>
<b>🎯 Express.js Framework:</b> Developed a robust RESTful API with Express.js for secure and efficient stock data management.

<b>🔒 Authentication & Authorization:</b> Implemented Simple Token, JWT for secure user authentication.

<b>📄 API Documentation:</b> Created clear API docs with Swagger and Redoc for easy testing and understanding.

<b>📊 Database Management:</b> Utilized MongoDB and Mongoose for consistent data modeling and querying.

<b>🔄 CRUD Operations:</b> Built full CRUD functionality for products, sales, purchases, firms, and brands.

<b>🛠 Middleware & Error Handling:</b> Added custom middleware for validation and consistent error handling.

<b>🌐 Scalable Deployment:</b> Deployed on scalable platforms like Netlify and Vercel for high availability.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="quick-setup"></a>
## 🛫 Quick Setup

```sh
# clone the project
git clone https://github.com/ibrsec/plane-scape-fs.git

# enter the project directory
cd plane-scape-fs

# set the .env file to the root of the project
# .env-sample is exist on the project
.env 



# install dependency
# linux
npm run setup-production
# windows
npm run setup-production-windows

# run
node index.js

#Land on
http://localhost:10000 from browser

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


 







<a name="directory-structure"></a>
## 📂 Directory structure 

```diff
+ plane-scape-fs  (folder)  
      |---client (folder)   
      |      |          
      |      |---public (folder) 
      |      |                
+     |      |---src (folder) 
      |      |     |---assests (folder) 
      |      |     |           
      |      |     |---pages (folder)       
      |      |     |           
      |      |     |---components (folder) 
      |      |     |    
      |      |     |---app (folder) ---store.jsx      
      |      |     |          
      |      |     |---features (folder) (slices and store)         
      |      |     |          
      |      |     |---router (folder)         
      |      |     |          
      |      |     |---services (folder)              
      |      |     |          
      |      |     |---helper (folder)          
      |      |     |          
      |      |     |---App.js 
      |      |     |---App.css 
      |      |     |---Index.js
      |      |     └---Index.css
      |      |      
      |      |----package.json 
      |      |----tailwind.config.js 
      |      └----readme.md 
      |      
+     |---src (folder) 
      |     |---config (folder)       
      |     |           
      |     |---controllers (folder) 
      |     |    
      |     |---errors (folder) 
      |     |    
      |     |---helpers (folder)      
      |     |          
      |     |---middlewares (folder)      
      |     |          
      |     |---models (folder)           
      |     |          
      |     └---routes (folder)  
      |      
      |----.env
      |----.gitignore
      |----index.js
      |----package-lock.json
      |----package.json
      |----swaggerAutogen.js
      └----readme.md 
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a name="built-with"></a>
### 🏗️ Built With
<b>Frontend</b>
 
<!-- https://dev.to/envoy_/150-badges-for-github-pnk  search skills-->

 <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
 <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white&color=red"> 
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">  
 <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> 
 <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"> 

 <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"> 
 <img src="https://img.shields.io/badge/Redux Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white"> 
 <img src="https://img.shields.io/badge/Redux--Persist -593D88?style=for-the-badge&logo=redux&logoColor=white">  

 <img src="https://img.shields.io/badge/Axios-593D88?style=for-the-badge&logo=axios&logoColor=white"> 
 <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> 
 
 <img src="https://img.shields.io/badge/Toastify-45CC11?style=for-the-badge&logo=toastify-ui&logoColor=white"> 
 


---

<b>Backend</b>
<!-- https://dev.to/envoy_/150-badges-for-github-pnk  search skills-->


 <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> 
 <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"> 
 <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> 
 <img src="https://img.shields.io/badge/Mongoose-4EA94B?style=for-the-badge&logo=mongoose&logoColor=white"> 
 <img src="https://img.shields.io/badge/jwt%20token-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"> 
 <img src="https://img.shields.io/badge/Token%20authentication-000000?style=for-the-badge&logo=token&logoColor=white">  

<!-- swagger -->
 <img src="https://img.shields.io/badge/Swagger%20Autogen-4EA94B?style=for-the-badge&logo=swagger&logoColor=white"> 
 <img src="https://img.shields.io/badge/Swagger%20ui%20express-4EA94B?style=for-the-badge&logo=swagger&logoColor=white">  

 <img src="https://img.shields.io/badge/Morgan-000000?style=for-the-badge&logo=morgan&logoColor=white"> 
 <img src="https://img.shields.io/badge/Express%20async%20errors-000000?style=for-the-badge&logo=expressasyncerrors&logoColor=white"> 
 <img src="https://img.shields.io/badge/dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white"> 
 <img src="https://img.shields.io/badge/cors-000000?style=for-the-badge&logo=cors&logoColor=white"> 
 

 <img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white"> 
 <img src="https://img.shields.io/badge/nodemailer-000000?style=for-the-badge&logo=nodemailer&logoColor=white"> 



 
<p align="right">(<a href="#readme-top">back to top</a>)</p>


