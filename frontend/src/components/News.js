import React from "react";

const News = (props) => {
  const { newsData } = props;

  return (
    <div className="w-[1250px] h-[929px] left-[269px] top-[95px] absolute">
      {newsData.map((newsData, index) => (
        <a
          className="w-[1240px] h-[140px] justify-start items-start inline-flex"
          href={newsData.url}
        >
          <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start  inline-flex">
            <div className="self-stretch justify-start items-start  inline-flex">
              <div className="grow shrink basis-0 pr-2.5 flex-col justify-start items-start gap-[5px] inline-flex">
                <div className="self-stretch text-zinc-800 text-lg font-bold font-['Helvetica'] leading-normal">
                  Headline text can run the width of the article area and wrap
                  if it’s multiple lines
                </div>
                <div className="self-stretch text-zinc-800 text-[13px] font-normal font-['Helvetica'] leading-[18.20px]">
                  Body text of this article can run the width of this article an
                  padding from the image - as well as wrap if this is multiple
                  lines.
                </div>
              </div>
            </div>
          </div>
          <div className="justify-end items-center flex">
            <img
              className="w-[180px] h-60 bg-black bg-opacity-20"
              src={newsData.image}
            />
          </div>
        </a>
      ))}
    </div>
  );
};

export default News;
