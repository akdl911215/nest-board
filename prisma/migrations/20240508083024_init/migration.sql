/*
  Warnings:

  - The values [ZERO] on the enum `ReactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReactionType_new" AS ENUM ('LIKE', 'DISLIKE');
ALTER TABLE "reactions" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "reactions" ALTER COLUMN "type" TYPE "ReactionType_new" USING ("type"::text::"ReactionType_new");
ALTER TYPE "ReactionType" RENAME TO "ReactionType_old";
ALTER TYPE "ReactionType_new" RENAME TO "ReactionType";
DROP TYPE "ReactionType_old";
ALTER TABLE "reactions" ALTER COLUMN "type" SET DEFAULT 'LIKE';
COMMIT;

-- AlterTable
ALTER TABLE "reactions" ALTER COLUMN "type" SET DEFAULT 'LIKE';
