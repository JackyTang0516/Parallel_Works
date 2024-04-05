# Parallel_Works
Parallel Works Software Engineering Test

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
- The server will be running at http://localhost:3000.

## Usage

- Retrieve Data: Send a GET request to /api/users to retrieve all users.

- Save Data: Send a POST request to /api/users with a JSON payload to save a new user. 

## Stopping the Project

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