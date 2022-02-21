import {
  messagesReducer,
  sendMessage,
  deleteMessage,
  getMessagesStart,
  getMessagesError,
  getMessagesSuccess,
} from "../../messages";

describe("message reducer", () => {
  describe("get messages types", () => {
    it("start", () => {
      const state = messagesReducer(
        { pending: false, error: true },
        getMessagesStart()
      );

      expect(state.pending).toBe(true);
      expect(state.error).toBe(null);
    });
    it("sucess", () => {
      const MESSAGES = "test messages";

      const state = messagesReducer(
        { pending: true, messages: {} },
        getMessagesSuccess(MESSAGES)
      );

      expect(state.pending).toBe(false);
      expect(state.messages).toBe(MESSAGES);
    });
    it("error", () => {
      const ERROR = "test error";

      const state = messagesReducer(
        { pending: true, error: null },
        getMessagesError(ERROR)
      );

      expect(state.pending).toBe(false);
      expect(state.error).toBe(ERROR);
    });
  });

  describe("other types", () => {
    it("send message", () => {
      const MESSAGE = { author: "User", message: "Test" };

      const state = messagesReducer(
        { messages: {} },
        sendMessage("room1", MESSAGE)
      );

      // expect(state.messages).toEqual({
      //   room1: [MESSAGE],
      // });
      expect(state.messages.room1).toBeDefined();
      expect(state.messages.room1.length).toBe(1);
      expect(state.messages.room1[0].author).toBe(MESSAGE.author);
      expect(state.messages.room1[0].message).toBe(MESSAGE.message);
    });

    it("delete message by id", () => {
      const state = messagesReducer(
        {
          messages: {
            room1: [{ id: 1 }],
          },
        },
        deleteMessage("room1", 1)
      );

      expect(state.messages.room1.length).toBe(0);
    });
  });
});
