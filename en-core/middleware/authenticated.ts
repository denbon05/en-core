import type { Context } from '@nuxt/types/app';

export default ({ store, redirect, route }: Context) => {
  const isUserAuthenticated = store.getters['user/isAuthenticated'];

  if (isUserAuthenticated && route.path === '/auth') {
    redirect('/profile');
  } else if (!isUserAuthenticated && route.path === '/profile') {
    redirect('/auth');
  }
};
