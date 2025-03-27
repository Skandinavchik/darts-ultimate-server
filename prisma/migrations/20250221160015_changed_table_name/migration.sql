/*
  Warnings:

  - You are about to drop the `water` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "water";

-- CreateTable
CREATE TABLE "waters" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "waters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waters_serialNumber_key" ON "waters"("serialNumber");
