/*
  Warnings:

  - Added the required column `decimals` to the `sponsorTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectName` to the `sponsorTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectOwner` to the `sponsorTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sponsorTransaction" ADD COLUMN     "decimals" INTEGER NOT NULL,
ADD COLUMN     "projectName" TEXT NOT NULL,
ADD COLUMN     "projectOwner" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "sponsorTransaction_projectOwner_projectName_idx" ON "sponsorTransaction"("projectOwner", "projectName");
