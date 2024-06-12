/*
  Warnings:

  - You are about to drop the column `viewd_at` on the `viewed_boards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "viewed_boards" DROP COLUMN "viewd_at",
ADD COLUMN     "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
