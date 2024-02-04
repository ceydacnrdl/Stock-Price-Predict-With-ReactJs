import "./App.css";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import { Route, Routes } from "react-router";
import News from "./components/News";
import Exchange from "./components/Exchange";
import SignPage from "./views/SignPage";
import SignUp from "./views/SignUp";
import Prices from "./components/Prices";
import Wallets from "./components/Wallets";
import AISupport from "./components/AISupport";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/logout"
          element={
            <div>
              <SignPage />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <SignPage />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div>
              <SignUp></SignUp>
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <div>
              <Header></Header>
              <SideBar></SideBar>
              <Prices></Prices>
            </div>
          }
        />
        <Route
          path="/exchange"
          element={
            <div>
              <Header></Header>
              <SideBar></SideBar>
              <Exchange></Exchange>
            </div>
          }
        />
        <Route
          path="/fetch-liveBorsa"
          element={
            <div>
              <Header></Header>
              <SideBar></SideBar>
              <Prices></Prices>
            </div>
          }
        />
        <Route
          path="/wallets"
          element={
            <div>
              <Header></Header>
              <SideBar></SideBar>
              <Wallets></Wallets>
            </div>
          }
        />
        <Route
          path="/AISupport"
          element={
            <div>
              <Header></Header>
              <SideBar></SideBar>

              <AISupport></AISupport>
            </div>
          }
        />

        <Route
          path="/news"
          element={
            <div>
              <Header></Header>
              <SideBar></SideBar>
              <News></News>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
