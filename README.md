# webease-backend

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

### `npm run dev`

Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

## Available Roles

### 1. Admin

### 2. User

## Available APIs

### Auth APIs

#### Register a new user

### `http://localhost:5000/api/auth/signup`

Sample Request Body

```
{
    "username" :"pradishan",
    "email" :"pradishan@gmail.com",
    "password" :"XXXXXX",
    "gender" :"male",
    "confirmPassword" :"XXXXXX"
}
```

#### Register a new Admin

### `http://localhost:5000/api/auth/signup`

Sample Request Body

```
{
    "username" :"pradishan",
    "email" :"pradishan@gmail.com",
    "password" :"XXXXXX",
    "gender" :"male",
    "confirmPassword" :"XXXXXX"
    "role":"admin"
}
```

#### Login

### `http://localhost:5000/api/auth/login`

Sample Request Body

```
{
    "username" :"pradishan",
    "password" :"XXXXXX"
}
```

#### Logout

### `http://localhost:5000/api/auth/logout`

#### Get All User

### `http://localhost:5000/api/users/`
