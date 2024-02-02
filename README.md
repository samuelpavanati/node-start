# First project with Node.js

> #### Description

This project aims to learn how to create a server, add users, and implement other functionalities.

> #### Ideas

- [x] Create a server
- [x] Create a user
- [x] Save the users to a JSON file
- [ ] The user cannot register with a duplicate email
- [ ] Password hash
- [ ] Create tests
- [ ] Register users with Prisma
- [ ] Deploy no Render

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
pnpm i prisma -D
npx prisma init
npx prisma generate
pnpm i @prisma/client
docker run --name node-start-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=nodestart -p 5432:5432 bitnami/postgresql (for this command Docker Desktop needs to be open)
docker ps
docker start node-start-pg
docker logs node-start-pg -f
npx prisma migrate dev
npx prisma studio
docker stop node-start-pg
docker rm node-start-pg (to run with docker-compose)
docker compose up -d
docker compose stop (stop the container without deleting it)
docker compose down (remove all container data)
npx prisma migrate dev (to create the table in the database again, execute with each change)
npx prisma studio
npx prisma migrate deploy (only in production)
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
