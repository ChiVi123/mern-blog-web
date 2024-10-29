# Blog Application

Build Blog Application shared tips or tutorial ReactJs Redux Typescript, v.v.

Authenticated with JWT and Google OAuth.

## MERN Stack

Link web: [demo](https://mern-blog-web-q1bu.onrender.com/)

## Version

- node: v20.14.0
- npm: 10.9.0

## Front end

- Vite (ReactJs Typescript).
- Fetch api by Axios.
- Redux toolkit and Async thunk for manage state.
- Tailwindcss (toggle theme).

## Back end

- NodeJs (ExpressJs Typescript)
- Mongoose

## Feautre

### Guest 

Read, Search post

### User

- Sign (up, in, out): **register** account's app or continue with google
- Comment: **CRUD** and toggle like comment

### Admin

Each admin can only manage posts that they themselves have created.

- Management post: **CRUD**
- Management comment: **CRUD**
- Management user (account not admin): **CRUD**
- View Statistics: user activity, post popularity, and engagement metrics.

## Installation

Download file.zip or clone my-project


```bash
  git clone https://github.com/ChiVi123/mern-blog-web.git
  cd my-project
```

### Set up for FE and BE

**1. Setting Up the Backend:**

1.1 Create file .env with variables:

```bash
  PORT = <your_port>
  MONGODB_URI = <your_mongodb_connection_string>
  JWT_SECRET = <your_jwt_secret>
```

I'm not set port default, you must set PORT

1.2 Install and run dev mode
```bash
    npm i
    npm run dev
```

**2. Setting Up the Frontend:**

1.1 Move to folder name user-client

```bash
    cd user-client
```

1.2 Create file .env with variables:

```bash
  VITE_API_KEY =
  VITE_APP_ID =
  VITE_AUTH_DOMAIN =
  VITE_MESSAGING_SENDER_ID =
  VITE_PROJECT_ID =
  VITE_STORAGE_BUCKET =
```

All variables's front end is config firebase. Create project in firebase console and past them.

1.3 Install and run dev mode
```bash
    npm i
    npm run dev
```

## Support

For any inquiries or support, please feel free to contact me via email at nguyenhoangchivi@gmail.com (Nguyễn Hoàng Chí Vĩ)
