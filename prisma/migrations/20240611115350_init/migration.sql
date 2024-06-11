/*
  Warnings:

  - You are about to drop the `board_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "board_tags" DROP CONSTRAINT "board_tags_board_id_fkey";

-- DropForeignKey
ALTER TABLE "board_tags" DROP CONSTRAINT "board_tags_tag_id_fkey";

-- DropTable
DROP TABLE "board_tags";

-- CreateTable
CREATE TABLE "community_tags" (
    "community_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "community_tags_pkey" PRIMARY KEY ("community_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "community_tags" ADD CONSTRAINT "community_tags_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_tags" ADD CONSTRAINT "community_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
