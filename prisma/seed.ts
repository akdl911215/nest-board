import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const categories = [
    {
      id: '99c4c144-59f3-481d-85d9-9e23b7e09e7c',
      name: 'game',
    },
    {
      id: '81c2385d-fff1-4a8a-91d7-94e8f6f129db',
      name: 'economic',
    },
  ];

  for (let i = 0; i < categories.length; ++i) {
    await prisma.categories.upsert({
      where: {
        id: categories[i].id,
      },
      update: {
        name: categories[i].id,
      },
      create: {
        name: categories[i].name,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
