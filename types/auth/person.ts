export interface Person {
  isGuest(): boolean;
}

type UserPermission = {
  id: number;
  name: string;
};

export interface IUserData {
  firstName: string;
  lastName: string;
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
  permissions: UserPermission[];
  calendarId?: string;
}
