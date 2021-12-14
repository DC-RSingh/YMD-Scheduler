import { PrismaClient } from '../src/generated/prisma-client';
import faker from 'faker';

const prisma = new PrismaClient();

const NUM_ROOMS = 10;
const NUM_RECORDS = 100;

const GENDERS = ['Male', 'Female', 'Non-Binary'];
const PAYMENT_METHODS = ['Credit', 'Debit', 'Cash', ' Mixed'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const STAFF_TYPES = ['FULL-TIME', 'PART-TIME', 'CONTRACT', 'TEMPORARY', 'VOLUNTARY'];
const SKILLS = ['Piano', 'Vocal', 'Guitar', 'Percussion', 'Brass', 'Wind'];
const ROOM_TYPES = ['SMALL', 'LARGE'];

// TODO: Restrictions and Credentials have not been generated. 

/** 
 * Generate a random number of students for a class, for up to n students
 * */ 
const generateStudents = (n: number) => {
    const students: {StudentId: number}[] = [];

    for (let _ = 0; _ < n; _++) {
        if (faker.datatype.boolean()) {
            students.push({StudentId: faker.datatype.number({min: 1, max: NUM_RECORDS})});
        }
    }
    return students;
}

async function main() {

    // Lazy check, if students table has anything in it don't bother seeding
    if (await prisma.students.count() > 0) {
        throw Error("Database already has data 💥. Run `prisma migrate reset` to reseed 🌱.");
    }

    // TODO: Some way to generate this template data for prod, probably in renderer

    console.log('Generating templated data... ⌛');
    // Generate the data for the days table
    for (const day of DAYS) {
        await prisma.days.create({data: {Day: day}});
    }

    // Generate the data for staff types
    for (const type of STAFF_TYPES) {
        await prisma.stafftype.create({data: {Type: type}});
    }

    // Generate the data for skills
    for (const skill of SKILLS) {
        await prisma.skills.create({data: {Skill: skill}});
    }

    // Generate the data for class types
    // FIXME: redundant data? check use case of table
    for (const skill of SKILLS) {
        await prisma.classtype.create({data: {Type: skill}});
    }

    // Generate room types
    // FIXME: review table usage
    for (const room of ROOM_TYPES) {
        await prisma.roomtype.create({data: {Type: room}});
    }

    console.log('Generating room data... ⌛');
    // Generate room data
    for (let _ = 0; _ < NUM_ROOMS; _++) {
        
        await prisma.room.create({
            data: {
                Name: faker.random.alphaNumeric(5),
                RoomSize: faker.datatype.number({min: 5, max: 30}),
                hasPiano: faker.datatype.boolean(),
                roomtype: {
                    connect: {
                        Id: ROOM_TYPES.indexOf(faker.random.arrayElement(ROOM_TYPES)) + 1 
                    }
                }
            },
        });
    }

    console.log('Generating student data... ⌛');
    // Generate student, staff and related data
    for (let _ = 0; _ < NUM_RECORDS; _++) { 

        await prisma.students.create({
            data: {
                FirstName: faker.name.firstName(),
                LastName: faker.name.lastName(),
                Gender: faker.random.arrayElement(GENDERS),
                DateOfBirth: faker.date.past(50),
                ContactEmail: faker.internet.exampleEmail(),
                ContactTelephone: faker.phone.phoneNumber(),
                PaymentMethod: faker.random.arrayElement(PAYMENT_METHODS),
            }
        });
    }

    console.log('Generating staff data... ⌛');
    for (let _ = 0; _ < NUM_RECORDS; _++) { 

        await prisma.staff.create({
            data: {
                FirstName: faker.name.firstName(),
                LastName: faker.name.lastName(),
                Gender: faker.random.arrayElement(GENDERS),
                stafftype: {
                    connect: { Id: STAFF_TYPES.indexOf(faker.random.arrayElement(STAFF_TYPES)) + 1 }
                },
                DateOfBirth: faker.date.past(50),
                Email: faker.internet.exampleEmail(), 
                Telephone: faker.phone.phoneNumber(),
                MaxHoursPerWeek: faker.datatype.number({min: 10, max: 40}),
                // TODO: Generator for staff skills and available days
                // For now, just have every staff member with the same skills and available days
                staffskills: {
                    create: [
                        { SkillId: 1},
                        { SkillId: 2},
                        { SkillId: 3}
                    ]
                },
                staffavailabledays: {
                    create: [
                        { DayId: 1},
                        { DayId: 2},
                        { DayId: 3},
                        { DayId: 4},
                    ]
                }
            }
        });

    }

    console.log('Generating timeslot data... ⌛');
    for (let _ = 0; _ < NUM_RECORDS; _++) { 

        const startDate = faker.date.between(faker.date.recent(), faker.date.soon());
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + faker.datatype.number({min: 1, max: 3}));

        await prisma.timeslot.create({
            data: {
                StartDate: startDate,
                EndDate: endDate,
            }
        });

    }

    console.log('Generating music class data... ⌛');
    for (let _ = 0; _ < NUM_RECORDS; _++) { 

        await prisma.musicclass.create({
            data: {
                ClassSize: faker.datatype.number({min: 1, max: 30}),
                classtype: {
                    connect: { Id: SKILLS.indexOf(faker.random.arrayElement(SKILLS)) + 1 }
                },
                room: {
                    connect: { Id: faker.datatype.number({min: 1, max: NUM_ROOMS}) }
                },
                staff: {
                    connect: { Id: faker.datatype.number({min: 1, max: NUM_RECORDS})}
                },
                timeslot: {
                    connect: { Id: faker.datatype.number({min: 1, max: NUM_RECORDS})}
                },
                studentclasslist: {
                    create: generateStudents(20)
                }
            }
        });
    }

    console.log('Seeding complete! ✔');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });