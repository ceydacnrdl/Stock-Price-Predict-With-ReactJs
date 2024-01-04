import React from "react";

function Exchange() {
  return (
    <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute bg-zinc-300">
      <div className="w-[443px] h-[391px] relative bg-white rounded-lg border border-neutral-800 border-opacity-20">
        <div className="left-[32px] top-[32px] absolute text-sky-950 text-2xl font-medium font-['Space Grotesk'] leading-[28.80px]">
          Buy & Sell Crypto
        </div>
        <div className="w-[141px] h-11 left-[270px] top-[25px] absolute bg-gray-50 rounded-lg">
          <div className="w-[62.50px] h-9 left-[4px] top-[4px] absolute bg-white rounded shadow" />
          <div className="left-[21px] top-[12px] absolute text-neutral-800 text-base font-medium font-['Inter'] leading-tight">
            Buy
          </div>
          <div className="left-[94px] top-[12px] absolute text-neutral-500 text-base font-medium font-['Inter'] leading-tight">
            Sell
          </div>
        </div>
        <div className="w-[379px] h-[81px] left-[32px] top-[93px] absolute bg-gray-50 rounded-lg">
          <div className="left-[16px] top-[16px] absolute text-neutral-500 text-base font-medium font-['Inter'] leading-tight">
            Spend
          </div>
          <div className="left-[16px] top-[43px] absolute text-neutral-800 text-lg font-medium font-['Inter'] leading-snug">
            12,000
          </div>
          <div className="pl-2 pr-1.5 py-2 left-[264px] top-[30px] absolute bg-white rounded-[100px] shadow justify-center items-center inline-flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <div className="w-[18px] h-[18px] justify-center items-center flex">
                <div className="w-[18px] h-[18px] relative"></div>
              </div>
              <div className="text-neutral-800 text-base font-medium font-['Inter'] leading-tight">
                USD
              </div>
              <div className="w-[18px] h-[18px] justify-center items-center flex">
                <div className="w-[18px] h-[18px] relative"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[379px] h-[81px] left-[32px] top-[190px] absolute bg-gray-50 rounded-lg">
          <div className="left-[16px] top-[16px] absolute text-neutral-500 text-base font-medium font-['Inter'] leading-tight">
            Receive
          </div>
          <div className="left-[16px] top-[43px] absolute text-neutral-800 text-lg font-medium font-['Inter'] leading-snug">
            0.553915
          </div>
          <div className="p-2 left-[264px] top-[30px] absolute bg-white rounded-[100px] shadow justify-center items-center inline-flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <div className="w-[18px] h-[18px] relative">
                <div className="w-[18px] h-[18px] left-0 top-0 absolute bg-yellow-500 rounded-full" />
                <div className="w-[13.09px] h-[13.09px] pl-0.5 pr-[2.82px] py-[1.09px] left-[2.45px] top-[2.45px] absolute justify-center items-center inline-flex" />
              </div>
              <div className="text-neutral-800 text-base font-medium font-['Inter'] leading-tight">
                BTC
              </div>
              <div className="w-[18px] h-[18px] justify-center items-center flex">
                <div className="w-[18px] h-[18px] relative"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[379px] py-[17px] left-[32px] top-[303px] absolute bg-blue-800 rounded-lg justify-center items-center inline-flex">
          <div className="text-white text-lg font-medium font-['Inter'] leading-snug">
            Continue
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchange;
