/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "activities" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuddyRequest" (
    "id" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BuddyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyRequest" ADD CONSTRAINT "BuddyRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuddyRequest" ADD CONSTRAINT "BuddyRequest_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
