// todo: key to value instead of using extentionToFullName
export const text = ['txt', 'py', 'js', 'cs', 'cpp', 'c', 'java'];
export const audio = ['wav', 'mp3'];
export const video = ['mp4', 'flv'];
export const image = ['png', 'jpg', 'jpeg'];
export const availableExtensions = [...text, ...audio, ...video, ...image];

export const extensionToFullName = (extension: string): string => {
  if (extension === 'js') return 'javascript';
  else if (extension === 'py') return 'python';
  return 'text';
};
