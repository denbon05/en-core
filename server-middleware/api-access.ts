import type { ServerResponse } from 'http';
import { checkIsUserAuthorized } from '../utils/auth';
import type {
  ApiControllerPath,
  ApiIncomingMsg,
  ControllerPathPart,
} from '@/types/api';

// forbidden URLs by group type
const unauthorizedForbidden: ControllerPathPart[] = ['google', 'data'];

export default <CPath extends ApiControllerPath>(
  { url, cookies: { auth } }: ApiIncomingMsg<CPath>,
  res: ServerResponse,
  next: (err?: Error) => void
) => {
  const isUserAuthorized = checkIsUserAuthorized(auth);

  if (
    !isUserAuthorized &&
    unauthorizedForbidden.some((forbiddenURI) => url.startsWith(forbiddenURI))
  ) {
    return res.end({
      isSuccess: false,
      message: 'Authenticate first',
    });
  }
  next();
};
