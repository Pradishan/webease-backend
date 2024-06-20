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

method = POST

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

method = POST

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

method = POST

Sample Request Body

```
{
    "username" :"pradishan",
    "password" :"XXXXXX"
}
```

#### Logout

### `http://localhost:5000/api/auth/logout`

method = POST

#### Get Logged user

### `http://localhost:5000/api/auth/loggedUser`

method = GET

#### Get All User

### `http://localhost:5000/api/users/`

method = GET

### Message APIs

#### Send Message to a user

### `http://localhost:5000/api/message/send/:id`

method = POST

Sample Request Body

```
{
   "message":"hi.."
}
```

#### Get Messages to a user

### `http://localhost:5000/api/message/:id`

method = GET

### Category APIs

#### get all Categories

### `http://localhost:5000/api/category/`

method = GET

#### get Category by id

### `http://localhost:5000/api/category/:id`

method = GET

#### create Category

### `http://localhost:5000/api/category/`

method = POST

Sample Request Body

```
{
    "name": "web design",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  "
}
```
#### update Category

### `http://localhost:5000/api/category/:id`

method = PUT

Sample Request Body

```
{
    "name": "web design",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  "
}
```
#### delete Category

### `http://localhost:5000/api/category/:id`

method = DELETE

### subCategory APIs

#### get all subCategories

### `http://localhost:5000/api/category/sub`

method = GET

#### get all subCategories by categoryID

### `http://localhost:5000/api/category/:categoryID/sub`

method = GET

#### get subCategory by id

### `http://localhost:5000/api/category/sub/:id`

method = GET

#### create Category

### `http://localhost:5000/api/category/:categoryID/sub`

method = POST

Sample Request Body

```
{
    "name": "web design",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  "
}
```
#### update Category

### `http://localhost:5000/api/category/sub/:id`

method = PUT

Sample Request Body

```
{
    "name": "web design",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  "
}
```
#### delete Category

### `http://localhost:5000/api/category/sub/:id`

method = DELETE


