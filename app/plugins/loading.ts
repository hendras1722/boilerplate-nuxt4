export default defineNuxtPlugin((nuxtApp) => {
  const loadingSplashScreen = useLoadingSplashScreen();
  const loadingPage = useLoadingPage();

  nuxtApp.hook('page:loading:start', () => {
    loadingSplashScreen.value = true;
  });

  nuxtApp.hook('page:loading:end', () => {
    const i = setTimeout(() => {
      loadingPage.value = false;
      loadingSplashScreen.value = false;
      clearTimeout(i);
    }, 500);
  });

  nuxtApp.hook('page:start', () => {
    loadingSplashScreen.value = false;
    loadingPage.value = true;
  });

  nuxtApp.hook('app:error', () => {
    const i = setTimeout(() => {
      loadingSplashScreen.value = false;
      clearTimeout(i);
    }, 1000);
  });
});
