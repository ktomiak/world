import bcrypt from 'bcryptjs';

export async function up(queryInterface) {
  const password = await bcrypt.hash('Nutria12!', 10);
  await queryInterface.bulkInsert('Users', [
    {
      username: 'Losketh',
      email: 'krzysztof.tomiak@wp.pl',
      password,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Zetka',
      email: 'zetka@wp.pl',
      password,
      role: 'editor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Pluto',
      email: 'pluto@wp.pl',
      password,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Ariel',
      email: 'ariel@wp.pl',
      password,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Users', { email: 'admin@example.com' });
}
