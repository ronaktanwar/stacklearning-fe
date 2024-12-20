import { Button } from "./ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
const categoriesData = [
  "Software Engineering",
  "Marketing & Sales",
  "Design & Creative",
  "Customer Support",
];
const Header = () => {
  return (
    <div className="md:py-36 py-28">
      <div className="w-[95%] md:w-[80%] m-auto">
        <div className="flex flex-col items-center gap-4 justify-center">
          <h1 className="leading-snug text-2xl sm:text-[44px] font-bold text-center">
            Discover{" "}
            <span className="sm:text-[48px] text-primaryNew">Opportunities</span>{" "}
            to Advance Your Career
          </h1>
          <p className="text-sm sm:text-lg text-center">
            Explore thousands of opportunities across top industries and leading
            companies.
          </p>

          <div className="flex justify-center gap-2 sm:gap-6 items-center text-[8px] sm:text-xs">
            {categoriesData.map((data,index ) => {
              return (
                <p key={index} className="text-white bg-gradient-to-r from-primaryNew to-green-300 sm:p-2 rounded text-nowrap p-1">
                  {data}
                </p>
              );
            })}
          </div>
          <div className="mt-6 sm:mt-14">
            <Button className="sm:p-6 border-1 rounded-full bg-transparent border border-primaryNew text-primaryNew text-sm sm:text-lg hover:bg-primaryNew hover:text-white flex items-center space-x-2 group">
              Explore Now
              <span className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-2">
                <FaArrowRightLong />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
