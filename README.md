# Z-Prefix App: Store Inventory Manager
A full-stack inventory management application built with React, Express, Knex, and PostgreSQL. This app allows managers to view, update, and delete items in their inventory. Visitors are able to view all items.

Created April 2025 by [Lorena Longoria](https://www.github.com/lorenalongoria)


## Acknowledgements

  - [DummyJSON API](https://dummyjson.com/)
 - [README Editor](https://readme.so/editor)
## Run Locally

### 1. Fork and Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/z-prefix-app.git
cd z-prefix-app
```

### 2. Setup the Backend
```bash
cd server
npm install
```

#### Configure Your Database
Make sure PostgreSQL is installed and running.

Create a new database and update `server/knexfile.js` if needed:
```js
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/your_database_name',
  }
};
```

Then run the migrations and seeds:
```bash
npx knex migrate:latest
npx knex seed:run
```

Start the server:
```bash
node server.js
```
Server runs on: `http://localhost:3001`

### 3. Setup the Frontend
```bash
cd ../client
npm install
```

Start the development server:
```bash
npm run dev
```
Client runs on: `http://localhost:5173`

> Note: The frontend uses a Vite proxy to handle API calls to port 3001.

## Entity Relationship Diagram

![ERD](https://github.com/user-attachments/assets/ff6f18ab-c456-40ef-b42c-942fe330c395)
