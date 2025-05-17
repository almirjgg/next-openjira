import { formatDistanceToNow } from 'date-fns';

export const getFormatDistanceToNow = (date: number): string => {
  const fromNow = formatDistanceToNow(date);

  return fromNow;
};
