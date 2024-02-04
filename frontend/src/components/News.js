// import React from "react";
// import {
//   Card,
//   CardImg,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
//   CardText,
//   Button,
//   CardGroup,
// } from "reactstrap";
// import { useState, useEffect } from "react";
// import axios from "axios";

// function News() {
//   const [newsData, setNewsData] = useState([]);
//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     axios
//       .get("http://localhost:8081/news")
//       .then((response) => {
//         setNewsData(response.data.result);
//       })
//       .catch((error) => {
//         console.error("Error getting news data:", error.message);
//       });
//   }, []);

//   const chunkArray = (arr, chunkSize) => {
//     const result = [];
//     for (let i = 0; i < arr.length; i += chunkSize) {
//       result.push(arr.slice(i, i + chunkSize));
//     }
//     return result;
//   };

//   const chunkedNewsData = chunkArray(newsData, 3);

//   return (
//     <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute">
//       {chunkedNewsData.map((row, rowIndex) => (
//         <CardGroup className="row" key={rowIndex}>
//           {row.map((news, colIndex) => (
//             <Card key={colIndex} className="col-sm-4">
//               <CardImg alt="Card image cap" src={news.image} top width="100%" />
//               <CardBody>
//                 <CardTitle tag="h5">{news.name}</CardTitle>
//                 <CardSubtitle className="mb-2 text-muted" tag="h6">
//                   {news.source}
//                 </CardSubtitle>
//                 <CardText>{news.description}</CardText>
//               </CardBody>
//             </Card>
//           ))}
//         </CardGroup>
//       ))}
//     </div>
//   );
// }

// export default News;
import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardGroup,
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function News() {
  const [newsData, setNewsData] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081/news")
      .then((response) => {
        setNewsData(response.data.result);
      })
      .catch((error) => {
        console.error("Error getting news data:", error.message);
      });
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedNewsData = chunkArray(newsData, 3);

  return (
    <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute">
      {chunkedNewsData.map((row, rowIndex) => (
        <CardGroup className="row" key={rowIndex}>
          {row.map((news, colIndex) => (
            <Card key={colIndex} className="col-sm-4">
              {/* Tıklanabilirlik için a etiketi ekleyin */}
              <a href={news.url} className="no-underline ">
                <CardImg
                  alt="Card image cap"
                  src={news.image}
                  top
                  width="100%"
                />
                <CardBody>
                  <CardTitle tag="h5">{news.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {news.source}
                  </CardSubtitle>
                  <CardText>{news.description}</CardText>
                </CardBody>
              </a>
            </Card>
          ))}
        </CardGroup>
      ))}
    </div>
  );
}

export default News;
