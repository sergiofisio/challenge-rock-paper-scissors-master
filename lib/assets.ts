/** Prefix public paths with the GitHub Pages basePath when set. */
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
