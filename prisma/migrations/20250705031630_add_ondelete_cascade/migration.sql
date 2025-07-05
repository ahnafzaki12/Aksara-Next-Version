-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_campaignId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
