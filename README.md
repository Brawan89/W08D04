# W08D04 
## Social media backend

###### It is a website, first create an account and then you can add a post and add comments and likes.

## To Start Project:

> We need to install these packages:

```
express
mongoose
bcrypt
dotenv
jsonwebtoken
nodemon
```

> Running server:

```
nodemon:
npm run dev
or
node:
npm start
```

## social media project:

> Schema

1. Role
    1. role: 
        - admin 
        - user
    2. permissions
        1. admin:
           - read
           - create
           - update
           - delete
        2. users:
           - read

2. User
    - userName
    - email
    - password
    - roleID
    - avatar
    - isDelete

3. Post 
    - img
    - dec
    - userID
    - isDel
    - timePost

4. Likes
    - like
    - userID
    - postID

5. Comments
    - comment
    - isDelete
    - userID
    - postID
    - timeComment

> Routes:

- GET
```
- get all rols 
- get all users
- get user by id
- get all post
- get post by id
- get posts in one user
```
- POST
```
- create Role
- Register
- login
- create Posts
- add Comment
- add like
```
- PUT
```
- update Post
- update Comment
```