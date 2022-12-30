export const truncateFilePath = (path: string): string => {
  const split = path.split("/");

  if (split.length > 4) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${split[0]}/${split[1]}/.../${split.at(-2)}/${split.at(-1)}`;
  }
  return path;
};
