Backend:
	node server.js

Frontend:
	npm install
	npm start

RabitMQ:
	docker run -d --hostname my-rabbit --name rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
	cd backend

	node chatServer.js

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
