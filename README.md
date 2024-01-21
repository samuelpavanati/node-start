# First project with Node.js

> #### Description

This project aims to learn how to create a server, add users, and implement other functionalities.

> #### Ideas

- [x] Create a server
- [x] Create a user
- [ ] Save the users to a JSON file
- [ ] Register users with Prisma
- [ ] Create tests
- [ ] Create features for the user

> #### Doubts

- [ ] How to save in JSON format correctly in user-data.json ?

# Commands

```
pnpm init
pnpm i typescript @types/node tsx tsup -D
npx tsc --init
pnpm i fastify
pnpm i eslint -D
pnpm create @eslint/config
pnpm i @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
pnpm run lint
pnpm run dev
pnpm i zod
pnpm i @fastify/jwt
pnpm i dotenv
pnpm i @fastify/cookie
```

# Implementation

> User Format
```
User {
  id
  name
  email
  password
}
```

> JSON Format
```
[
  {
    "id": "fae14c3d-ba58-4031-ae1a-bbbf6b4a57ed",
    "name": "Samuel Pavanati",
    "email": "sampavanati@gmail.com",
    "password": "123456"
  },
  {
    "id": "fd0be0d3-935c-4e4a-91fe-d9a12b414c3e",
    "name": "Samuel Pavanati",
    "email": "sampavanati@gmail.com",
    "password": "123456"
  }
]
```

# Websites

> [HTTP Request Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

> [Learn Node](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
