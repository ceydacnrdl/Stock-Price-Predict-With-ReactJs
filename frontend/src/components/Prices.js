import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import { ButtonGroup } from "reactstrap";

function Prices() {
  const [stockPrice, setStockPrice] = useState(null);
  const [value, setValue] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  axios.defaults.withCredentials = true;

  const fetchStockData = (category) => {
    axios
      .get(`http://localhost:8081/fetch?category=${category}`)
      .then((response) => {
        setStockPrice(response.data.result);
        setActiveCategory(category);

        // Kategoriye göre value state'ini güncelle
        switch (category) {
          case "liveBorsa":
            setValue(["currency", "name", "price", "rate", "time"]);
            break;
          case "cripto":
            setValue([
              "currency",
              "code",
              "changeHour",
              "changeDay",
              "changeWeek",
              "volume",
              "price",
              "circulatingSupply",
              "marketCap",
            ]);
            break;
          case "emtia":
            setValue(["name", "buying", "selling", "time", "rate"]);
            break;
          case "allCurrency":
            setValue(["name", "buying", "selling"]);
            break;
          default:
            setValue([]);
        }
      })
      .catch((error) => {
        console.error("Error getting live Borsa data:", error.message);
      });
  };

  const renderTableHeaders = () => {
    // Kategoriye göre başlıkları döndür
    return (
      <>
        {value.map((header, index) => (
          <th key={index}>{header.toUpperCase()}</th>
        ))}
      </>
    );
  };

  const renderTableData = () => {
    if (!stockPrice) {
      return null;
    }

    return stockPrice.map((stock, index) => (
      <tr key={index}>
        {value.map((header, headerIndex) => (
          <td key={headerIndex}>{stock[header]}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute ">
      <ButtonGroup className="my-2" size="lg">
        <Button outline onClick={() => fetchStockData("liveBorsa")}>
          Stock
        </Button>
        <Button outline onClick={() => fetchStockData("cripto")}>
          Cripto
        </Button>
        <Button outline onClick={() => fetchStockData("emtia")}>
          Commodities
        </Button>
        <Button outline onClick={() => fetchStockData("allCurrency")}>
          Currencies
        </Button>
      </ButtonGroup>

      <Table bordered>
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </Table>
    </div>
  );
}

export default Prices;
