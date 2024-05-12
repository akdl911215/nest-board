/*
  Warnings:

  - You are about to drop the column `board_score_list` on the `boards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "boards" DROP COLUMN "board_score_list",
ADD COLUMN     "board_score" INTEGER;
