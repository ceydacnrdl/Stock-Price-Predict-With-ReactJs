// import React, { useState, useEffect, useRef } from "react";
// import { Input, Form, FormGroup, Label, Col, Button } from "reactstrap";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
// import { Chart } from "react-chartjs-2";

// export default function AISupport() {
//   const [currentDate, setCurrentDate] = useState(getDate());
//   const [dropdownValue, setDropdownValue] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [accuracy, setAccuracy] = useState([]);
//   const [accuracy2, setAccuracy2] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [chartData, setChartData] = useState({
//     datasets: [
//       {
//         label: "tahmin",
//         data: [],
//         fill: true,
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)",
//       },
//       {
//         label: "gerçek",
//         data: [],
//         fill: false,
//         borderColor: "#742774",
//       },
//     ],
//   });

//   const chartRef = useRef(null);

//   const fetchStockData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/fetch?category=liveBorsa"
//       );
//       setDropdownValue(response.data.result.map((item) => item.name));
//       setLoading(false);
//     } catch (error) {
//       console.error("Error getting live Borsa data:", error.message);
//       setLoading(false);
//     }
//   };

//   const fetchDataFromAPI = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/ml?hisse_adi=${selectedProduct}`
//       );

//       const data = await response.json();
//       // setAccuracy(data.predictions.predict);
//       // setAccuracy2(data.predictions.real);

//       setAccuracy(data.predictions.predict);
//       setAccuracy2(data.predictions.real);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   };

//   function getDate() {
//     const today = new Date();
//     const formattedTime = today.toLocaleTimeString();
//     const month = today.getMonth() + 1;
//     const year = today.getFullYear();
//     const date = today.getDate();
//     return `${month}/${date}/${year} ${formattedTime}`;
//   }

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentDate(getDate());
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     // accuracy veya accuracy2 değiştiğinde grafik güncelleme
//     const updateChart = () => {
//       if (chartRef.current) {
//         const newChartData = {
//           ...chartData,
//           datasets: [
//             {
//               ...chartData.datasets[0],
//               data: accuracy,
//             },
//             {
//               ...chartData.datasets[1],
//               data: accuracy2,
//             },
//           ],
//         };

//         setChartData(newChartData);
//         chartRef.current.data = newChartData;
//         chartRef.current.update();
//       }
//     };

//     updateChart();
//   }, [accuracy, accuracy2, chartData]);

//   useEffect(() => {
//     // Yeni bir ChartJS örneği oluştur
//     if (!chartRef.current) {
//       chartRef.current = new ChartJS(chartRef.current, {
//         type: "line",
//         data: chartData,
//       });
//     } else {
//       // Chart verilerini güncelle
//       chartRef.current.data = chartData;
//       chartRef.current.update();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [chartData]);

//   const handleInputClick = () => {
//     fetchStockData();
//   };

//   const handleFetchDataClick = () => {
//     fetchDataFromAPI();
//     // Burada grafik güncelleniyor, useEffect içinde değil
//     const newChartData = {
//       ...chartData,
//       datasets: [
//         {
//           ...chartData.datasets[0],
//           data: accuracy,
//         },
//         {
//           ...chartData.datasets[1],
//           data: accuracy2,
//         },
//       ],
//     };

//     chartRef.current.data = newChartData;
//     chartRef.current.update();
//   };

//   return (
//     <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute">
//       <div>
//         <Form>
//           <label>{currentDate}</label>
//           <FormGroup row>
//             <Label for="exampleSelect" sm={2}>
//               SECINIZ
//             </Label>
//             <Col sm={10}>
//               <Input
//                 id="exampleSelect"
//                 name="select"
//                 type="select"
//                 onClick={handleInputClick}
//                 onChange={(e) => {
//                   const selectedProduct = e.target.value;
//                   setSelectedProduct(selectedProduct);
//                 }}
//               >
//                 {dropdownValue.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </Input>
//             </Col>
//           </FormGroup>
//         </Form>
//         <div>
//           <Button onClick={handleFetchDataClick}>
//             Fiyat tahmin grafiğini gör
//           </Button>
//           {loading && <p>Veriler yükleniyor...</p>}
//           {!loading && <p>tahmin: {accuracy}</p>}
//           {!loading && <p>gercek: {accuracy2}</p>}
//           <p>Seçilen Ürün: {selectedProduct}</p>
//         </div>
//       </div>
//       <div style={{ width: "80%", margin: "0 auto" }}>
//         <Line ref={chartRef} data={chartData} />
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { Input, Form, FormGroup, Label, Col, Button } from "reactstrap";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";

