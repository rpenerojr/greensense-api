-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `privilege` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `allowance` INTEGER NOT NULL DEFAULT 2,
    `temperatureMin` DOUBLE NOT NULL,
    `temperatureMax` DOUBLE NOT NULL,
    `humidityMin` DOUBLE NOT NULL,
    `humidityMax` DOUBLE NOT NULL,
    `co2Min` DOUBLE NOT NULL,
    `co2Max` DOUBLE NOT NULL,
    `lightMin` DOUBLE NOT NULL,
    `lightMax` DOUBLE NOT NULL,
    `moistureMin` DOUBLE NOT NULL,
    `moistureMax` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Records` ADD CONSTRAINT `Records_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
