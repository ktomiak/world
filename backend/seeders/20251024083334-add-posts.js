export async function up(queryInterface, Sequelize) {
  // Pobieramy użytkowników z bazy
  const users = await queryInterface.sequelize.query(
    `SELECT id, username FROM Users;`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  const posts = [];

  users.forEach(user => {
    posts.push(
      {
        title: `Pierwszy post ${user.username}`,
        content: `Treść pierwszego posta użytkownika ${user.username}`,
        userId: user.id,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: `Drugi post ${user.username}`,
        content: `Treść drugiego posta użytkownika ${user.username}`,
        userId: user.id,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: `Trzeci post ${user.username}`,
        content: `Treść trzeciego posta użytkownika ${user.username}`,
        userId: user.id,
        isDeleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
  });

  await queryInterface.bulkInsert('Posts', posts, {});
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Posts', null, {});
}
