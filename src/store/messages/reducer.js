import { nanoid } from "nanoid";
import {
  SEND_MESSAGE,
  DELETE_MESSAGE_BY_ID,
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from "./types";

const initialState = {
  pending: false,
  error: null,
  messages: {
    room1: [
      { author: "User", message: "value 1", date: new Date(), id: nanoid() },
      { author: "Bot", message: "value 2", date: new Date(), id: nanoid() },
    ],
  },
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            ...(state.messages[action.payload.roomId] ?? []),
            action.payload.message,
            // { ...action.payload.message, id: nanoid(), date: new Date() },
          ],
        },
      };
    case DELETE_MESSAGE_BY_ID:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: state.messages[action.payload.roomId].filter(
            (message) => message.id !== action.payload.messageId
          ),
        },
      };

    case GET_MESSAGES_START:
      return { ...state, pending: true, error: null };
    case GET_MESSAGES_SUCCESS:
      return { ...state, pending: false, messages: action.payload };
    case GET_MESSAGES_ERROR:
      return { ...state, pending: false, error: action.payload };
    // case SEND_MESSAGE_START:
    //   return { ...state, pending: true, error: null };
    // case SEND_MESSAGE_ERROR:
    //   return { ...state, pending: false, error: action.payload };
    default:
      return state;
  }
};
