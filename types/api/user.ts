export type GetUserParam = {
  email: string;
  passwordDigest: string;
};

export type UserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: {
    id: number;
    name: 'superadmin' | 'admin' | 'tutor' | 'student';
  };
};
