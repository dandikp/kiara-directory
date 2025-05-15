-- AlterTable
ALTER TABLE `projects` ADD COLUMN `deleted_at` TIMESTAMP(3) NULL AFTER `updated_at`;
