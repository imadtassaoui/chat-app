export const OnlyCurrentUserMessages = (datas, currentUser, reciverId) => {
  return datas.filter(
    (data) =>
      (reciverId === data.sentBy && currentUser.id === data.sentTo) ||
      (data.sentTo === reciverId && currentUser.id === data.sentBy)
  );
};

export const latestRecivedMessages = (userMessages, reciverId, currentUser) => {
  if (!userMessages) return;
  const only = OnlyCurrentUserMessages(
    userMessages.data,
    currentUser,
    reciverId
  );

  if (only.length > 0)
    return only.reduce((a, b) => {
      return a.createdAt.seconds > b.createdAt.seconds ? a : b;
    });
};
