/*
  Warnings:

  - Added the required column `is_main` to the `user_roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_roles` ADD COLUMN `is_main` BOOLEAN NOT NULL;
