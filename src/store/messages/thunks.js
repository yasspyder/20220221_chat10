import {
  sendMessage,
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
  sendMessagesStart,
  sendMessagesSuccess,
  sendMessagesError,
} from "./actions";

export const sendMessageWithBot = (roomId, message) => (dispatch, getState) => {
  dispatch(sendMessage(roomId, message));

  if (message.author === "User") {
    setTimeout(() => {
      dispatch(
        sendMessage(roomId, {
          author: "Bot",
          message: "Hello from bot thunk",
        })
      );
    }, 500);
  }
};

export const getMessages = () => async (dispatch, _, api) => {
  const messages = {};

  try {
    dispatch(getMessagesStart());

    const snapshot = await api.getMessagesApi();

    snapshot.forEach((snap) => {
      messages[snap.key] = Object.values(snap.val());
    });

    dispatch(getMessagesSuccess(messages));
  } catch (e) {
    dispatch(getMessagesError(e));
  }
};

export const sendMessageFB = (roomId, message) => async (dispatch, _, api) => {
  try {
    dispatch(sendMessagesStart());

    const newMessage = await api.sendMessageApi(roomId, message);

    dispatch(sendMessagesSuccess(roomId, newMessage));

    if (message.author === "User") {
      setTimeout(() => {
        dispatch(
          sendMessageFB(roomId, {
            author: "Bot",
            message: "Hello from bot thunk",
          })
        );
      }, 500);
    }
  } catch (e) {
    dispatch(sendMessagesError(e));
  }
};
