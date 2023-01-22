// Todo: define interface for each api return value

// type ApiResponse = {
//   ping: {
//     check: boolean;
//     bar: string;
//   };
//   pong: {
//     foo: number;
//   };
// };

export type ApiMethodByController = {
  ping: 'check'
}

export type ApiController = keyof ApiMethodByController
