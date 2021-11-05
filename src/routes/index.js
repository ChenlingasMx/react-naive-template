import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import DevOptions from '../pages/DevOptions';

export const stackPageData = [
  {
    name: 'Home',
    component: Home,
    options: {
      // headerShown: false,
      // header: () => null
    },
  },
  {
    name: 'SignIn',
    component: SignIn,
    options: {
      headerShown: false,
      header: () => null,
    },
  },
  {
    name: 'DevOptions',
    component: DevOptions,
    options: {
      headerShown: false,
      header: () => null,
    },
  },
];
