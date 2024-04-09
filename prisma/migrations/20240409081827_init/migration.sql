/*
  Warnings:

  - You are about to drop the `boards_iav` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `boards_l` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `boards_t` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "boards_iav";

-- DropTable
DROP TABLE "boards_l";

-- DropTable
DROP TABLE "boards_t";

-- DropEnum
DROP TYPE "ContentType";

-- CreateTable
CREATE TABLE "boards" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "boards_pkey" PRIMARY KEY ("id")
);
