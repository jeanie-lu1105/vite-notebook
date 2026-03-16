export const friendlyDate = (date: string) => {
  const now = new Date();
  const target = new Date(date);
  const diff = now.getTime() - target.getTime();
  if (diff < 60 * 1000) {
    return "Just now";
  } else if (diff < 60 * 60 * 1000) {
    return Math.floor(diff / (60 * 1000)) + " mins ago";
  } else if (diff < 24 * 60 * 60 * 1000) {
    return Math.floor(diff / (60 * 60 * 1000)) + " hours ago";
  } else if (diff < 7 * 24 * 60 * 60 * 1000) {
    return Math.floor(diff / (24 * 60 * 60 * 1000)) + " days ago";
  } else {
    return target.toLocaleDateString();
  }
};
