/*
  Warnings:

  - Made the column `identifier_id` on table `boards` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "boards" ALTER COLUMN "identifier_id" SET NOT NULL;
