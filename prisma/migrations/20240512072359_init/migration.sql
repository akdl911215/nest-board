/*
  Warnings:

  - Made the column `board_score` on table `boards` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "boards" ALTER COLUMN "board_score" SET NOT NULL,
ALTER COLUMN "board_score" SET DEFAULT 0;
