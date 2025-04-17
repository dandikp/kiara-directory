/*
  Warnings:

  - You are about to drop the column `workField` on the `projects` table. All the data in the column will be lost.
  - Added the required column `work_field` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `workField`,
    ADD COLUMN `work_field` ENUM('ENVIROMENTAL', 'URBAN_PLANNING', 'FLAG_BORROWING') NOT NULL;
