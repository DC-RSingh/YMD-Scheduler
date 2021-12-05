/**
 * Interface describing the attributes of a step descriptor for the app tour.
 */
export interface IStepDescriptor {
    key: string;
    title: string;
    body: string;
    selector?: string;
}
  