export type GetUserParam = {
  email: string;
  passwordDigest: string;
};

export type UserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  oauthDigest: null | string;
  role: {
    id: number;
    name: 'superadmin' | 'admin' | 'tutor' | 'student';
  };
  calendarId?: string;
};

export type UserFetched = Omit<UserData, 'calendarId'>;
