# Node.js REST API Server
This project is a REST API server built with Express.js that allows users to interact with a MongoDB database. The MongoDB database runs in a Docker container, and Terraform is used to manage the container. The server supports GET and POST requests to retrieve and save data.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Terraform](https://www.terraform.io/)

## Installation

### 1. Clone the Repository:
```
git clone https://github.com/JackyTang0516/Parallel_Works.git
```
```
cd Parallel_Works
```
### 2. Install Node.js Dependencies:
```
npm install
```
### 3. Initialize Terraform:
- Navigate to the terraform directory and initialize Terraform:
```
cd terraform
```
```
terraform init
```
## Running the Project

### 1. Start the MongoDB Container:
- Apply the Terraform configuration to start the MongoDB container:
```
terraform apply
```
### 2. Start the Express.js Server:
- Navigate back to the project root directory and start the server:
```
cd ..
```
```
npm start
```
- The server will be running at http://localhost:3000
- The Mongodb will be running at mongodb:localhost:27017 or mongodb:0.0.0.0:27018

## Usage:

- Retrieve Data: Send a GET request to /api/users to retrieve all users.

- Save Data: Send a POST request to /api/users with a JSON payload to save a new user. The data is stored on the host machine at /Users/jackytang/mongo-data, which ensures that the data persists even if the container is stopped or removed.

## Stopping the Project:

### 1. Stop the Express.js Server:
- Press Ctrl + C in the terminal where the server is running.

### 2. Stop the MongoDB Container:
- Navigate to the terraform directory and destroy the Terraform-managed resources:
```
cd terraform
```
```
terraform destroy
```

## Postman Testing:
### 1. POST/users
- http://localhost:3000/api/users
- {
  "username": "user123",
  "password": "password123"
  }
### 2. GET/users
- http://localhost:3000/api/users
### 3. GET/status
- http://localhost:3000/api/status

## Helpful commands:

```
lsof -iTCP -sTCP:LISTEN -n -P | grep <port_number>
```
```
docker run --name my-mongo -d -p <internal_port>: <external_port> mongo:latest
```
```
docker pull mongo:latest
```



