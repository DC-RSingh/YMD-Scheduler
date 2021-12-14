-- MYSQL SYNTAX THAT WAS ORIGINALLY WRITTEN 
-- LATER INTROSPECTED INTO SCHEMA.PRISMA AND CONVERTED FOR USE
-- WITH THE SQLITE PROVIDER. SEE prisma/migrations/timestamp_init
CREATE DATABASE IF NOT EXISTS YMDDB;
use YMDDB;

/* Dropping Tables */
DROP TABLE IF EXISTS StudentClassList;
DROP TABLE IF EXISTS MusicClass;
DROP TABLE IF EXISTS StaffAvailableDays;
DROP TABLE IF EXISTS StaffSkills;
DROP TABLE IF EXISTS StaffCredentials; 
DROP TABLE IF EXISTS StaffRestrictions;
DROP TABLE IF EXISTS Skills;
DROP TABLE IF EXISTS Credentials;
DROP TABLE IF EXISTS Restrictions;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS StaffType;
DROP TABLE IF EXISTS Room;
DROP TABLE IF EXISTS RoomType;
DROP TABLE IF EXISTS TimeSlotMeta;
DROP TABLE IF EXISTS TimeSlot;
DROP TABLE IF EXISTS ClassType;
DROP TABLE IF EXISTS Days;


/* Creating Students Table */
/* Information about a student at the institution. */
CREATE TABLE Students(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   FirstName  VARCHAR(30) NOT NULL,
   LastName  VARCHAR(30) NOT NULL,
   Gender   VARCHAR(1) NOT NULL,
   DateOfBirth DATETIME NOT NULL,
   ContactEmail   VARCHAR(255) NOT NULL,
   ContactTelephone   VARCHAR(12) NOT NULL,
   PaymentMethod  VARCHAR(16) NOT NULL
);

/* Creating Staff Type Table */
/* Temp Part-Time, Temp Full-Time, Permanent Part-Time, Permanent Full-Time*/
CREATE TABLE StaffType(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   Type  VARCHAR(10) NOT NULL UNIQUE
);

