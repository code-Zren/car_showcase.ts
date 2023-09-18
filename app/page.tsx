"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // search states
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  // filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  // pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setIsLoading(true);

    try {
      const result = await fetchCars({
        model: model || "",
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
      });

      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [model, manufacturer, fuel, year, limit]);

  return (
    <main className="overflow-hidden">
      <Hero />

      <section className="mt-12 padding-x padding-y max-width" id="discover">
        <header className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </header>

        <div className="home__filters">
          <SearchBar setModel={setModel} setManufacturer={setManufacturer} />

          <div className="home__filter-container">
            <CustomFilter
              title="fuel"
              options={fuels}
              setFilter={(value) => setFuel(value as string)}
            />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={(value) => setYear(value as number)}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} key={car} />
              ))}
            </div>

            {isLoading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No Cars available</h2>
          </div>
        )}
      </section>
    </main>
  );
}
