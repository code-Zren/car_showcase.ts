"use client";

import Image from "next/image";
import { CustomButton } from ".";

const Hero = () => {
  const handleScroll = () => {};

  return (
    <main className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, book, or rent a car -- quickly and easily!
        </h1>

        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <CustomButton
          title="Explore Cars"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>

      <div className="hero__image-container">
        <figure className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </figure>

        <figure className="hero__image-overlay"></figure>
      </div>
    </main>
  );
};

export default Hero;