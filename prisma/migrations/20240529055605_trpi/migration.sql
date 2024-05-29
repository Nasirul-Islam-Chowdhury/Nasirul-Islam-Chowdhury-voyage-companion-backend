/*
  Warnings:

  - You are about to drop the column `travelId` on the `TravelRequest` table. All the data in the column will be lost.
  - Added the required column `tripId` to the `TravelRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TravelRequest" DROP CONSTRAINT "TravelRequest_travelId_fkey";

-- AlterTable
ALTER TABLE "TravelRequest" DROP COLUMN "travelId",
ADD COLUMN     "tripId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TravelRequest" ADD CONSTRAINT "TravelRequest_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
