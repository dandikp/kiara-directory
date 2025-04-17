-- AlterTable
ALTER TABLE `divisions` ADD COLUMN `field_id` INTEGER UNSIGNED NULL AFTER `department_id`;

-- CreateTable
CREATE TABLE `fields` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `department_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `code` VARCHAR(32) NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NULL,
    `deleted_at` TIMESTAMP(3) NULL,

    UNIQUE INDEX `fields_code_key`(`code`),
    INDEX `fields_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_fields` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `field_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NULL,
    `deleted_at` TIMESTAMP(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `departments_code_idx` ON `departments`(`code`);

-- AddForeignKey
ALTER TABLE `divisions` ADD CONSTRAINT `divisions_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `fields`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fields` ADD CONSTRAINT `fields_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_fields` ADD CONSTRAINT `user_fields_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_fields` ADD CONSTRAINT `user_fields_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
