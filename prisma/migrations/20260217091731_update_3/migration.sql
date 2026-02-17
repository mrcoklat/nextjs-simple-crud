/*
  Warnings:

  - Made the column `desc` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "desc" SET NOT NULL;
