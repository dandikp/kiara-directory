/*
  Warnings:

  - You are about to drop the `team_users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `department_id` to the `divisions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `team_users` DROP FOREIGN KEY `team_users_team_id_fkey`;

-- DropForeignKey
ALTER TABLE `team_users` DROP FOREIGN KEY `team_users_user_id_fkey`;

-- AlterTable
ALTER TABLE `divisions` ADD COLUMN `department_id` INTEGER UNSIGNED NOT NULL AFTER `id`;

-- DropTable
DROP TABLE `team_users`;

-- CreateTable
CREATE TABLE `user_teams` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `team_id` INTEGER UNSIGNED NOT NULL,
    `role` ENUM('MEMBER', 'LEADER', 'CO_LEADER') NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NULL,
    `deleted_at` TIMESTAMP(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `code` VARCHAR(32) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NULL,
    `deleted_at` TIMESTAMP(3) NULL,

    UNIQUE INDEX `departments_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_departments` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `department_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NULL,
    `deleted_at` TIMESTAMP(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_teams` ADD CONSTRAINT `user_teams_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_teams` ADD CONSTRAINT `user_teams_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divisions` ADD CONSTRAINT `divisions_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_departments` ADD CONSTRAINT `user_departments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_departments` ADD CONSTRAINT `user_departments_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
