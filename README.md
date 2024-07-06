# Moleculer.js Microservices

This project demonstrates a microservices architecture using Moleculer.js, a fast and powerful microservices framework for Node.js. It showcases how to create and connect multiple services, implement API gateways, and interact with a SQLite database.

## Project Structure

The project consists of two main microservices:

1. Auth Service
2. User Service

Both services are independent and communicate through the Moleculer broker.

## Services

### 1. Auth Service

**Port**: 3001
**Base URL**: `http://localhost:3001/api/auth`

#### Endpoints:

1. **Login**

   - Method: POST
   - Path: `/login`
   - Action: `auth.login`

2. **Verify Token**
   - Method: POST
   - Path: `/verify`
   - Action: `auth.verify`

### 2. User Service

**Port**: 3000
**Base URL**: `http://localhost:3000/api`

#### Endpoints:

1. **Register User**

   - Method: POST
   - Path: `/user`
   - Action: `user.registerUser`

2. **Get All Users**

   - Method: GET
   - Path: `/user`
   - Action: `user.getAllUsers`

3. **Get User by ID**

   - Method: GET
   - Path: `/user/:id`
   - Action: `user.getUser`

4. **Remove User**
   - Method: DELETE
   - Path: `/user/:id`
   - Action: `user.removeUser`

## Moleculer.js Features Demonstrated

1. **Service Creation**: Each service is created using `broker.createService()`.
2. **Action Definition**: Actions are defined within each service, representing the service's capabilities.
3. **API Gateway**: Moleculer-web is used to create API gateways for each service.
4. **Inter-service Communication**: The Auth service calls the User service to validate credentials.
5. **Param Validation**: Action parameters are validated using Moleculer's built-in validator.

## Database Integration

- SQLite3 is used as the database.
- Database operations are performed within service actions.
- SQL queries are separated into a `queries.js` file for better organization.

## Starting the Application

The application is started from `index.js`, which initializes the Moleculer broker and starts all services.
