/*
  Warnings:

  - You are about to alter the column `delta` on the `heartraterecord` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `heartraterecord` MODIFY `delta` DOUBLE NOT NULL;
