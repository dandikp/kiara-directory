/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `teams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `teams` DROP COLUMN `updatedAt`,
    ADD COLUMN `deleted_at` TIMESTAMP(3) NULL,
    ADD COLUMN `updated_at` TIMESTAMP(3) NULL;
