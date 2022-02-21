import { nanoid } from "nanoid";
import { db } from "./firebase";

// const d = {
//   conversations: {
//     room1: {
//       title: "room1",
//       // value: "",
//     }
//   }
//   messages: {}
// }

export const getMessagesApi = () => {
  return db.ref("messages").get();
};

export const sendMessageApi = async (roomId, message) => {
  const newMessage = { ...message, id: nanoid(), date: String(new Date()) };

  await db.ref("messages").child(roomId).push(newMessage);

  return newMessage;
};
