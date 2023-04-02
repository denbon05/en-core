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
CREATE TABLE "RolesPermissions" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolesPermissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "Google" (
    "oauth" JSONB NOT NULL,
    "calendarIds" VARCHAR[],
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "passwordDigest" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLessons" (
    "id" SERIAL NOT NULL,
    "type" "LessonType" NOT NULL,
    "beginAt" TIMESTAMP NOT NULL,
    "endAt" TIMESTAMP NOT NULL,
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "UserLessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserUnavailable" (
    "id" SERIAL NOT NULL,
    "since" TIMESTAMP NOT NULL,
    "until" TIMESTAMP NOT NULL,
    "type" "UserUnavailableType" NOT NULL DEFAULT 'single',
    "scheduleId" INTEGER NOT NULL,

    CONSTRAINT "UserUnavailable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSchedule" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMessage" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UserMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aclPermission_name_key" ON "aclPermission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "aclRole_name_key" ON "aclRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Google_userId_key" ON "Google"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchedule_userId_key" ON "UserSchedule"("userId");

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "aclPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "aclRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Google" ADD CONSTRAINT "Google_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "aclRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLessons" ADD CONSTRAINT "UserLessons_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "UserSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUnavailable" ADD CONSTRAINT "UserUnavailable_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "UserSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSchedule" ADD CONSTRAINT "UserSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
