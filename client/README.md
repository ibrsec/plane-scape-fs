<a name="readme-top"></a>
 
 
<!-- PROJECT LOGO -->
<br />
<div align="center">
   
  <a href="https://github.com/ibrsec/plane-scape-fs/tree/main/client">
    <img src="./public/logo.png" alt="Logo" width="250"   >
  </a>

  <h3 align="center">Front end of the Full stack Plane Scape App</h3>

  <p align="center">
    An awesome Full stack Plane Scape App
    <!-- <a href="https://github.com/ibrsec/stock-app"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <a href="https://plane-scape-fs.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/ibrsec/plane-scape-fs">Full project Repo</a>
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

[![plane-scape-fs](./public/project.gif)](https://plane-scape-fs.onrender.com/)
[![plane-scape-fs](./public/project2.gif)](https://plane-scape-fs.onrender.com/)




<p align="right">(<a href="#readme-top">back to top</a>)</p>


---

<!-- ## Figma 

<a href="https://www.figma.com/file/ePyCHKsx2ODB32uLgyUEEd/bootstrap-home-page?type=design&node-id=0%3A1&mode=design&t=edDzadCB9Ev5FS1a-1">Figma Link</a>  

  <p align="right">(<a href="#readme-top">back to top</a>)</p>




--- -->
<a name="overview"></a>
## 👀 Overview

📦 Frontend of the my [plane-scape-fs](https://github.com/ibrsec/plane-scape-fs) project </br></br>


<b>Explanations:</b> </br>



🚩 Since the project is deployed on render.com  using the free tier, it may occasionally enter sleep mode, which can result in a longer initial loading time.

🚩 Flights are fetched from the Schiphol API on the backend.

🚩 On the homepage, flights are listed with pagination. Filters for date, flight direction, and sorting are applied.

🚩 Users can view detailed flight information by clicking the "Check Details" button.

🚩 Each flight card displays the flight status and flight direction. Hovering over the flight status provides a description.

🚩 Users can book a flight by clicking the "Book" button, which opens a modal where they can select the flight class.

🚩 After logging in, users can book flights and view their booked flights on the "My Flights" page.

🚩 Bookings are saved to MongoDB with my backend (Express.js).

🚩 When a user books a flight, an email is sent to them via Nodemailer.

🚩 When saving bookings, I also store the airline and destination information, allowing users to search for flights on the "My Flights" page using these fields.

🚩 The "My Flights" page displays all flight information, and like the homepage, there is a "Flight Details" modal accessible via a button.

🚩 Users can delete their bookings by clicking the "Delete" button.

🚩 All screens have been optimized for responsive design.

---

<b>FRONTEND:</b> </br>

🎯 React Development: Built an intuitive flight booking interface using React.js to provide a seamless and user-friendly experience for travelers.

🛠 State Management: Utilized Redux Toolkit and Persist to manage flight data, bookings, and user preferences efficiently.

🚀 React Router: Integrated React Router to allow users to navigate smoothly between flight search, booking, and profile pages.

🔔 User Notifications: Implemented real-time notifications using React Toastify to keep users informed of flight bookings, cancellations, and status updates.

🔍 Search Functionality: Developed advanced search features enabling users to filter flights by date, destination, airline, and price range.

📷 Document Upload: Supported the upload of documents like ID cards and passports for a streamlined check-in process.

🎨 UI Design: Designed a clean and responsive user interface using Tailwind CSS, ensuring a consistent experience across devices.


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


<!-- ## 🐞 Debug

![plane-scape-fs.gif](/plane-scape-fs.gif) -->








<a name="directory-structure"></a>
## 📂 Directory structure 

```diff
+ plane-scape-fs/client  (folder)   
|---client (folder)   
      |          
      |---public (folder) 
      |                
+         |---src (folder) 
      |     |---assests (folder) 
      |     |           
      |     |---pages (folder)       
      |     |           
      |     |---components (folder) 
      |     |    
      |     |---app (folder) ---store.jsx      
      |     |          
      |     |---features (folder) (slices and store)         
      |     |          
      |     |---router (folder)         
      |     |          
      |     |---services (folder)              
      |     |          
      |     |---helper (folder)          
      |     |          
      |     |---App.js 
      |     |---App.css 
      |     |---Index.js
      |     └---Index.css
      |      
      |----package.json 
      |----tailwind.config.js 
      └----readme.md 
        
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<a name="built-with"></a>
### 🏗️ Built With

 
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
 
