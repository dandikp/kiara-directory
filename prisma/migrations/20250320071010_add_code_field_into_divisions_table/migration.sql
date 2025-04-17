/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `divisions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `divisions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `divisions` ADD COLUMN `code` VARCHAR(32) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `divisions_code_key` ON `divisions`(`code`);
