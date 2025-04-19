/*
  Warnings:

  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `user_departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_divisions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_fields` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_departments` DROP FOREIGN KEY `user_departments_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_departments` DROP FOREIGN KEY `user_departments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_divisions` DROP FOREIGN KEY `user_divisions_division_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_divisions` DROP FOREIGN KEY `user_divisions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_fields` DROP FOREIGN KEY `user_fields_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_fields` DROP FOREIGN KEY `user_fields_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_role_id_fkey`;

-- DropIndex
DROP INDEX `users_role_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `role_id`,
    ADD COLUMN `roleId` INTEGER UNSIGNED NULL;

-- DropTable
DROP TABLE `user_departments`;

-- DropTable
DROP TABLE `user_divisions`;

-- DropTable
DROP TABLE `user_fields`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
