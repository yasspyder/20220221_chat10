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

export const getConversationsApi = () => {
  return db.ref("conversations").get();
};

export const createConversationApi = (roomId) => {
  return db
    .ref("conversations")
    .child(roomId)
    .set({ title: roomId, value: "" });
};
