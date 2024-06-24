# <center> webease-backend </center>

## Available Scripts

you can run:

### `npm start`

> Run the app in the development mode.

### `npm run dev`

> Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

## Available Roles

### 1. Admin

### 2. User

## Available APIs

### Auth APIs

---

#### Register a new user

`http://localhost:5000/api/auth/signup`

    Method = POST

Sample Request Body

```json
{
  "username": "pradishan",
  "email": "pradishan@user.com",
  "password": "XXXXXX",
  "gender": "male", // male or female
  "confirmPassword": "XXXXXX",
  "phone": "+941231393",
  "address": "Nuwara Eliya,Srilanka."
}
```

#### Register a new Admin

`http://localhost:5000/api/auth/signup`

    Method = POST

Sample Request Body

```json
{
    "username" :"pradishan",
    "email" :"pradishan@admin.com",
    "password" :"XXXXXX",
    "gender" :"male", // male or female
    "confirmPassword" :"XXXXXX"
    "role":"admin", // admin
    "phone":"+941231393",
    "address":"Nuwara Eliya,Srilanka."
}
```

#### Login

`http://localhost:5000/api/auth/login`

    Method = POST

Sample Request Body

```json
{
  "username": "pradishan",
  "password": "XXXXXX"
}
```

#### Logout

`http://localhost:5000/api/auth/logout`

    Method = POST

#### Get Logged user

`http://localhost:5000/api/auth/loggedUser`

    Method = GET

#### Get All User

`http://localhost:5000/api/users/`

    Method = GET

### Message APIs

---

#### Send Message to a user

`http://localhost:5000/api/message/send/:id`

    Method = POST

Sample Request Body

```json
{
  "message": "hi.."
}
```

#### Get Messages to a user

`http://localhost:5000/api/message/:id`

    Method = GET

### Category APIs

---

#### get all Categories

`http://localhost:5000/api/category/`

    Method = GET

#### get Category by id

`http://localhost:5000/api/category/:id`

    Method = GET

#### create Category

`http://localhost:5000/api/category/`

    Method = POST

Sample Request Body

```json
{
  "name": "web design",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  "
}
```

#### update Category

`http://localhost:5000/api/category/:id`

    Method = PUT

Sample Request Body

```json
{
  "name": "web design",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  "
}
```

#### delete Category

`http://localhost:5000/api/category/:id`

    Method = DELETE

### subCategory APIs

---

#### get all subCategories

`http://localhost:5000/api/category/sub`

    Method = GET

#### get all subCategories by categoryID

`http://localhost:5000/api/category/:categoryID/sub`

    Method = GET

#### get subCategory by id

`http://localhost:5000/api/category/sub/:id`

    Method = GET

#### create Category

`http://localhost:5000/api/category/:categoryID/sub`

    Method = POST

Sample Request Body

```json
{
  "name": "web design",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  "
}
```

#### update Category

`http://localhost:5000/api/category/sub/:id`

    Method = PUT

Sample Request Body

```json
{
  "name": "web design",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when  "
}
```

#### delete Category

`http://localhost:5000/api/category/sub/:id`

    Method = DELETE

### Order APIs

---

#### create order

`http://localhost:5000/api/order/`

    Method = POST

Sample Request Body

```json
{
  "categoryID": "asdsd123",
  "subCategoryID": "adad1232",
  "name": "pradishan",
  "purpose": "logo for web",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
  "colorTheme": "black",
  "images": [
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/"
  ],
  "files": ""
}
```

#### get all orders

`http://localhost:5000/api/order/`

    Method = GET

#### get all orders by clientID

`http://localhost:5000/api/order/client/:clientID`

    Method = GET

#### get order

`http://localhost:5000/api/order/:orderID`

    Method = GET

#### update order

`http://localhost:5000/api/order/:orderID`

    Method = PUT

Sample Request Body

```json
{
  "categoryID": "asdsd123",
  "subCategoryID": "adad1232",
  "name": "pradishan",
  "purpose": "logo for web",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
  "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
  "colorTheme": "black",
  "images": [
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/"
  ],
  "files": "",
  "status": "InProgress" //["InProgress", "UnderRevision","Completed","Cancelled","Delivered","Rejected","Pending","OnHold","Shipped","OutForDelivery","Returned","Refunded"]
}
```

#### delete order

`http://localhost:5000/api/order/:orderID`

    Method = DELETE

### Revision APIs

---

#### create revision

`http://localhost:5000/api/order/:orderID/revision`

    Method = POST

Sample Request Body

```json
{
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
  "images": [
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/"
  ],
  "files": [
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/"
  ]
}
```

#### get all revision

`http://localhost:5000/api/order/revision`

    Method = GET

#### get all revision by orderID

`http://localhost:5000/api/order/:orderID/revision`

    Method = GET

#### get all revision by clientID

`http://localhost:5000/api/order/revision/:clientID`

    Method = GET

#### get revision

`http://localhost:5000/api/order/:orderID/revision/:revisionID`

    Method = GET

#### update revision

`http://localhost:5000/api/order/:orderID/revision/:revisionID`

    Method = PUT

Sample Request Body

```json
{
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
  "images": [
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/"
  ],
  "files": [
    "http://localhost:5000/api/order/",
    "http://localhost:5000/api/order/"
  ],
  "status": "Accepted" //["Accepted","Pending","Rejected"],
}
```

#### delete revision

`http://localhost:5000/api/order/:orderID/revision/:revisionID`

    Method = DELETE

### FeedBack APIs

---

#### create FeedBack

`http://localhost:5000/api/feedBack/`

    Method = POST

Sample Request Body

```json
{
  "name": "", //optional
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ",
  "rating": "4" // ["0", "1", "2", "3", "4", "5"]
}
```

#### get all FeedBack

`http://localhost:5000/api/feedBack/`

    Method = GET

#### get all FeedBack by clientID

`http://localhost:5000/api/feedBack/client/:clientID`

    Method = GET

#### get FeedBack

`http://localhost:5000/api/feedBack/:id`

    Method = GET

#### update FeedBack

`http://localhost:5000/api/feedBack/:id`

    Method = PUT

Sample Request Body

```json
{
  "name": "", // optional
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ",
  "rating": "4", // ["0", "1", "2", "3", "4", "5"]
  "status": "Show" // ["Show", "Hide", "Pending"]
}
```

#### delete FeedBack

`http://localhost:5000/api/feedBack/:id`

    Method = DELETE
