/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `orgs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "orgs_name_key";

-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
