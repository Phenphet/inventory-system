-- DropForeignKey
ALTER TABLE "stockmovement" DROP CONSTRAINT "stockmovement_destination_location_id_fkey";

-- DropForeignKey
ALTER TABLE "stockmovement" DROP CONSTRAINT "stockmovement_source_location_id_fkey";

-- AlterTable
ALTER TABLE "stockmovement" ALTER COLUMN "source_location_id" DROP NOT NULL,
ALTER COLUMN "destination_location_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "stockmovement" ADD CONSTRAINT "stockmovement_source_location_id_fkey" FOREIGN KEY ("source_location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stockmovement" ADD CONSTRAINT "stockmovement_destination_location_id_fkey" FOREIGN KEY ("destination_location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;
