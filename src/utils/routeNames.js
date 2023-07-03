const routeNames = {
  home: '/',
  termsAndConditions: '/terms-and-conditions',
  privacyPolicy: '/privacy-policy',
  contactUs: '/contact-us',
  aboutUs: '/about-us',
  frequency: '/frequency',
  login: '/login',
  signUp: '/register',
  forgotPassword: '/forgotPassword',
  otp: '/otp',
  VODDetails: (id) => ({
    as: `/VODDetails/${id}`,
    href: '/VODDetails/:id',
  }),
  profile: '/profile',
  custom404: '/404',
  latestVideos: '/latestVideos',
  movies: '/movies',
  shows: '/shows',
  videosPerGenre: (id) => ({
    as: `/videosPerGenre/${id}`,
    href: '/videosPerGenre/:id',
  }),
  videosPerCategory: (id) => ({
    as: `/videosPerCategory/${id}`,
    href: '/videosPerCategory/:id',
  }),
  watch: (id) => ({
    as: `/watch/${id}`,
    href: '/watch/:id',
  }),
  vodSearch: '/vodSearch',
  live: '/live',
};

// added "/[id]" as the js file is created like that
export const noHeaderPages = [routeNames.login, routeNames.otp, routeNames.forgotPassword, routeNames.live];
export const noFooterPages = [];
export const noSqueezPages = [routeNames.login, routeNames.otp, routeNames.forgotPassword];

export const noScroll = [routeNames.custom404];

export const noVODButtonPath = [routeNames.home];

export const headerPositionAbsolute = [routeNames.home];

export default routeNames;
