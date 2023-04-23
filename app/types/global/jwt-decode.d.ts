import 'jwt-decode';

declare module 'jwt-decode' {
  export default function (jwt: string): {
    email: string;
    iat: number;
  };
}
