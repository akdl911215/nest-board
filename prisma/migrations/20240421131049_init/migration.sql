/*
  Warnings:

  - You are about to drop the column `author_id` on the `comments` table. All the data in the column will be lost.
  - Added the required column `board_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_author_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "author_id",
ADD COLUMN     "board_id" UUID NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
