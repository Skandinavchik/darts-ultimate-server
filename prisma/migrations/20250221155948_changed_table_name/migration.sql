/*
  Warnings:

  - You are about to drop the `Water` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Water";

-- CreateTable
CREATE TABLE "water" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "water_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "water_serialNumber_key" ON "water"("serialNumber");
