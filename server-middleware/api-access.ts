import type { ServerResponse } from 'http';
import debug from 'debug';
import { checkIsUserAuthorized } from '../utils/auth';
import { HttpException } from '../utils/errors';
import { BookParam } from '@/types/api/lesson';
import type {
  ApiControllerPath,
  ApiIncomingMsg,
  ControllerPathPart,
} from '@/types/api';

const log = debug('app:api:access');
// todo move permission logic to separated module

// forbidden URLs by group type
const unauthorizedForbidden: ControllerPathPart[] = [
  'google',
  'data',
  'lesson',
];

const getStatusCode = <CPath extends ApiControllerPath>(
  url: CPath,
  auth: string
): number => {
  const isUserAuthorized = checkIsUserAuthorized(auth);
  if (!isUserAuthorized) {
    return 401;
  }

  const isAccessDenied = unauthorizedForbidden.some((forbiddenURI) =>
    url.includes(forbiddenURI)
  );
  if (isAccessDenied) {
    return 403;
  }

  return 200; // ok
};

const canUserProceed = <CPath extends ApiControllerPath>(
  url: CPath,
  auth: string,
  params: ApiIncomingMsg<CPath>['params']
): boolean => {
  const isUserAuthorized = checkIsUserAuthorized(auth);

  if (isUserAuthorized) {
    // user already authorized
    return true;
  }

  // user is unauthorized
  const isUserTryBookTrial =
    url.includes('user/lesson/book') && (params as BookParam)?.type === 'TRIAL';
  const isURLReachable = !unauthorizedForbidden.some((forbiddenURI) =>
    url.includes(forbiddenURI)
  );

  return isUserTryBookTrial || isURLReachable;
};

export default <CPath extends ApiControllerPath>(
  { url, cookies: { auth }, params }: ApiIncomingMsg<CPath>,
  _res: ServerResponse,
  next: (err?: Error) => void
) => {
  const isAccessAllowed = canUserProceed(url, auth, params);
  if (isAccessAllowed) {
    // everything is cool
    return next();
  }

  const statusCode = getStatusCode(url, auth);
  log('API access denied %O', { url, statusCode });
  const error = new HttpException();
  error.statusCode = statusCode;
  next(error);
};
