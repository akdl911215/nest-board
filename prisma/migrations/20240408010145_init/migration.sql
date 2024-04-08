/*
  Warnings:

  - You are about to drop the `boards` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('TEXT', 'IMAGES_AND_VIDEO', 'LINK');

-- DropTable
DROP TABLE "boards";

-- CreateTable
CREATE TABLE "boards_t" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content_types" "ContentType" NOT NULL DEFAULT 'TEXT',
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "boards_t_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boards_iav" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content_types" "ContentType" NOT NULL DEFAULT 'IMAGES_AND_VIDEO',
    "upload_url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "boards_iav_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boards_l" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content_types" "ContentType" NOT NULL DEFAULT 'LINK',
    "link_url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "boards_l_pkey" PRIMARY KEY ("id")
);
