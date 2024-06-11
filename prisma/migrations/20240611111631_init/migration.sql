/*
  Warnings:

  - The `visibility` column on the `communities` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CommunityVisibilityType" AS ENUM ('PUBLIC', 'RESTRICTED', 'PRIVATE');

-- AlterTable
ALTER TABLE "communities" ALTER COLUMN "banner" DROP NOT NULL,
ALTER COLUMN "icon" DROP NOT NULL,
DROP COLUMN "visibility",
ADD COLUMN     "visibility" "CommunityVisibilityType" NOT NULL DEFAULT 'PUBLIC';

-- DropEnum
DROP TYPE "CimmunityVisibilityType";
