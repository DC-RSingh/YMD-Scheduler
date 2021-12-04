import { IStepDescriptor } from '../interfaces/step-descriptor.interface';

export function getToolbarSteps(): IStepDescriptor[] {
  return [
    {
        key: 'initial_step',
        title: "Welcome to the Your Music Depot Scheduler!",
        body: "This tour will guide you through the main functions of the app to get you started quickly."
    },
    {
        key: 'schedule_step',
        title: "Schedule View",
        body: "Stuff.",
        selector: '[data-tour-elem="scheduleView"]',
    },
    {
        key: 'student_step',
        title: "Student View",
        body: "Stuff.",
        selector: '[data-tour-elem="studentView"]',
    },
    {
        key: 'staff_step',
        title: "Staff View",
        body: "Stuff.",
        selector: '[data-tour-elem="staffView"]',
    },
    {
        key: 'logout_step',
        title: "Logout Button",
        body: "When you are done, you can logout of the YMD Scheduler by clicking here.",
        selector: '[data-tour-elem="logoutView"]',
    },
    {
        key: 'add_step',
        title: "Add Section",
        body: "Here, you can open a menu allowing you to choose between addding Classes, Students or Staff.",
        selector: '[data-tour-elem="addArea"]',
    },
    {
        key: 'notifications_step',
        title: "Notification List",
        body: "Here, you can view a list of recent events within the app, like adding a new student to the database.",
        selector: '[data-tour-elem="notificationList"]',
    },
    {
        key: 'support_panel_step',
        title: "Support Panel",
        body: "Here you can take this tour again, or view some details about the app.",
        selector: '[data-tour-elem="supportPanel"]',
    },
  ];
}
