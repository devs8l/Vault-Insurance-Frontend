import { useState } from "react";

const MobileFAQGrid = ({ benefits }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="grid md:hidden grid-cols-1 gap-y-6 max-w-7xl w-full px-4 text-center">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="flex flex-col text-white border-b border-white/20 pb-4"
        >
          <button
            onClick={() => toggle(index)}
            className="text-left text-[20px] font-semibold mb-2 w-full flex justify-between items-center"
          >
            {benefit.title}
            <span className="text-xl">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          {openIndex === index && (
            <p className="text-left text-[14px] leading-relaxed opacity-90 mt-2 transition-all duration-300 ease-in-out">
              {benefit.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileFAQGrid;
