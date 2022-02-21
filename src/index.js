import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Header, PrivateRoute, PublicRoute } from "./components";
import {
  ChatPage,
  ProfilePage,
  GistsPage,
  LoginPage,
  SignUpPage,
} from "./pages";
import { CustomThemeProvider } from "./theme-context";
import { store, persistor } from "./store";
import { firebaseApp } from "./api/firebase";
// import { store } from "./store/my-redux";
import "./global.css";
import "./palette.css";

const App = () => {
  //@TODO перенсти в стор
  const [session, setSession] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(null);
      }
    });
  }, []);

  const isAuth = !!session;

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CustomThemeProvider>
            <BrowserRouter>
              <Header session={session} />

              <Routes>
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute isAuth={isAuth}>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/chat/*"
                  element={
                    <PrivateRoute isAuth={isAuth}>
                      <ChatPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<h1>Home page</h1>} />
                <Route
                  path="/gists"
                  element={
                    <PrivateRoute isAuth={isAuth}>
                      <GistsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute isAuth={isAuth}>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/sign-up"
                  element={
                    <PublicRoute isAuth={isAuth}>
                      <SignUpPage />
                    </PublicRoute>
                  }
                />
                <Route path="/*" element={<h1>404</h1>} />
              </Routes>
            </BrowserRouter>
          </CustomThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// const Test = ({ children }) => {
//   const [state, setState] = useState(0);

//   return (
//     <div>
//       <h1>Test component</h1>
//       <div>{children(state, setState)}</div>
//     </div>
//   );
// };
