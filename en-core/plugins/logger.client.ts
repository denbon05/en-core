import type { Context, Inject } from '@nuxt/types/app';
import Rollbar from 'rollbar';
import appMode from '@/server/config/mode';

export default (
  { $config: { rollbarClientAccessToken } }: Context,
  inject: Inject
) => {
  const rollbar = new Rollbar({
    accessToken: rollbarClientAccessToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: appMode.isProd,
  });

  if (appMode.isProd) {
    // inject rollbar only in prod mode
    inject('logger', rollbar);
  } else {
    inject('logger', console);
  }
};
