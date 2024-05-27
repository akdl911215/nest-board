-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('TEXT', 'LINK', 'MEDIA', 'YOUTUBE');

-- AlterTable
ALTER TABLE "boards" ADD COLUMN     "type" "BoardType" NOT NULL DEFAULT 'TEXT';
