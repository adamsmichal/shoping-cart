## Todo

- Install joi and add validation
- Finish Cart busines logic
- Add S3 clinet, save photo and store photo link in DB
- Install jest and add tests
- Add two middlewares:
  - Auth middleware to check and validate JWT
  - Checking if the basket belongs to the user

## Getting started

- Clone this repository:

```
git clone https://github.com/des1ro/party_app.git
```

- Install dependencies

```
npm install
```

- Create .env

```
cp .env.example .env
```

- Start docker and app

```
npm run dev
```

- Backend works on 8080
  <a href="http://localhost:8080/health">http://localhost:8080/health</a>

- Postgress works on 5432

- You can check your db by prisma studio

```
npx prisma studio
```
