import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Marquee from "react-fast-marquee";

const Header = (props) => {
  const { stockPrice } = props;

  return (
    <div className="w-[1250px] h-[95px] left-[269px] top-0 absolute bg-gray-50 border-r">
      <div className="w-[260px] pl-[13px] pr-[163px] py-[13px] left-[42px] top-[26px] absolute rounded-lg border border-neutral-800 border-opacity-25 justify-start items-start gap-4 inline-flex">
        <div className="w-[18px] h-[18px] justify-center items-center inline-flex">
          <div className="w-[18px] h-[18px] relative"></div>
        </div>
        <div className="text-neutral-500 text-base font-normal font-['Inter'] leading-none">
          Search
        </div>
      </div>
      <div className="w-[900px] h-[19px] left-[338px] top-[37px]   absolute justify-start items-start gap-8 inline-flex">
        <Marquee class="animate-marquee whitespace-nowrap ">
          {stockPrice.map((stockPrice, index) => (
            <div key={index}>
              <span>
                {stockPrice.name} : {stockPrice.pricestr}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};
export default Header;
