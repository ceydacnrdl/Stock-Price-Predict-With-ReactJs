import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Main from "./components/Main";
import { Route, Routes } from "react-router";
import News from "./components/News";
import { ofetch } from "ofetch";
import Exchange from "./components/Exchange";
import SignPage from "./views/SignPage";
import SignUp from "./views/SignUp";
import { Link, useNavigate } from "react-router-dom";
import Title from "./components/Title";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [stockPrice, setStockPrice] = useState([]);

  const [auth, setAuth] = useState(false);

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate;

  async function getLiveBorsa() {
    try {
      const resp2 = await axios.get(
        "https://api.collectapi.com/economy/liveBorsa",
        {
          headers: {
            authorization:
              "apikey 79HB5bNK4YkptuG1Zj9LlW:1aVyiy8DpTcSk9redwdf1l",
            "content-type": "application/json",
          },
        }
      );

      setStockPrice(resp2.data.result);
    } catch (error) {
      console.error("Error getting live Borsa data:", error.message);
    }
  }

  async function getNewsData() {
    const resp = await axios.get(
      "https://api.collectapi.com/news/getNews?country=tr&tag=general&apiKey=79HB5bNK4YkptuG1Zj9LlW:1aVyiy8DpTcSk9redwdf1l"
    );
    setNewsData(resp.data.result);
  }

  return (
    <div>
      <Routes>
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
              <Title></Title>
              <Header stockPrice={stockPrice}></Header>
              <SideBar></SideBar>
            </div>
          }
        />
        <Route
          path="/exchange"
          element={
            <div>
              <Header stockPrice={stockPrice}></Header>
              <SideBar></SideBar>
              <Exchange></Exchange>
            </div>
          }
        />
        <Route
          path="/prices"
          element={
            <div>
              <Header stockPrice={stockPrice}></Header>
              <SideBar></SideBar>
              <Main></Main>
            </div>
          }
        />
        <Route
          path="/wallets"
          element={
            <div>
              <Header stockPrice={stockPrice}></Header>
              <SideBar></SideBar>
              <Main></Main>
            </div>
          }
        />
        <Route
          path="/news"
          element={
            <div>
              <Header stockPrice={stockPrice}></Header>
              <SideBar></SideBar>
              <News newsData={newsData}></News>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
