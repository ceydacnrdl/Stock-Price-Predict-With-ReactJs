import React from "react";
import dashboard from "../assets/group.png";
import exchange from "../assets/trade.png";
import percentage from "../assets/percentage-square.png";
import wallet from "../assets/wallet-3.png";
import chart from "../assets/chart-2.png";
import "./style.css";

export default function SideBar() {
  return (
    <div>
      <div className="w-[269px] h-[1024px] relative bg-gray-50">
        <div className="w-[34px] h-7 left-[235px] top-[39px] absolute bg-sky-100 rounded-tl-lg rounded-bl-lg" />
        <div className="w-[237px] h-14 left-[16px] top-[149px] absolute bg-blue-800 rounded-lg" />
        <div className="left-[32px] top-[39px] absolute justify-start items-center gap-2 inline-flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <div className="w-6 h-6 relative"></div>
          </div>
          <div className="text-blue-800 text-2xl font-medium font-['Space Grotesk'] leading-[28.80px]">
            e-portfolio
          </div>
        </div>
        <div className="left-[32px] top-[116px] absolute text-neutral-500 text-sm font-semibold font-['Inter'] leading-[16.80px] tracking-tight">
          HESABIM
        </div>
        <div className="left-[32px] top-[165px] absolute flex-col justify-start items-start gap-8 inline-flex">
          <a
            href="/dashboard"
            className="justify-start items-center gap-4 inline-flex"
          >
            <div className="w-6 h-6 justify-center items-center flex">
              <img className="w-[26px] h-[26px] relative" src={dashboard} />
            </div>

            <div className="text-white text-lg font-medium font-['Inter'] leading-snug">
              Takip Listem
            </div>
          </a>
          <a
            href="/prices"
            className="justify-start items-center gap-4 inline-flex"
          >
            <div className="w-6 h-6 justify-center items-center flex">
              <img className="w-6 h-6 relative" src={percentage} />
            </div>
            <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
              Piyasalar
            </div>
          </a>
          <a
            href="/news"
            className="justify-start items-center gap-4 inline-flex"
          >
            <div className="w-6 h-6 justify-center items-center flex">
              <img className="w-6 h-6 relative" src={chart} />
            </div>
            <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
              Haberler
            </div>
          </a>
        </div>
        <div className="w-[18px] h-[18px] left-[243px] top-[44px] absolute justify-center items-center inline-flex">
          <div className="w-[18px] h-[18px] relative"></div>
        </div>

        <div className="left-[32px] top-[333px] absolute text-neutral-500 text-sm font-semibold font-['Inter'] leading-[16.80px] tracking-tight">
          BORSA İŞLEMLERİ
        </div>
        <div className="left-[32px] top-[380px] absolute flex-col justify-start items-start gap-8 inline-flex">
          <a
            href="/exchange"
            className="justify-start items-center gap-4 inline-flex"
          >
            <div className="w-6 h-6 justify-center items-center flex">
              <img className="w-6 h-6 relative" src={exchange} />
            </div>
            <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
              Al-Sat
            </div>
          </a>

          <a
            href="/wallets"
            className="justify-start items-center gap-4 inline-flex"
          >
            <div className="w-6 h-6 justify-center items-center flex">
              <img className="w-6 h-6 relative" src={wallet} />
            </div>
            <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
              Portföy
            </div>
          </a>
          <a
            href="/helpAndSupport"
            className="justify-start items-center gap-4 inline-flex"
          >
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative">
                <div className="w-5 h-5 left-[2px] top-[2px] absolute"></div>
              </div>
            </div>
            <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
              Help & Support
            </div>
          </a>
          <a
            href="/settings"
            className="justify-start items-center gap-4 inline-flex"
          >
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
              Settings
            </div>
          </a>
          <a href="/" className="justify-start items-center gap-4 inline-flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative"></div>
            </div>
            <div className="text-neutral-500 text-lg font-medium font-['Inter'] leading-snug">
              Logout
            </div>
          </a>
        </div>
        <div className="w-[205px] h-48 left-[32px] top-[800px] absolute bg-blue-800 rounded-lg">
          <div className="w-[110px] h-[110px] left-[105px] top-[135px] absolute bg-white rounded-full blur-[150px]" />

          <div className="left-[24px] top-[24px] absolute text-white text-base font-medium font-['Space Grotesk'] leading-tight">
            Trade crypto with <br />
            your phone!
          </div>
          <div className="left-[24px] top-[77px] absolute text-white text-sm font-medium font-['Space Grotesk'] leading-[16.80px]">
            Get App
          </div>
          <div className="origin-top-left rotate-[-16.49deg] w-[32.96px] h-[32.96px] left-[21.26px] top-[123.36px] absolute">
            <div className="w-[32.96px] h-[32.96px] left-0 top-0 absolute origin-top-left rotate-[-16.49deg] bg-yellow-500 rounded-full" />
            <div className="w-6 h-6 pl-[3.70px] pr-[20.27px] pt-0.5 pb-[21.97px] left-[5.59px] top-[3.03px] absolute origin-top-left rotate-[-16.49deg] justify-start items-center inline-flex" />
          </div>
          <div className="origin-top-left rotate-[14.11deg] w-[25.87px] h-[25.87px] left-[62.31px] top-[150.60px] absolute">
            <div className="w-[25.87px] h-[25.87px] left-0 top-0 absolute origin-top-left rotate-[14.11deg] bg-gray-200 rounded-full" />
            <div className="w-[18.82px] h-[18.82px] left-[2.56px] top-[4.28px] absolute origin-top-left rotate-[14.11deg]" />
          </div>
          <div className="w-3.5 h-3.5 left-[83px] top-[79px] absolute justify-center items-center inline-flex">
            <div className="w-3.5 h-3.5 relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
