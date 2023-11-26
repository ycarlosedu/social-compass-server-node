/*
  Warnings:

  - The `sex` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex",
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "occupation" DROP NOT NULL;
