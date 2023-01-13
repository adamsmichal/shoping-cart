<div align="center">
  <img width="512" src="https://raw.githubusercontent.com/adamsmichal/boilerplate_ts_node_prisma_docker/main/banner.png" alt="prisma-docker">
</div>

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
