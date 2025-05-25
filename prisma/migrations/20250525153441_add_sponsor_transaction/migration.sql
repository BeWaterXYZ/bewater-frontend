-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "sponsorTransaction" (
    "id" BIGSERIAL NOT NULL,
    "txHash" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsorTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sponsorTransaction_txHash_key" ON "sponsorTransaction"("txHash");

-- CreateIndex
CREATE INDEX "sponsorTransaction_fromAddress_idx" ON "sponsorTransaction"("fromAddress");

-- CreateIndex
CREATE INDEX "sponsorTransaction_toAddress_idx" ON "sponsorTransaction"("toAddress");

-- CreateIndex
CREATE INDEX "sponsorTransaction_txHash_idx" ON "sponsorTransaction"("txHash");
