/*
  Warnings:

  - You are about to drop the column `scopeType` on the `role_scopes` table. All the data in the column will be lost.
  - Added the required column `scope_type` to the `role_scopes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `role_scopes` DROP COLUMN `scopeType`,
    ADD COLUMN `scope_type` ENUM('DEPARTMENT', 'FIELD', 'DIVISION') NOT NULL AFTER `user_role_id`;
