import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, ChatList, MessageList } from "../components";
import { getConversationsFb } from "../store/conversations";
import { getMessages } from "../store/messages";

export const ChatPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = ({ code }) => {
      if (code === "Escape") {
        navigate("/chat");
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [navigate]);

  useEffect(() => {
    dispatch(getConversationsFb());
    dispatch(getMessages());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              chats={<ChatList />}
              messages={<h1 style={{ color: "#fff" }}>Выберите чат</h1>}
            />
          }
        />
        <Route
          path=":roomId"
          element={<Layout chats={<ChatList />} messages={<MessageList />} />}
        />
      </Routes>
    </>
  );
};
