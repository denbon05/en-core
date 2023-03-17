import type { ServerResponse } from 'http';
import debug from 'debug';
import type { ApiControllerPath, ApiIncomingMsg } from '@/types/api';

const log = debug('app:api:access');

// const forbiddenForUnLoggedURLs: Set<ApiControllerPath> = new Set([
//   'user/config',
// ]);

export default <CPath extends ApiControllerPath>(
  { url, cookies: { auth } }: ApiIncomingMsg<CPath>,
  res: ServerResponse,
  next: (err?: Error) => void
) => {
  console.log({ url });
  // try {
  //   verifyJWT(auth);
  //   next();
  // } catch (err) {
  //   log('access err %O', err);
  //   next(err);
  // }
};
