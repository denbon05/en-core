import type { ServerResponse } from 'http';
import { checkIsUserAuthorized } from '../utils/auth';
import { t } from '../server/utils/i18n';
import type {
  ApiControllerPath,
  ApiIncomingMsg,
  ControllerPathPart,
} from '@/types/api';

// forbidden URLs by group type
const unauthorizedForbidden: ControllerPathPart[] = [
  'google',
  'data',
  'lesson',
];

export default <CPath extends ApiControllerPath>(
  { url, cookies: { auth } }: ApiIncomingMsg<CPath>,
  res: ServerResponse,
  next: (err?: Error) => void
) => {
  const isUserAuthorized = checkIsUserAuthorized(auth);
  if (
    !isUserAuthorized &&
    unauthorizedForbidden.some((forbiddenURI) => url.includes(forbiddenURI))
  ) {
    return res.end(
      JSON.stringify({
        isSuccess: false,
        message: t('error.unauthorized'),
        code: 401,
      })
    );
  }
  next();
};
