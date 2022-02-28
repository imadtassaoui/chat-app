export const OnlyCurrentUserMessages = (datas, currentUser, reciverId) => {
  return datas.filter(
    (data) =>
      (reciverId === data.sentBy && currentUser.id === data.sentTo) ||
      (data.sentTo === reciverId && currentUser.id === data.sentBy)
  );
};
