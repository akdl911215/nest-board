-- CreateEnum
CREATE TYPE "CimmunityVisibilityType" AS ENUM ('PUBLIC', 'RESTRICTED', 'PRIVATE');

-- AlterTable
ALTER TABLE "communities" ADD COLUMN     "visibility" "CimmunityVisibilityType" NOT NULL DEFAULT 'PUBLIC';
