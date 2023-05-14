-- DropForeignKey
ALTER TABLE "UserSchedule" DROP CONSTRAINT "UserSchedule_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserSchedule" ADD CONSTRAINT "UserSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
