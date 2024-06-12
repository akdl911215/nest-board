-- CreateTable
CREATE TABLE "viewed_boards" (
    "id" UUID NOT NULL,
    "viewd_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "board_id" UUID NOT NULL,

    CONSTRAINT "viewed_boards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "viewed_boards_user_id_board_id_key" ON "viewed_boards"("user_id", "board_id");

-- AddForeignKey
ALTER TABLE "viewed_boards" ADD CONSTRAINT "viewed_boards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewed_boards" ADD CONSTRAINT "viewed_boards_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
