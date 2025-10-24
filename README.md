Backend
node server.js

Frontend
npm install
npm start

Migracje:

npm run db:migrate

Cofanie ostatniej migracji:

npm run db:migrate:undo

Nowa Migracja:

npx sequelize-cli migration:generate --name <nazwa>

Seedy / fixtury:

npm run db:seed

Cofanie wszystkich seedów:

npm run db:seed:undo

Nowy Seed:

npx sequelize-cli seed:generate --name <nazwa>
