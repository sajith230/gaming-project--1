import React from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import ProductCard from "@/components/product-card/product-card";
import { useWishlistContext } from "@/context/WishListContext";

interface WishlistedGamesProps {
  displayedProducts: {
    id: string;
    poster: string;
    name: string;
    desc: string;
    rating: number;
    originalPrice: number;
    discountPrice: number;
    stockStatus: string;
  }[];
  productsPerPage: number;
  totalPages: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  currentPage: number;
}

const WishlistedGames: React.FC<WishlistedGamesProps> = ({
  displayedProducts,
  productsPerPage,
  totalPages,
  setCurrentPage,
  currentPage,
}) => {
  const { wishListGameIds } = useWishlistContext();
  return (
    <>
      <div
        className={`flex ${
          displayedProducts.length < productsPerPage
            ? "gap-x-[1em]"
            : "justify-between"
        }`}
      >
        {displayedProducts.map(
          (
            {
              id,
              poster,
              name,
              desc,
              rating,
              originalPrice,
              discountPrice,
              stockStatus,
            },
            index
          ) => (
            <ProductCard
              id={id}
              wishList={wishListGameIds.includes(id)}
              key={index}
              poster={poster}
              name={name}
              desc={desc}
              rating={rating}
              originalPrice={originalPrice}
              discountPrice={discountPrice}
              stockStatus={stockStatus}
            />
          )
        )}
      </div>
      <div
        className={`${
          totalPages < 2 ? "hidden" : ""
        } flex justify-center gap-x-[1.5em] mt-[1.8em] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px]`}
      >
        <button
          className="hover:text-[#45F882] disabled:hover:text-white disabled:opacity-70"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`${
              i + 1 === currentPage ? "text-[#45F882]" : ""
            } hover:opacity-80`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="hover:text-[#45F882] disabled:hover:text-white disabled:opacity-70"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
};

export default WishlistedGames;
