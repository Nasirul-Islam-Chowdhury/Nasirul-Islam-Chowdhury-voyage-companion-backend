/*
  Warnings:

  - You are about to drop the `BuddyRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contactNumber` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BuddyRequest" DROP CONSTRAINT "BuddyRequest_tripId_fkey";

-- DropForeignKey
ALTER TABLE "BuddyRequest" DROP CONSTRAINT "BuddyRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "contactNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "BuddyRequest";

-- DropTable
DROP TABLE "Trip";

-- CreateTable
CREATE TABLE "Travel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "activities" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "travelType" TEXT NOT NULL,
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelRequest" (
    "id" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "travelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TravelRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelRequest" ADD CONSTRAINT "TravelRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelRequest" ADD CONSTRAINT "TravelRequest_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
