import {
  DELETE_MESSAGE_BY_ID,
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from "./types";

export const sendMessage = (roomId, message) => ({
  type: SEND_MESSAGE,
  payload: { roomId, message },
  // meta: {
  //   delay: 3000,
  // },
});

export const deleteMessage = (roomId, messageId) => ({
  type: DELETE_MESSAGE_BY_ID,
  payload: { roomId, messageId },
});

export const getMessagesStart = () => ({
  type: GET_MESSAGES_START,
});

export const getMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
});

export const getMessagesError = (error) => ({
  type: GET_MESSAGES_ERROR,
  payload: error,
});

export const sendMessagesStart = () => ({
  type: SEND_MESSAGE_START,
});

export const sendMessagesSuccess = (roomId, message) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: { roomId, message },
});

export const sendMessagesError = (error) => ({
  type: SEND_MESSAGE_ERROR,
  payload: error,
});
