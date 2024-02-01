# First project with Node.js

> #### Description

This project aims to learn how to create a server, add users, and implement other functionalities.

> #### Ideas

- [x] Create a server
- [x] Create a user
- [x] Save the users to a JSON file
- [ ] The user cannot register with a duplicate email
- [ ] Encrypt password
- [ ] Create tests

> #### Doubts

- [x] How to save in JSON format correctly in user-data.json ?

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
pnpm i vitest -D
pnpm i @vitest/ui -D
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
    "id": "eb0ce556-c4b6-4719-afe9-6d69d4c7c5bf",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "123456"
  },
  {
    "id": "06f7d4a2-7f40-41b8-87fd-6604649558b4",
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "password": "123456"
  }
]
```

# Websites

> [HTTP Request Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

> [Learn Node](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
