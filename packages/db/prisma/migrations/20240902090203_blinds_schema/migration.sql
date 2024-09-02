-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "OutBoxStatus" AS ENUM ('WAITING', 'IN_QUEUE');

-- AlterTable
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "AvailableTriggers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "metaDataSkeleton" JSONB NOT NULL,
    "triggerId" TEXT NOT NULL,

    CONSTRAINT "AvailableTriggers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Triggers" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "metadata" JSONB NOT NULL,
    "blindeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Triggers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableActions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "metaDataSkeleton" JSONB NOT NULL,
    "actionId" TEXT NOT NULL,

    CONSTRAINT "AvailableActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actions" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "metaData" JSONB NOT NULL,
    "blindeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blindes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blindeRunId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blindes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlindeRun" (
    "id" TEXT NOT NULL,
    "blindeRunOutboxid" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "initiatedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlindeRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlindeRunOutbox" (
    "id" TEXT NOT NULL,
    "outboxStatus" "OutBoxStatus" NOT NULL,

    CONSTRAINT "BlindeRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvailableTriggers_triggerId_key" ON "AvailableTriggers"("triggerId");

-- CreateIndex
CREATE UNIQUE INDEX "Triggers_blindeId_key" ON "Triggers"("blindeId");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableActions_actionId_key" ON "AvailableActions"("actionId");

-- CreateIndex
CREATE UNIQUE INDEX "Blindes_blindeRunId_key" ON "Blindes"("blindeRunId");

-- CreateIndex
CREATE UNIQUE INDEX "BlindeRun_blindeRunOutboxid_key" ON "BlindeRun"("blindeRunOutboxid");

-- AddForeignKey
ALTER TABLE "AvailableTriggers" ADD CONSTRAINT "AvailableTriggers_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Triggers" ADD CONSTRAINT "Triggers_blindeId_fkey" FOREIGN KEY ("blindeId") REFERENCES "Blindes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableActions" ADD CONSTRAINT "AvailableActions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_blindeId_fkey" FOREIGN KEY ("blindeId") REFERENCES "Blindes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blindes" ADD CONSTRAINT "Blindes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blindes" ADD CONSTRAINT "Blindes_blindeRunId_fkey" FOREIGN KEY ("blindeRunId") REFERENCES "BlindeRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlindeRun" ADD CONSTRAINT "BlindeRun_blindeRunOutboxid_fkey" FOREIGN KEY ("blindeRunOutboxid") REFERENCES "BlindeRunOutbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