/* Creating Staff Table */
/* The staff/instructors at YourMusicDepot.*/
CREATE TABLE Staff(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   Type  INT NOT NULL,
   FirstName  VARCHAR(30) NOT NULL,
   LastName  VARCHAR(30) NOT NULL,
   Gender   VARCHAR(1) NOT NULL,
   DateOfBirth DATETIME NOT NULL,
   Email VARCHAR(255) NOT NULL,
   Telephone VARCHAR(12) NOT NULL,
   MaxHoursPerWeek  TINYINT NOT NULL,
   FOREIGN KEY (Type) REFERENCES StaffType(Id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* Creating Skills Table */
/* Piano, Vocal, Guitar, Percussion, Brass and Wind Instruments. Can add more but they must be unique. */
/* Add type that encompasses specific instruments.*/
CREATE TABLE Skills(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   Skill  VARCHAR(10) NOT NULL UNIQUE
);

/* Creating Credentials Table */
/* The recognized credentials staff can have, for filtering. */
CREATE TABLE Credentials(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   Credential  VARCHAR(10) NOT NULL UNIQUE
);

/* Creating Restrictions Table */
/* Make a set list of things that they cannot change  */
CREATE TABLE Restrictions(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   Restriction  VARCHAR(10) NOT NULL
);

/* Creating Staff Skills Table */
/* Table linking staff members to their respective skills*/
CREATE TABLE StaffSkills(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   StaffId  INT NOT NULL,
   SkillId  INT NOT NULL,
   FOREIGN KEY (StaffId) REFERENCES Staff(Id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (SkillId) REFERENCES Skills(Id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* Creating Staff Credentials Table */
/* Just some of their accomplishments, make it filterable I guess.*/
CREATE TABLE StaffCredentials(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   StaffId  INT NOT NULL,
   CredentialId  INT NOT NULL,
   FOREIGN KEY (StaffId) REFERENCES Staff(Id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (CredentialId) REFERENCES Credentials(Id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* Creating Staff Restrictions Table */
/* Table linking Staff Members to any restrictions they may have. */
CREATE TABLE StaffRestrictions(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   StaffId  INT NOT NULL,
   RestrictionId  INT NOT NULL,
   FOREIGN KEY (StaffId) REFERENCES Staff(Id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (RestrictionId) REFERENCES Restrictions(Id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* Creating Room Type Table */
/* Some user entered filterable option. */
CREATE TABLE RoomType(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   Type  VARCHAR(10) NOT NULL
);

/* Creating Room Table */
CREATE TABLE Room(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   Type  INT NOT NULL,
   Name  VARCHAR(10) NOT NULL,
   RoomSize  SMALLINT NOT NULL,
   hasPiano  BOOLEAN NOT NULL,
   FOREIGN KEY (Type) REFERENCES RoomType(Id) ON DELETE CASCADE ON UPDATE CASCADE
);


/* Creating Staff Available Hours Table */
/* Have an Enum in the app to evaluate value of days. This table should have set values. 
	Actually should already be present in a date library.
*/
CREATE TABLE Days(
   Id TINYINT PRIMARY KEY AUTO_INCREMENT,
   Day  VARCHAR(10) NOT NULL
);


/* Creating Time Slot Table */
CREATE TABLE TimeSlot(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   StartDate  DATETIME NOT NULL,
   EndDate  DATETIME NOT NULL,
   Duration INT AS (TIMESTAMPDIFF(MINUTE, StartDate, EndDate)) STORED,
   WeekDay INT AS (WEEKDAY(StartDate)) STORED,
   Attended BOOLEAN DEFAULT FALSE
);

/* Creating Time Slot Meta Table for repeat events*/
/* Contains information about time slots that repeat with complex patterns. */
CREATE TABLE TimeSlotMeta (
	Id INT PRIMARY KEY AUTO_INCREMENT,
	TimeSlotId INT NOT NULL,
	RepeatStart DATE NOT NULL,
	RepeatEnd DATE,
	RepeatYear SMALLINT,
	RepeatMonth TINYINT,
	RepeatDay TINYINT,
	RepeatWeek TINYINT,
	RepeatWeekday TINYINT,
	FOREIGN KEY (TimeSlotId) REFERENCES TimeSlot(Id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* Creating Room Type Table */
/* Tied in with Skills */
CREATE TABLE ClassType(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   Type  VARCHAR(10) NOT NULL
);

/* Creating Staff Available Days Table */
CREATE TABLE StaffAvailableDays(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   StaffId  INT NOT NULL,
   DayId  TINYINT NOT NULL,
   FOREIGN KEY (StaffId) REFERENCES Staff(Id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (DayId) REFERENCES Days(Id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* Creating Class Table */
/* A class has an instructor, a time slot and room associated with it. A class can require more people than a room can fit, so the size is necessary. */
CREATE TABLE MusicClass(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   ClassType  INT NOT NULL,
   StaffId  INT NOT NULL,
   TimeSlotId  INT NOT NULL,
   RoomId  INT NOT NULL,
   ClassSize  TINYINT NOT NULL,
   FOREIGN KEY (ClassType) REFERENCES ClassType(Id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (StaffId) REFERENCES Staff(Id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (TimeSlotId) REFERENCES TimeSlot(Id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (RoomId) REFERENCES Room(Id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* Creating Student Class List Table */
/* Classes can have multiple students, this table links those students to a class ID*/
CREATE TABLE StudentClassList(
   Id INT PRIMARY KEY AUTO_INCREMENT,
   ClassId  INT NOT NULL,
   StudentId  INT NOT NULL,
   FOREIGN KEY (ClassId) REFERENCES MusicClass(Id) ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (StudentId) REFERENCES Students(Id) ON DELETE CASCADE ON UPDATE CASCADE
);
