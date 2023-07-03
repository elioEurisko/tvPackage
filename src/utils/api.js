const refreshTokenApi = "api/refreshToken";
const getVODLandingApi = "api/videoLanding/dashboard";
const changeBookmarkApi = "api/bookmarks";
const forgotPasswordApi = "api/users/sendResetOtp";
const userProfileApi = "api/users/profile";
const vodDetailsApi = "api/videos/detailsElastic";
const vodShowDetailsApi = "api/shows/detailsElastic";
const continueWatchingApi = "api/videos/track";
const deleteContinueWatchingApi = "api/videos/track/remove";
const getEpisodesPerShowApi = "api/episodes/perSeason";
const privacyPolicyApi = "api/pages/privacyPolicy";
const aboutUsApi = "api/pages/aboutUs/web";
const frequencyApi = "api/pages/frequency";
const termsAndConditionsApi = "api/pages/termsAndConditions";
// const contactUsApi = 'api/pages/contactUs/form';
const getContactUsApi = "api/pages/contactUs";
const changePasswordApi = "api/users/password/change";
const latestVideosApi = "api/videoLanding/latest";
const VODBookmarkApi = "api/videosBookmarks";
const VODLandingSettingsApi = "api/videoLanding/settings";
const videoGalleryListApi = "api/dashboard/videoGallery";
const moviesApi = "api/videoLanding/movies";
const showsApi = "api/videoLanding/shows";
const videosPerGenreApi = "api/videoLanding/genre";
const VODSearchApi = "api/videos/search";
const getVODCategoriesListApi = "api/video/categories/list";
const getGenresListApi = "api/video/genres/list";
const videoPlayerApi = "api/videos/player";
const videoTracksApi = "api/videos/track";
const mostWatchedApi = "api/videoLanding/mostWatched";
const videosPerCategoryApi = "api/videoLanding/category";

export {
  aboutUsApi,
  changeBookmarkApi,
  changePasswordApi,
  continueWatchingApi,
  deleteContinueWatchingApi,
  forgotPasswordApi,
  frequencyApi,
  getContactUsApi,
  getEpisodesPerShowApi,
  getGenresListApi,
  getVODCategoriesListApi,
  getVODLandingApi,
  latestVideosApi,
  mostWatchedApi,
  moviesApi,
  privacyPolicyApi,
  refreshTokenApi,
  showsApi,
  termsAndConditionsApi,
  userProfileApi,
  videoGalleryListApi,
  videoPlayerApi,
  videosPerCategoryApi,
  videosPerGenreApi,
  videoTracksApi,
  VODBookmarkApi,
  vodDetailsApi,
  VODLandingSettingsApi,
  VODSearchApi,
  vodShowDetailsApi,
};
