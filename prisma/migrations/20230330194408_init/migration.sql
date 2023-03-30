-- CreateEnum
CREATE TYPE "_Role" AS ENUM ('superadmin', 'admin', 'tutor', 'student', 'guest');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('trial', 'single', 'regular');

-- CreateEnum
CREATE TYPE "UserUnavailableType" AS ENUM ('single', 'regular');

-- CreateTable
CREATE TABLE "aclPermission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "aclPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aclRole" (
    "id" SERIAL NOT NULL,
    "name" "_Role" NOT NULL DEFAULT 'student',

    CONSTRAINT "aclRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rolesPermissions" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "rolesPermissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "google" (
    "oauth" JSONB NOT NULL,
    "calendarIds" VARCHAR[],
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "passwordDigest" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLessons" (
    "id" SERIAL NOT NULL,
    "type" "LessonType" NOT NULL,
    "beginAt" TIMESTAMP NOT NULL,
    "endAt" TIMESTAMP NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "userLessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userUnavailable" (
    "id" SERIAL NOT NULL,
    "since" TIMESTAMP NOT NULL,
    "until" TIMESTAMP NOT NULL,
    "type" "UserUnavailableType" NOT NULL DEFAULT 'single',
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "userUnavailable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userSchedule" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userMessage" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "userMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aclPermission_name_key" ON "aclPermission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "aclRole_name_key" ON "aclRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "google_userId_key" ON "google"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userSchedule_userId_key" ON "userSchedule"("userId");

-- AddForeignKey
ALTER TABLE "rolesPermissions" ADD CONSTRAINT "rolesPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "aclPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rolesPermissions" ADD CONSTRAINT "rolesPermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "aclRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google" ADD CONSTRAINT "google_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "aclRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLessons" ADD CONSTRAINT "userLessons_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "userSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userUnavailable" ADD CONSTRAINT "userUnavailable_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "userSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userSchedule" ADD CONSTRAINT "userSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userMessage" ADD CONSTRAINT "userMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
