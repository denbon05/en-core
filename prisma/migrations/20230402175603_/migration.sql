/*
  Warnings:

  - The values [single,regular] on the enum `UserUnavailableType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserUnavailableType_new" AS ENUM ('once', 'daily', 'weekly');
ALTER TABLE "UserUnavailable" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "UserUnavailable" ALTER COLUMN "type" TYPE "UserUnavailableType_new" USING ("type"::text::"UserUnavailableType_new");
ALTER TYPE "UserUnavailableType" RENAME TO "UserUnavailableType_old";
ALTER TYPE "UserUnavailableType_new" RENAME TO "UserUnavailableType";
DROP TYPE "UserUnavailableType_old";
ALTER TABLE "UserUnavailable" ALTER COLUMN "type" SET DEFAULT 'once';
COMMIT;

-- AlterTable
ALTER TABLE "UserUnavailable" ALTER COLUMN "type" SET DEFAULT 'once';
