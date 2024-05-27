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

  const boardList = [
    {
      id: '01e173a3-67ba-4f4a-af70-e91ea136d451',
      identifier_id: '01e173a3-67ba-4f4a-af70-e91ea136d451',
      category: 'economic',
      content:
        'mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1vvvvmockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1mockingListContent1',
      title: 'mockingListTitle1',
      nickname: 'mockingNickname1',
      board_score: 100,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: '01e173a3-67ba-4f4a-af70-e91ea136d452',
      identifier_id: '01e173a3-67ba-4f4a-af70-e91ea136d452',
      category: 'economic',
      content:
        'mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2mockingListContent2',
      title: 'mockingListTitle2',
      nickname: 'mockingNickname2',
      board_score: 10,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: '01e173a3-67ba-4f4a-af70-e91ea136d453',
      identifier_id: '01e173a3-67ba-4f4a-af70-e91ea136d453',
      category: 'economic',
      content:
        'mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3mockingListContent3',
      title: 'mockingListTitle3',
      nickname: 'mockingNickname3',
      board_score: 30,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: '01e173a3-67ba-4f4a-af70-e91ea136d454',
      identifier_id: '01e173a3-67ba-4f4a-af70-e91ea136d454',
      category: 'economic',
      content:
        'mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4mockingListContent4',
      title: 'mockingListTitle4',
      nickname: 'mockingNickname4',
      board_score: 90,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: '01e173a3-67ba-4f4a-af70-e91ea136d455',
      identifier_id: '01e173a3-67ba-4f4a-af70-e91ea136d455',
      category: 'economic',
      content:
        'mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5mockingListContent5v',
      title: 'mockingListTitle5',
      nickname: 'mockingNickname5',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      id: '01e173a3-67ba-4f4a-af70-e91ea136d456',
      identifier_id: '01e173a3-67ba-4f4a-af70-e91ea136d456',
      category: 'economic',
      content:
        'mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6mockingListContent6v',
      title: 'mockingListTitle6',
      nickname: 'mockingNickname6',
      board_score: 88,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ];

  for (let i = 0; i < boardList.length; ++i) {
    const boardObj = {
      identifier_id: boardList[i].identifier_id,
      category: boardList[i].category,
      content: [boardList[i].content],
      title: boardList[i].title,
      nickname: boardList[i].nickname,
      created_at: boardList[i].created_at,
      updated_at: boardList[i].updated_at,
      deleted_at: boardList[i].deleted_at,
    };

    await prisma.boards.upsert({
      where: {
        id: boardList[i].id,
      },
      update: boardObj,
      create: boardObj,
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
