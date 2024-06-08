# webease-backend

## Available Scripts

you can run:

### `npm start`

Run the app in the development mode.

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

#### Get Logged user

### `http://localhost:5000/api/auth/loggedUser`

#### Get All User

### `http://localhost:5000/api/users/`

### Message APIs

#### Send Message to a user

### `http://localhost:5000/api/message/send/:id`

Sample Request Body

```
{
   "message":"hi.."
}
```
#### Get Messages to a user

### `http://localhost:5000/api/message/:id`
