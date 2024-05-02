-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('ZERO', 'LIKE', 'DISLIKE');

-- CreateTable
CREATE TABLE "reactions" (
    "id" UUID NOT NULL,
    "type" "ReactionType" NOT NULL DEFAULT 'ZERO',
    "board_id" UUID NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
