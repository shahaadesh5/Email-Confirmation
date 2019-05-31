# Email-Confirmation using MEAN stack
A MEAN stack application to send email confirmation on creating an account and allowing user to log in only if email confirmation is done by clicking on the confirmation link received in their email

## Server side configurations:

Using Node.js and Express as a framework for the server along with MongoDB Atlas as the database. You can create a free cluster here - https://www.mongodb.com/cloud/atlas

Get MongoDB Atlas cluster credentials and connection string to be used for connecting with the app. Get details about it here - https://docs.atlas.mongodb.com/connect-to-cluster/#connect-to-a-cluster

For sending mail, we're using NodeMailer package. You can find the documentation for it over here - https://nodemailer.com/usage/

### Backend process

- Switch into backend folder and run 'npm install' command to install the required packages (express, mongoose, nodemailer etc.)
- Server runs on port 3000
- Get your MongoDB Atlas credentials and string and put it in app.js in the mongoose.connect method
- Input your email account credentials (GMAIL preferred) in api/routes/user.js file under the POST request.
- For running the server, run the command 'node server.js' inside the backend folder

## Frontend configurations:

We're using the following package:

- ngx-toastr for toast messages. Find the documentation here - https://www.npmjs.com/package/ngx-toastr

### Frontend process

- Switch to frontend folder and run 'npm install' command to install the required packages
- Client runs on port 4200
- For running the client, run the command 'ng serve' inside the frontend folder and view the applicaion in browser by vising http://localhost:4200

**Make sure both client (frontend) and server (backend) are running simultaneously**

**Note: This application does not save passwords in encrypted form. For real world projects or for practice please save passwords in encrypted form for security.**
