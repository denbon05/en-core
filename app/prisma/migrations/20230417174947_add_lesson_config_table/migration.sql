-- CreateTable
CREATE TABLE "LessonConfig" (
    "id" SERIAL NOT NULL,
    "userScheduleId" INTEGER NOT NULL,
    "trialDurrationInMinutes" INTEGER NOT NULL DEFAULT 30,
    "singleDurrationInMinutes" INTEGER NOT NULL DEFAULT 50,
    "regularDurrationInMinutes" INTEGER NOT NULL DEFAULT 50,

    CONSTRAINT "LessonConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonConfig_userScheduleId_key" ON "LessonConfig"("userScheduleId");

-- AddForeignKey
ALTER TABLE "LessonConfig" ADD CONSTRAINT "LessonConfig_userScheduleId_fkey" FOREIGN KEY ("userScheduleId") REFERENCES "UserSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
