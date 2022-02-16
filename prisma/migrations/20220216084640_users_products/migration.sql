/*
  Warnings:

  - Added the required column `ownerId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
