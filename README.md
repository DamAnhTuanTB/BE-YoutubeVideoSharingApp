# **Youtube Video Sharing App**
### **1. Introduce**
This project is a web application built using ReactJS in front-end and NestJS in back-end
##### Purpose
The main purpose of the project is to help users store video links taken from YouTube into their own system. Thereby, helping users easily manage and review the videos they have shared.
##### Key features
- ***User registraion and login***: Users can register/log in to become a member of the system. Once you have become an official member, users can use the Sharing YouTube videos.
- ***Sharing YouTube videos***: Users only need to provide us with the video link on YouTube. We will help them store that video on our system.
- ***Viewing a list of shared videos***: Users can view a list of videos that have been successfully shared by themselves or other members in the system.

### **2. Main Technology Used**
+ **NestJS**: NestJS is a backend framework for building efficient and scalable server-side applications using TypeScript. It offers the benefits of modularity and robustness. 
+ **MongoDB**: MongoDB is a NoSQL database that provides flexibility and scalability for storing, retrieving, and managing data in a document-oriented format, offering advantages like ease of development and horizontal scaling.
+ **NestJS Testing (@nestjs/testing)**: This is a testing module in NestJS that allows for unit and integration testing of NestJS applications, helping ensure code reliability and maintainability.
### **3. Instructions For Installing And Running The Project Locally**
> **Prerequisites**: Before you begin, make sure you have the following technologies installed on your personal computer: git, node.js. npm

-  Download the project to your personal computer:
```bash
git clone https://github.com/DamAnhTuanTB/BE-YoutubeVideoSharingApp.git
```
- Open the downloaded project using ide software, type the following command to install the necessary packages:
```bash
npm install
```
- Install MongoDB: You need to install MongoDB on your computer. Visit MongoDB's official site (https://www.mongodb.com/try/download/community) to download the MongoDB Community Edition suitable for your operating system and install it.
- Install Mongoose: Mongoose is a popular ODM (Object Data Modeling) for MongoDB that helps you interact with MongoDB database easily in NestJS. You can install Mongoose with the following command:
```bash
npm install --save @nestjs/mongoose mongoose
```
- Run the project locally using the command below. After, you can access http://localhost:9090/api to view the project's api documentation (Swagger)
```bash
npm run start:dev
```
- If you want to test the project locally, run the following command:
```bash
npm run test
```
- To view MongoDB database online, you can download and install MongoDB Compass from the official MongoDB site (https://www.mongodb.com/try/download/compass). MongoDB Compass is a mainstream MongoDB database management application from MongoDB itself. Then, open MongoDB Compass and embed the following link to view the system's database.
```base
mongodb+srv://damanhtuan24022000:damanhtuan24022000@cluster1.zxnza45.mongodb.net/youtube_video_sharing_app_database?retryWrites=true&w=majority
```
### **4. Online Link To Use**
In addition to using the system locally as in part 3, you can access the following link to use the apis https://be-youtube-video-sharing-app.vercel.app
### **5. Detailed Instructions On How To Use The APIs**
##### Register
- To become an official member of the system, users must provide a valid email and password. Email must be unique and has not been used to register into the system before.
~~~
Url: https://be-youtube-video-sharing-app.vercel.app/api/auth/register
Method: POST
Body Example: 
{
    email: 'userexample@gmail.com',
    password: '123456'
}
~~~
##### Log in
- Must log in with an account that has been successfully created before. Provide correct email and password to successfully log in to the system. 
~~~
Url: https://be-youtube-video-sharing-app.vercel.app/api/auth/login
Method: POST
Body Example: 
{
    email: 'userexample@gmail.com',
    password: '123456'
}
~~~
##### Get info user
- Get user details after successful login
~~~
Url: https://be-youtube-video-sharing-app.vercel.app/api/user
Method: GET
~~~
##### Get the YouTube video embed link from the video link provided
- The API helps get accurate the YouTube video embed link from the video link provided by the user. If the path provided is incorrect an error will be received.
~~~
Url: https://be-youtube-video-sharing-app.vercel.app/api/video/info?url=your_url_video
Method: GET
~~~
##### Share a video
- The API helps store the YouTube video embed link and information accompanying the user's video into the system. the YouTube video embed link stored in this api is the output of the api Get the YouTube video embed link from the video link provided.
~~~
Url: https://be-youtube-video-sharing-app.vercel.app/api/video
Method: POST
Body: 
{
    url: 'https://www.youtube.com/embed/niPkap1ozUA?si=gRksT8JQ6P6H45b0',
    title: 'A Song of Son Tung',
    description: 'Very good'
}
~~~

##### Viewing a list of shared videos
- Users can view a list of videos that have been successfully shared by themselves or other members.
- No need to log in to still access this feature.
```
Url: https://be-youtube-video-sharing-app.vercel.app/api/video?page=your_page
Method: GET
```
### **6. Troubleshooting**
- If you are having trouble about the apis or database, please make sure you have the best network connection.
- If you run local the project with problems, please make sure your computer has the latest node.js installed. You also need to make sure you have the .env file set up with the correct values.
