import React from "react";
import { Table } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Wallets() {
  const [portfoyData, setPortfoyData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [stockPrice, setStockPrice] = useState([]);

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Axios ile server'dan portföy verilerini çek
  //       const response = await axios.get(
  //         "http://localhost:8081/getPortfoyData"
  //       );
  //       const balance = response.data.reduce(
  //         (total, item) => total + item.urun_fiyat * item.urun_lot,
  //         0
  //       );
  //       setTotalBalance(balance);

  //       // Gelen veriyi state'e set et
  //       setPortfoyData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching portfolio data:", error.message);
  //     }
  //   };

  //   // fetchData fonksiyonunu çağır
  //   fetchData();
  // }, []); // useEffect'in sadece bir kere çağrılması için boş dependency array kullanılır

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Axios ile server'dan portföy verilerini çek
        const response = await axios.get(
          "http://localhost:8081/getPortfoyData"
        );

        const updatedPortfoyData = response.data.map((item) => {
          // String türündeki değerleri sayısala çevir
          const urunFiyat = parseFloat(item.urun_fiyat);
          const stockPriceValue = parseFloat(stockPrice.price);

          // Sayısal olmayan durumları kontrol et ve gerekirse varsayılan değerleri belirle
          const urunFiyatNumeric = isNaN(urunFiyat) ? 0 : urunFiyat;
          const stockPriceNumeric = isNaN(stockPriceValue)
            ? 0
            : stockPriceValue;

          console.log("urunFiyatNumeric:", urunFiyatNumeric);
          console.log("stockPriceNumeric:", stockPriceNumeric);

          // Kar veya zarar durumunu hesapla
          const profitOrLoss =
            urunFiyatNumeric !== stockPriceNumeric
              ? item.urun_alissatis === "buy"
                ? stockPriceNumeric - urunFiyatNumeric
                : urunFiyatNumeric - stockPriceNumeric
              : 0;

          return {
            ...item,
            profitOrLoss: profitOrLoss * item.urun_lot,
            urunfiyat: stockPriceNumeric,
          };
        });

        const balance = updatedPortfoyData.reduce(
          (total, item) => total + item.urun_fiyat * item.urun_lot,
          0
        );

        setTotalBalance(balance);
        setPortfoyData(updatedPortfoyData);
      } catch (error) {
        console.error("Error fetching portfolio data:", error.message);
      }
    };

    // fetchData fonksiyonunu çağır
    fetchData();
  }, []); // Update useEffect to depend on stockPrice changes

  return (
    <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute">
      <div>
        Bakiyeniz: {totalBalance.toFixed(2)}{" "}
        {/* Bakiye değerini burada göster */}
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>URUN ADI</th>
            <th>LOT</th>
            <th>ALIS FIYAT</th>
            {/* <th>MEVCUT FIYAT</th> */}
            <th>ALIS/SATIS</th>
            <th>TUTAR</th>
            <th>TARİH</th>
            <th>KAR/ZARAR</th>
          </tr>
        </thead>
        <tbody>
          {portfoyData.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.urun_adi}</th>
              <td>{item.urun_lot}</td>
              <td>{item.urun_fiyat}</td>
              {/* <td>{item.urunfiyat.toFixed(2)}</td> */}
              <td>{item.urun_alissatis}</td>
              <td>{item.urun_fiyat * item.urun_lot}</td>
              <td>{item.islem_tarihi}</td>
              <td>{item.profitOrLoss.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
