-- CreateTable
CREATE TABLE "classtype" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "credentials" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Credential" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "days" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Day" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "musicclass" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClassType" INTEGER NOT NULL,
    "StaffId" INTEGER NOT NULL,
    "TimeSlotId" INTEGER NOT NULL,
    "RoomId" INTEGER NOT NULL,
    "ClassSize" INTEGER NOT NULL,
    CONSTRAINT "musicclass_ClassType_fkey" FOREIGN KEY ("ClassType") REFERENCES "classtype" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "musicclass_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "room" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "musicclass_StaffId_fkey" FOREIGN KEY ("StaffId") REFERENCES "staff" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "musicclass_TimeSlotId_fkey" FOREIGN KEY ("TimeSlotId") REFERENCES "timeslot" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "restrictions" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Restriction" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "room" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Type" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "RoomSize" INTEGER NOT NULL,
    "hasPiano" BOOLEAN NOT NULL,
    CONSTRAINT "room_Type_fkey" FOREIGN KEY ("Type") REFERENCES "roomtype" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "roomtype" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "skills" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Skill" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "staff" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Type" INTEGER NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "DateOfBirth" DATETIME NOT NULL,
    "Email" TEXT NOT NULL,
    "Telephone" TEXT NOT NULL,
    "MaxHoursPerWeek" INTEGER NOT NULL,
    CONSTRAINT "staff_Type_fkey" FOREIGN KEY ("Type") REFERENCES "stafftype" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "staffavailabledays" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StaffId" INTEGER NOT NULL,
    "DayId" INTEGER NOT NULL,
    CONSTRAINT "staffavailabledays_DayId_fkey" FOREIGN KEY ("DayId") REFERENCES "days" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "staffavailabledays_StaffId_fkey" FOREIGN KEY ("StaffId") REFERENCES "staff" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "staffcredentials" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StaffId" INTEGER NOT NULL,
    "CredentialId" INTEGER NOT NULL,
    CONSTRAINT "staffcredentials_CredentialId_fkey" FOREIGN KEY ("CredentialId") REFERENCES "credentials" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "staffcredentials_StaffId_fkey" FOREIGN KEY ("StaffId") REFERENCES "staff" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "staffrestrictions" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StaffId" INTEGER NOT NULL,
    "RestrictionId" INTEGER NOT NULL,
    CONSTRAINT "staffrestrictions_RestrictionId_fkey" FOREIGN KEY ("RestrictionId") REFERENCES "restrictions" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "staffrestrictions_StaffId_fkey" FOREIGN KEY ("StaffId") REFERENCES "staff" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "staffskills" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StaffId" INTEGER NOT NULL,
    "SkillId" INTEGER NOT NULL,
    CONSTRAINT "staffskills_SkillId_fkey" FOREIGN KEY ("SkillId") REFERENCES "skills" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "staffskills_StaffId_fkey" FOREIGN KEY ("StaffId") REFERENCES "staff" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stafftype" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "studentclasslist" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ClassId" INTEGER NOT NULL,
    "StudentId" INTEGER NOT NULL,
    CONSTRAINT "studentclasslist_ClassId_fkey" FOREIGN KEY ("ClassId") REFERENCES "musicclass" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "studentclasslist_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "students" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "students" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "DateOfBirth" DATETIME NOT NULL,
    "ContactEmail" TEXT NOT NULL,
    "ContactTelephone" TEXT NOT NULL,
    "PaymentMethod" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "timeslot" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "Duration" INTEGER,
    "WeekDay" INTEGER,
    "Attended" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "timeslotmeta" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TimeSlotId" INTEGER NOT NULL,
    "RepeatStart" DATETIME NOT NULL,
    "RepeatEnd" DATETIME,
    "RepeatYear" INTEGER,
    "RepeatMonth" INTEGER,
    "RepeatDay" INTEGER,
    "RepeatWeek" INTEGER,
    "RepeatWeekday" INTEGER,
    CONSTRAINT "timeslotmeta_TimeSlotId_fkey" FOREIGN KEY ("TimeSlotId") REFERENCES "timeslot" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential" ON "credentials"("Credential");

-- CreateIndex
CREATE INDEX "mcClassType" ON "musicclass"("ClassType");

-- CreateIndex
CREATE INDEX "RoomId" ON "musicclass"("RoomId");

-- CreateIndex
CREATE INDEX "mcStaffId" ON "musicclass"("StaffId");

-- CreateIndex
CREATE INDEX "mcTimeSlotId" ON "musicclass"("TimeSlotId");

-- CreateIndex
CREATE INDEX "rType" ON "room"("Type");

-- CreateIndex
CREATE UNIQUE INDEX "Skill" ON "skills"("Skill");

-- CreateIndex
CREATE INDEX "sType" ON "staff"("Type");

-- CreateIndex
CREATE INDEX "DayId" ON "staffavailabledays"("DayId");

-- CreateIndex
CREATE INDEX "sadStaffId" ON "staffavailabledays"("StaffId");

-- CreateIndex
CREATE INDEX "CredentialId" ON "staffcredentials"("CredentialId");

-- CreateIndex
CREATE INDEX "scStaffId" ON "staffcredentials"("StaffId");

-- CreateIndex
CREATE INDEX "RestrictionId" ON "staffrestrictions"("RestrictionId");

-- CreateIndex
CREATE INDEX "srStaffId" ON "staffrestrictions"("StaffId");

-- CreateIndex
CREATE INDEX "SkillId" ON "staffskills"("SkillId");

-- CreateIndex
CREATE INDEX "StaffId" ON "staffskills"("StaffId");

-- CreateIndex
CREATE UNIQUE INDEX "Type" ON "stafftype"("Type");

-- CreateIndex
CREATE INDEX "ClassId" ON "studentclasslist"("ClassId");

-- CreateIndex
CREATE INDEX "StudentId" ON "studentclasslist"("StudentId");

-- CreateIndex
CREATE INDEX "TimeSlotId" ON "timeslotmeta"("TimeSlotId");
