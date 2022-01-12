export const OnlyCurrentUserMessages = (datas, currentUser) => {
  return datas.filter(
    (data) => data.sentBy === currentUser.id || data.sentTo === currentUser.id
  );
};
