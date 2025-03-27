-- CreateTable
CREATE TABLE "Water" (
    "id" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Water_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Water_serialNumber_key" ON "Water"("serialNumber");
