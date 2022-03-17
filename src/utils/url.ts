export const getLinkParams = (link: string | null, paramName: string): string | null => {
  if (!link) {
    return null;
  }

  const url = new URL(link);
  const searchParams = new URLSearchParams(url.search);

  return searchParams.get(paramName);
};
