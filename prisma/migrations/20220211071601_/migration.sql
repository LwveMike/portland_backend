/*
  Warnings:

  - Added the required column `refresh_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refresh_token" TEXT NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT E'https://www.der-windows-papst.de/wp-content/uploads/2019/03/Windows-Change-Default-Avatar-448x400.png',
ALTER COLUMN "role" DROP DEFAULT;
