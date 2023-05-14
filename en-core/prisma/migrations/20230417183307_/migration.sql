/*
  Warnings:

  - The values [single,regular] on the enum `LessonType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `beginAt` on the `UserLessons` table. All the data in the column will be lost.
  - You are about to drop the column `endAt` on the `UserLessons` table. All the data in the column will be lost.
  - Added the required column `since` to the `UserLessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `until` to the `UserLessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LessonType_new" AS ENUM ('trial', 'once', 'weekly');
ALTER TABLE "UserLessons" ALTER COLUMN "type" TYPE "LessonType_new" USING ("type"::text::"LessonType_new");
ALTER TYPE "LessonType" RENAME TO "LessonType_old";
ALTER TYPE "LessonType_new" RENAME TO "LessonType";
DROP TYPE "LessonType_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserLessons" DROP COLUMN "beginAt",
DROP COLUMN "endAt",
ADD COLUMN     "since" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "until" TIMESTAMPTZ NOT NULL;
