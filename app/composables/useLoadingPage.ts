export const useLoadingPage = () => {
  return useState<boolean>('isLoadingPage', () => false);
};