// export default function AISupport() {
//   const [currentDate, setCurrentDate] = useState(getDate());
//   const [dropdownValue, setDropdownValue] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [accuracy, setAccuracy] = useState([]);
//   const [accuracy2, setAccuracy2] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchStockData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/fetch?category=liveBorsa"
//       );
//       setDropdownValue(response.data.result.map((item) => item.name));
//       setLoading(false);
//     } catch (error) {
//       console.error("Error getting live Borsa data:", error.message);
//       setLoading(false);
//     }
//   };

//   const fetchDataFromAPI = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/ml?hisse_adi=${selectedProduct}`
//       );

//       const data = await response.json();
//       setAccuracy(data.predictions);
//       // setAccuracy2(data.predictions.real);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   };

//   function getDate() {
//     const today = new Date();
//     const formattedTime = today.toLocaleTimeString();
//     const month = today.getMonth() + 1;
//     const year = today.getFullYear();
//     const date = today.getDate();
//     return `${month}/${date}/${year} ${formattedTime}`;
//   }

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentDate(getDate());
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const handleInputClick = () => {
//     fetchStockData();
//   };

//   return (
//     <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute">
//       <div>
//         <Form>
//           <label>{currentDate}</label>
//           <FormGroup row>
//             <Label for="exampleSelect" sm={2}>
//               SECINIZ
//             </Label>
//             <Col sm={10}>
//               <Input
//                 id="exampleSelect"
//                 name="select"
//                 type="select"
//                 onClick={handleInputClick}
//                 onChange={(e) => {
//                   const selectedProduct = e.target.value;
//                   setSelectedProduct(selectedProduct);
//                 }}
//               >
//                 {dropdownValue.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </Input>
//             </Col>
//           </FormGroup>
//         </Form>
//         <div>
//           <Button onClick={fetchDataFromAPI}>Fiyat tahmin grafiğini gör</Button>
//           {loading && <p>Veriler yükleniyor...</p>}
//           {/* {!loading && <p>tahmin: {accuracy}</p>} */}
//           {!loading && (
//             <div>
//               <p>tahmin:</p>
//               <ul>
//                 {accuracy.map((value, index) => (
//                   <li key={index}>{value.predict}</li>
//                 ))}
//               </ul>
//               <p>gerçek:</p>
//               <ul>
//                 {accuracy.map((value, index) => (
//                   <li key={index}>{value.real}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           {/* {!loading && <p>gercek: {accuracy2}</p>} */}
//           <p>Seçilen Ürün: {selectedProduct}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { Input, Form, FormGroup, Label, Col, Button } from "reactstrap";
import axios from "axios";
import { Line } from "react-chartjs-2";
import jquery from "jquery";
import { Chart } from "react-google-charts";

export default function AISupport() {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [dropdownValue, setDropdownValue] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [accuracy, setAccuracy] = useState([]);
  const [accuracy2, setAccuracy2] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8081/fetch?category=liveBorsa"
      );
      setDropdownValue(response.data.result.map((item) => item.name));
      setLoading(false);
    } catch (error) {
      console.error("Error getting live Borsa data:", error.message);
      setLoading(false);
    }
  };

  const fetchDataFromAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/ml?hisse_adi=${selectedProduct}`
      );
      const data = await response.json();
      setAccuracy2(jquery.isEmptyObject(data)); //verinin gelme durumu
      setAccuracy(data.predictions);

      //console.log(data);
      // setAccuracy2(data.predictions.real);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  function getDate() {
    const today = new Date();
    const formattedTime = today.toLocaleTimeString();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year} ${formattedTime}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(getDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleInputClick = () => {
    fetchStockData();
  };

  return (
    <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute">
      <div>
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
                onClick={handleInputClick}
                onChange={(e) => {
                  const selectedProduct = e.target.value;
                  setSelectedProduct(selectedProduct);
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
        </Form>
        <div>
          <Button onClick={fetchDataFromAPI}>Fiyat tahmin grafiğini gör</Button>
        </div>
        <div className="Chart">
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={[
              ["Gün", "Tahmin", "Gerçek"],
              ...accuracy.map((value, index) => {
                const numericIndex = index + 1;
                const numericPredict = parseFloat(value.predict);
                const numericReal = parseFloat(value.real);

                console.log(
                  "Gün:",
                  numericIndex,
                  "Predict:",
                  numericPredict,
                  "Real:",
                  numericReal
                );

                return [numericIndex, numericPredict, numericReal];
              }),
            ]}
            options={{
              hAxis: {
                title: "Gün",
              },
              vAxis: {
                title: "Value",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
