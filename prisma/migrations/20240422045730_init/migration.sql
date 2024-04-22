-- CreateTable
CREATE TABLE "repolies" (
    "id" UUID NOT NULL,
    "nickname" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "comment_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "repolies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "repolies" ADD CONSTRAINT "repolies_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
