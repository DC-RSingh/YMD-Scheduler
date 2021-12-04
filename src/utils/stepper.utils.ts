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
        key: 'support_panel_step',
        title: "Support Panel",
        body: "Here can take this tour again, or view some details about the app.",
        selector: '[data-tour-elem="supportPanel"]',
    },
  ];
}
