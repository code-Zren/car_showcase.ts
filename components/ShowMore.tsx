"use client";

import { ShowMoreProps } from "@/types";
import { CustomButton } from ".";

const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;

    if (setLimit) {
      setLimit(newLimit);
    }
  };

  return (
    <section className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </section>
  );
};

export default ShowMore;
