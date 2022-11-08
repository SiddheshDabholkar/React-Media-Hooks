export const getSize = (bytes: number) => {
  if (bytes !== 0) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const size: any = (bytes / Math.pow(1024, i)).toFixed(2);
    return size * 1 + " " + sizes[i];
  }
};
