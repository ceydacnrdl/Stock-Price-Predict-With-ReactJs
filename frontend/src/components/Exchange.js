import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Button, Col, Form, FormGroup, FormText, Label } from "reactstrap";
import axios from "axios";

function Exchange() {
  const [selectedRadio, setSelectedRadio] = useState("buy");
  const [currentDate, setCurrentDate] = useState(getDate());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("liveBorsa");
  const [dropdownValue, setDropdownValue] = useState([]);
  const [productPrices, setProductPrices] = useState({});
  const [values, setValues] = useState({
    kullanici_id: "",
    urun_adi: "",
    urun_lot: "",
    urun_alissatis: "",
    urun_fiyat: "",
    islem_tarihi: "",
    sonuc: "",
  });

  const fetchStockData = (activeTab) => {
    axios
      .get(`http://localhost:8081/fetch?category=${activeTab}`)
      .then((response) => {
        // setStockPrice(response.data.result);
        setActiveTab(activeTab);

        // Kategoriye göre value state'ini güncelle
        switch (activeTab) {
          case "liveBorsa":
            setDropdownValue(response.data.result.map((item) => item.name));
            setProductPrices(
              response.data.result.reduce((acc, item) => {
                acc[item.name] = item.price;
                return acc;
              }, {})
            );
            break;
          case "cripto":
            setDropdownValue(response.data.result.map((item) => item.name));
            setProductPrices(
              response.data.result.reduce((acc, item) => {
                acc[item.name] = item.price;
                return acc;
              }, {})
            );
            break;
          case "emtia":
            setDropdownValue(response.data.result.map((item) => item.name));
            setProductPrices(
              response.data.result.reduce((acc, item) => {
                const priceKey = selectedRadio === "buy" ? "buying" : "selling";
                acc[item.name] = item[priceKey];
                return acc;
              }, {})
            );
            break;
          case "allCurrency":
            setDropdownValue(response.data.result.map((item) => item.name));
            setProductPrices(
              response.data.result.reduce((acc, item) => {
                const priceKey = selectedRadio === "buy" ? "buying" : "selling";
                acc[item.name] = item[priceKey];
                return acc;
              }, {})
            );
            break;
          default:
            setDropdownValue([]);
            setProductPrices([]);
        }
      })
      .catch((error) => {
        console.error("Error getting live Borsa data:", error.message);
      });
  };

  const handleRadioChange = (value) => {
    setSelectedRadio(value, () => {
      setValues({ ...values, urun_alissatis: selectedRadio });
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(getDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getDate() {
    const today = new Date();
    const formattedTime = today.toLocaleTimeString();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year} ${formattedTime}`;
  }

  const handleTransaction = () => {
    const isBuy = selectedRadio === "buy";
    const resultSign = isBuy ? -1 : 1;
    const result = resultSign * (values.urun_fiyat * values.urun_lot);
    console.log(result);
    setValues({
      ...values,
      islem_tarihi: currentDate,
      urun_alissatis: selectedRadio,
      sonuc: result,
    }); // islem_tarihi'yi güncelle
    console.log(currentDate);
    axios
      .post("http://localhost:8081/addPortfolio", {
        ...values,
        islem_tarihi: new Date(),
        urun_alissatis: selectedRadio,
        sonuc: result,
      })
      .then((response) => {
        console.log("Transaction added:", response.data);
        // İşlem başarılı ise gerekirse ek işlemler yapabilirsiniz.
      })
      .catch((error) => {
        console.error("Error adding transaction:", error.message);
      });
  };

  return (
    <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute d-flex">
      <div className="w-[20%] p-8 bg-white rounded-lg shadow-lg mr-4 flex items-center justify-center">
        <div className="absolute flex-col justify-start items-center gap-8 inline-flex top-7">
          <a
            onClick={() => fetchStockData("liveBorsa")}
            className={`no-underline utility justify-center items-center gap-4 inline-flex p-2 ${
              activeTab === "liveBorsa" ? "text-blue-700" : "text-gray-700"
            }`}
          >
            <div className="text-lg font-bold font-['Inter'] leading-snug">
              Stock
            </div>
          </a>
          <a
            onClick={() => fetchStockData("cripto")}
            className={`no-underline utility justify-center items-center gap-4 inline-flex p-2 ${
              activeTab === "cripto" ? "text-blue-700" : "text-gray-700"
            }`}
          >
            <div className="text-lg font-bold font-['Inter'] leading-snug">
              Crypto
            </div>
          </a>
          <a
            onClick={() => fetchStockData("emtia")}
            className={`justify-center items-center gap-4 inline-flex no-underline utility p-2 ${
              activeTab === "emtia" ? "text-blue-700" : "text-gray-700"
            }`}
          >
            <div className="text-lg font-bold font-['Inter'] leading-snug">
              Commodities
            </div>
          </a>
          <div
            onClick={() => fetchStockData("allCurrency")}
            className={`text-lg font-bold font-['Inter'] leading-snug p-2 no-underline utility ${
              activeTab === "allCurrency" ? "text-blue-700" : "text-gray-700"
            }`}
          >
            Currency
          </div>
        </div>
      </div>

      <div className="w-[80%] p-8 bg-white rounded-lg shadow-lg ml-2">
        <Form>
          <label>{currentDate}</label>
          <FormGroup row>
            <Label for="exampleSelect" sm={2}>
              SECINIZ
            </Label>
            <Col sm={10}>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                onChange={(e) => {
                  const selectedProduct = e.target.value;
                  const selectedPrice = productPrices[selectedProduct] || "";
                  setValues({
                    ...values,
                    urun_adi: selectedProduct,
                    urun_fiyat: selectedPrice,
                  });

                  // Fiyatı yazılması gereken inputu güncelle
                  const priceInput = document.getElementById("price");
                  if (priceInput) {
                    priceInput.value = selectedPrice;
                  }
                }}
              >
                {dropdownValue.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="lot" sm={2}>
              LOT
            </Label>
            <Col sm={10}>
              <Input
                id="lot"
                name="lot"
                placeholder="lot miktarını giriniz"
                type="text"
                onChange={(e) =>
                  setValues({ ...values, urun_lot: e.target.value })
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row tag="fieldset">
            <legend className="col-form-label col-sm-2">ALIS/SATIS</legend>
            <Col sm={10}>
              <FormGroup check>
                <Input
                  name="radio2"
                  type="radio"
                  onChange={(e) => {
                    handleRadioChange("buy"); // İlk onChange işlemi
                    setValues({ ...values, urun_alissatis: e.target.value }); // İkinci onChange işlemi
                  }}
                  checked={selectedRadio === "buy"}
                />{" "}
                <Label check>ALIŞ</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="radio2"
                  type="radio"
                  onChange={(e) => {
                    handleRadioChange("sell"); // İlk onChange işlemi
                    setValues({ ...values, urun_alissatis: e.target.value }); // İkinci onChange işlemi
                  }}
                  checked={selectedRadio === "sell"}
                />{" "}
                <Label check>SATIŞ</Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="price" sm={2}>
              FIYAT
            </Label>
            <Col sm={10}>
              <Input
                id="price"
                name="price"
                placeholder="fiyat giriniz"
                type="text"
                onChange={(e) => {
                  setValues({ ...values, urun_fiyat: e.target.value }); // İkinci onChange işlemi
                }}
              ></Input>
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col
              sm={{
                offset: 2,
                size: 10,
              }}
            >
              <Button onClick={handleTransaction}>{selectedRadio}</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}

export default Exchange;
