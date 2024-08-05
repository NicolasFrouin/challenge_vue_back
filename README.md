# Challegne Vue - Back

## Requirements

- [Node.js](https://nodejs.org/en) >= 21
- A package manager :
  - [NPM](https://www.npmjs.com/) >= 8.1
  - [Yarn](https://yarnpkg.com/) >= 1.22
  - [pnpm](https://pnpm.io/) >= 6.0
- [PostgreSQL](https://www.postgresql.org/) >= 16
- [MongoDB](https://www.mongodb.com/fr-fr) >= 7

---

- [Docker](https://www.docker.com/) >= 20.10

## Instalation

```bash
cp .env.example .env
npm install # OR yarn install OR pnpm install
npm run dev # OR yarn dev OR pnpm dev
```

To run the project in a container, you can directly use :

```bash
Après avoir fait les premières commandes qui sont cp.env.example .env et npm install et npm run dev, faite docker-compose up et lorsque vous aurez tout le docker etc qui seront lancer vous aurez juste
à faire npm test pour lancer les test se trouvant dans le fichier test du projet
docker-compose up
```
