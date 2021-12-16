import { makeObservable, observable, action } from "mobx";
import { persist } from "mobx-persist";
import { RootStore } from "./rootStore";

export type AddDialogType = 'Create' | 'Edit' | undefined;
export type AddTypesDialogType = 'Staff' | 'Room' | undefined;
export type AddFiltersDialogType = 'Skill' | 'Credential' | 'Restriction' | undefined;

export class UiStateStore {
    
    constructor(private rootStore: RootStore) {
        makeObservable(this);
    }
    
    // #region LoginDialog States
    @observable loginError: Error | undefined = undefined;
    @observable loginAuthenticating = false;
    // #endregion
    //#region StaffDialog States
    @observable staffError: Error | undefined = undefined;
    @observable creatingStaff = false;
    @observable staffDialogOpen = false;
    @observable staffDialogType: AddDialogType = undefined;
    //#endregion
    //#region StudentDialog States
    @observable studentError: Error | undefined = undefined;
    @observable creatingStudent = false;
    @observable studentDialogOpen = false;
    @observable studentDialogType: AddDialogType = undefined;
    //#endregion
    //#region RoomDialog States
    @observable roomError: Error | undefined = undefined;
    @observable creatingRoom = false;
    @observable roomDialogOpen = false;
    @observable roomDialogType: AddDialogType = undefined;
    //#endregion
    //#region AddTypesDialog States
    @observable addTypesError: Error | undefined = undefined;
    @observable creatingType = false;
    @observable addTypesDialogOpen = false;
    @observable addTypesDialogType: AddTypesDialogType = undefined;
    //#endregion
    //#region AddFiltersDialog States
    @observable addFiltersError: Error | undefined = undefined;
    @observable creatingFilter = false;
    @observable addFiltersDialogOpen = false;
    @observable addFiltersDialogType: AddFiltersDialogType = undefined;
    //#endregion
    //#region NavigationMenu States
    @persist @observable sideNavOpen = false;
    //#endregion
    //#region AddOverview States
    @observable addOverviewOpen = false;
    //#endregion
    //#region ToolbarTour States
    @persist @observable toolbarTourOpen = true;
    //#endregion
    //#region StudentTable States
    @observable studentTableFilterText = '';
    //#endregion
    //#region StaffTable States
    @observable staffTableFilterText = '';
    //#endregion
    //#region RoomTable States
    @observable roomTableFilterText = '';
    //#endregion

    //#region LoginDialog Functions
    @action
    setLoginError(error: Error | undefined): void {
        this.loginError = error;
    }

    @action
    setLoginAuthenticating(authenticating: boolean): void {
        this.loginAuthenticating = authenticating;
    }
    //#endregion
    //#region Staff Dialog Functions
    @action
    setStaffDialogOpen(open: boolean, type?: AddDialogType): void {
        if (open) {
            this.staffDialogType = type;
        }

        this.staffDialogOpen = open;
    }
    @action
    setCreatingStaff(creating: boolean): void {
        this.creatingStaff = creating;
    }
    //#endregion
    //#region Student Dialog Functions
    @action
    setStudentDialogOpen(open: boolean, type?: AddDialogType): void {
        if (open) {
            this.studentDialogType = type;
        }

        this.studentDialogOpen = open;
    }
    //#endregion
    //#region Room Dialog Functions
    @action
    setRoomDialogOpen(open: boolean, type?: AddDialogType): void {
        if (open) {
            this.roomDialogType = type;
        }

        this.roomDialogOpen = open;
    }
    @action
    setCreatingRoom(creating: boolean): void {
        this.creatingRoom = creating;
    }
    //#endregion
    //#region Add Types Dialog Functions
    @action
    setAddTypesDialogOpen(open: boolean, type?: AddTypesDialogType): void {
        if (open) {
            this.addTypesDialogType = type;
        }

        this.addTypesDialogOpen = open;
    }
    //#endregion
    //#region Add Filters Dialog Functions
    @action
    setAddFiltersDialogOpen(open: boolean, type?: AddFiltersDialogType): void {
        if (open) {
            this.addFiltersDialogType = type;
        }

        this.addFiltersDialogOpen = open;
    }
    //#endregion
    //#region NavigationMenu Functions
    @action
    toggleSideNav(open?: boolean): void {
        this.addOverviewOpen = false;
        this.sideNavOpen = open !== undefined ? open : !this.sideNavOpen;
    }
    //#endregion
    //#region AddOverview Functions
    @action
    toggleAddOverview(open?: boolean): void {
        this.sideNavOpen = false;
        this.addOverviewOpen = open !== undefined ? open : !this.addOverviewOpen;
    }
    //#endregion
    //#region ToolbarTour Functions
    @action
    setToolbarTourOpen(open: boolean): void {
      this.toolbarTourOpen = open;
    }
    //#endregion
    //#region Student Table Functions
    @action
    setStudentTableFilterText(text: string): void {
      this.studentTableFilterText = text;
    }
    //#endregion
    //#region Student Table Functions
    @action
    setStaffTableFilterText(text: string): void {
      this.staffTableFilterText = text;
    }
    //#endregion
    //#region Room Table Functions
    @action
    setRoomTableFilterText(text: string): void {
      this.roomTableFilterText = text;
    }
    //#endregion
}