import { SEND_MESSAGE, sendMessage } from "../messages";

export const botMessage = (store) => (next) => (action) => {
  if (
    action.type === SEND_MESSAGE &&
    action.payload.message.author === "User"
  ) {
    setTimeout(() => {
      store.dispatch(
        sendMessage(action.payload.roomId, {
          author: "Bot",
          message: "Hello fron bot",
        })
      );
    }, 500);
  }

  return next(action);
};
