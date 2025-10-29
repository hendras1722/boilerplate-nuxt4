export const useLoadingSplashScreen = () => {
  return useState<boolean>('isLoadingSplashScreen', () => false);
};
