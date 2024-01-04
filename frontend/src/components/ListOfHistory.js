import React from "react";

const ListOfHistory = (props) => {
  const { ListOfHistory } = props;

  return (
    <div>
      {ListOfHistory.map((listOfHistory, index) => (
        <div key={index}>
          <tr>
            <td>{listOfHistory.HGDG_HS_KODU}</td>
            <td>{listOfHistory.HGDG_KAPANIS}</td>
            <td>{listOfHistory.HGDG_TARIH}</td>
          </tr>
        </div>
      ))}
    </div>
  );
};

export default ListOfHistory;
