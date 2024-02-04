import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./style.css";

const Header = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [stockPrice, setStockPrice] = useState([]);
  axios.defaults.withCredentials = true;

  const fetchStockData = (category) => {
    axios
      .get(`http://localhost:8081/fetch?category=${category}`)
      .then((response) => {
        setStockPrice(response.data.result);
      })
      .catch((error) => {
        console.error("Error getting live Borsa data:", error.message);
      });
  };

  useEffect(() => {
    fetchStockData("liveBorsa");
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.Status === "Success") {
          setName(res.data.name);
        } else {
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-[1250px] h-[95px] absolute left-[269px] top-0 bg-gray-50 border-r">
      <div className="centered-marquee">
        <marquee>
          {stockPrice.map((stockData, index) => (
            <span key={index}>
              {stockData.name} {":"} {stockData.price}
              {stockData.rate < 0 ? (
                <FontAwesomeIcon
                  icon={faArrowDown}
                  beatFade
                  size="xs"
                  style={{ color: "#ff0000" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowUp}
                  beatFade
                  size="xs"
                  style={{ color: "#44ff00" }}
                />
              )}
              {stockData.rate}
            </span>
          ))}
        </marquee>
      </div>

      <div className="w-11 h-11 right-4 top-4 absolute bg-blue-600 rounded-full flex items-center justify-center opacity-70">
        <h2 className="text-white font-bold">{name.charAt(0)}</h2>
      </div>
    </div>
  );
};

export default Header;
