import React from "react";
import exchange from "../assets/trade.png";
import percentage from "../assets/percentage-square.png";
import wallet from "../assets/wallet-3.png";
import chart from "../assets/chart-2.png";
import ai from "../assets/status-up.png";
import logout from "../assets/logout.png";
import axios from "axios";
import icon from "../assets/chainlink-(link).png";

import "./style.css";

export default function SideBar() {
  axios.defaults.withCredentials = true;

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full sm:w-[269px] h-[1000px] relative bg-gray-50">
      {/* <div className="w-[34px] h-7 left-[235px] top-[39px] absolute bg-sky-100 rounded-tl-lg rounded-bl-lg" /> */}
      {/* <div className="w-[237px] h-14 left-[16px] top-[149px] absolute bg-blue-800 rounded-lg" /> */}
      <div className="left-[32px] top-[39px] absolute justify-start items-center gap-2 inline-flex">
        <div className="w-6 h-6 justify-center items-center flex">
          {/* <div className="w-6 h-6 relative"></div> */}
          <img className="w-6 h-6 relative" src={icon} alt="Icon" />
        </div>
        <div className="text-blue-800 text-2xl font-medium font-['Space Grotesk'] leading-[28.80px]">
          e-portfolio
        </div>
      </div>

      <div className="left-[32px] top-[120px] absolute flex-col justify-start items-start gap-8 inline-flex">
        {/* <a
          href="/dashboard"
          className="no-underline utilityjustify-start items-center gap-4 inline-flex"
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <img
              className="w-[26px] h-[26px] relative"
              src={dashboard}
              alt="Dashboard"
            />
          </div>
          <div className="text-white text-lg font-medium font-['Inter'] leading-snug">
            Takip Listem
          </div>{" "}
          <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
            Takip Listem
          </div>
        </a> */}
        <a
          href="/fetch-liveBorsa"
          className="no-underline utility justify-start items-center gap-4 inline-flex"
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <img
              className="w-6 h-6 relative"
              src={percentage}
              alt="Percentage"
            />
          </div>
          <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
            Piyasalar
          </div>
        </a>
        <a
          href="/news"
          className="justify-start items-center gap-4 inline-flex no-underline utility"
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 relative" src={chart} alt="Chart" />
          </div>
          <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
            Haberler
          </div>
        </a>

        <a
          href="/exchange"
          className="justify-start items-center gap-4 inline-flex no-underline utility"
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 relative" src={exchange} alt="Exchange" />
          </div>
          <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
            Al-Sat
          </div>
        </a>
        <a
          href="/wallets"
          className="justify-start items-center gap-4 inline-flex no-underline utility"
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 relative" src={wallet} alt="Wallet" />
          </div>
          <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
            Portföy
          </div>
        </a>
        <a
          href="/AISupport"
          className="justify-start items-center no-underline utility gap-4 inline-flex"
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <img className="w-6 h-6 relative" src={ai} alt="ai" />
            </div>
            {/* <div className="w-6 h-6 relative">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute"></div>
            </div> */}
          </div>
          <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
            AI SUPPORT
          </div>
        </a>
        {/* <a
          href="/settings"
          className="justify-start items-center gap-4 inline-flex no-underline utility"
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <div className="w-6 h-6 relative"></div>
          </div>
          <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
            Ayarlar
          </div>
        </a> */}
        <a
          href="/logout"
          className="justify-start items-center gap-4 inline-flex no-underline utility"
          onClick={handleDelete}
        >
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 relative" src={logout} alt="logout" />
          </div>
          <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
            Çıkış Yap
          </div>
        </a>
      </div>
    </div>
  );
}
