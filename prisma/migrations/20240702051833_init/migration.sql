-- CreateTable
CREATE TABLE `HeartRateRecord` (
    `recordId` INTEGER NOT NULL AUTO_INCREMENT,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bpmAvg` DOUBLE NOT NULL,
    `delta` INTEGER NOT NULL,

    PRIMARY KEY (`recordId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
