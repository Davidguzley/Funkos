# Funkos Catalog System

![Funkos Catalog System](https://zebrands.mx/wp-content/uploads/2021/07/WEB-ZEB-05-1-1024x291.png)

**Author:** David Guzmán Leyva

## Description

This repository contains the code and documentation for the Funkos catalog system. The system allows admins to manage products and users, while anonymous users can browse and select items from the catalog. The application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Project Structure

The project is organized into two main directories:

- **project**: This directory contains the code for the Funkos catalog system. It follows the Model-View-Controller (MVC) architecture.

- **documentation**: This directory contains all the documentation and guidelines for working on the project. It provides information on the development process, coding standards, and best practices.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- JSON Web Token (JWT)
- Bootstrap

## Future Actions

- Add a deployment manual for the project on Digital Ocean to deploy the project remotely.

- Add a cart and paypal to buy products from the catalog directly from the application.

## Usage
- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Clone the repository to your local machine.
- Navigate to the `project` directory.

### Install Dependencies (frontend & backend)

```
cd server
npm install
```

```
cd client
npm install
```

### Env Variables

In the `server` directory, create a `.env` file and add the following environment variables

```
NODE_ENV=development
PORT=5000
MONGO_URI=your mongodb uri
SECRET='abc123'
```

Change the JWT_SECRET to what you want

## Run
Open two terminals and run "npm start" from the `server` and `client` folders.

```
cd server
npm start
```

```
cd client
npm start
```