import React, { useState } from "react";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { useCartContext } from "@/context/CartContext";
import { useAuthContext } from "@/context/AuthContext";
import RedirectSignInPopup from "./RedirectSignInPopup";
import CartSidebar from "./shopping-cart-sidebar";
import Rating from "@/components/rating/rating";

interface SwiperCarouselCardProps {
  id: string;
  poster: string;
  title: string;
  rating: number;
  description: string;
  price: number;
  /* wishlistedBy: number; */
  releaseDate: string;
  soldOut: boolean;
}

type CartItem = {
  id: number;
  image: string;
  choiceType: string;
  title: string;
  quantity: number;
  price: number;
  productType: string;
};

const SwiperCarouselCard: React.FC<SwiperCarouselCardProps> = ({
  id,
  poster,
  title,
  rating,
  description,
  price,
  /* wishlistedBy, */
  releaseDate,
  soldOut,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addItem } = useCartContext();

  const { isUserLoggedIn } = useAuthContext();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const addToWishList = () => {
    if (isUserLoggedIn()) {
      setPopupOpen(false);
    } else {
      setPopupOpen(true);
    }
  };

  const crateCart = (gameId: any) => {
    const newCardItem: CartItem = {
      id: gameId,
      image: poster,
      choiceType: "aaaaaa",
      title,
      quantity: 1,
      price: price,
      productType: "bbbbbb",
    };

    addItem(newCardItem);
  };

  const formatWishlistedBy = (total: number) => {
    if (total < 1000) {
      return total;
    }

    const formattedValue = total / 1000;
    const formattedValueString = formattedValue.toFixed(1);

    return `${formattedValueString}K`;
  };

  const formatReleaseDate = (date: string) => {
    let formattedValue = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    formattedValue = `${formattedValue.split(" ")[0].substring(0, 3)} ${
      formattedValue.split(" ")[1]
    } ${formattedValue.split(" ")[2]}`;

    return formattedValue;
  };

  return (
    <article
      className="w-full h-fit backdrop-blur-[10px] p-[5em] pt-0 mt-[8em] mb-[3em] md:p-[2em] md:mt-[4em] md:mb-[0.5em] md:grid md:grid-cols-2 md:place-items-end md:gap-x-[2em]"
      style={{
        backgroundImage: `linear-gradient(to top right, #002304 0%, #FFFFFF14 40%, #FFFFFF14 60%, #002304 100%)`,
        borderImage: `linear-gradient(to bottom, #9DA8A0 0%, #00FF47 100%) 1`,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {/* Poster */}
      <div className="relative w-[92%] h-[300px] mx-auto -translate-y-[7em] shadow-[0px_0px_9px_rgba(0,0,0,0.5)] md:w-full md:h-full md:-translate-y-0">
        {/* <Image
          src={poster.src}
          alt="Poster"
          className="absolute bottom-0"
          width={382.2}
          height={512.72}
        /> */}
        <div
          className="absolute left-0 bottom-0 w-full h-[318px] flex items-center justify-center bg-cover bg-center text-center md:h-[328px] md:items-start lg:h-[340px] xl:h-[427px] 2xl:h-[513px]"
          style={{ backgroundImage: `url(${poster})` }}
        ></div>
        {soldOut && (
          <div className="absolute left-0 bottom-0 w-full h-[318px] flex items-center justify-center bg-black/60 text-center md:h-[328px] md:items-start lg:h-[340px] xl:h-[427px] 2xl:h-[513px]">
            <h3 className="font-rajdhaniFont font-bold text-[26px] text-[#FF374E] sm:text-[28px] md:text-[30px] md:mt-[1em] lg:text-[32px] xl:text-[34px] 2xl:text-[36px]">
              SOLD OUT
            </h3>
          </div>
        )}
      </div>

      <div className="-mt-[5em] md:-mt-0">
        {/* Title */}
        <h3 className="font-bold text-[2em] line-clamp-1 [text-shadow:_0_0_3px_rgb(0_0_0)]">
          {title}
        </h3>

        {/* Rating */}
        <div className="text-[1.25em] pb-[0.7em]">
          <Rating rating={rating} />
        </div>
        <hr className="w-2/5" />

        {/* Description */}
        <div className="h-[15em] pt-[1.5em] text-justify font-normal">
          <p className="line-clamp-6 [text-shadow:_0_0_3px_rgb(0_0_0)]">
            {description}
          </p>
        </div>

        {/* Price and release date */}
        <div className="flex items-end justify-between pt-[1.5em]">
          <h4 className="leading-none">
            <span className="text-[1.8em] [text-shadow:_0_0_2px_rgb(0_0_0)]">
              ${price.toFixed(2)}
            </span>
            <span className="text-[1.1em] [text-shadow:_0_0_2px_rgb(0_0_0)]">
              {" "}
              USD
            </span>
          </h4>
          <div>
            <p
              className="flex cursor-pointer hover:scale-105 transition-transform duration-150 w-fit"
              onClick={() => setIsWishlisted((prev) => !prev)}
            >
              {!isWishlisted ? (
                <IoHeartOutline className="text-[1.4em] me-[0.2em]" />
              ) : (
                <IoHeartSharp className="text-[1.4em] me-[0.2em]" />
              )}
              {/* {formatWishlistedBy(wishlistedBy)} */}
            </p>
            <p className="leading-none mt-[0.3em] mb-[0.1em] [text-shadow:_0_0_2px_rgb(0_0_0)]">
              Release Date: {formatReleaseDate(releaseDate)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-[2em] gap-x-[1em]">
          <Link href={`/products/view/?id=${id}`}>
            <Button
              variant="gaming"
              className="text-[1.1em] font-semibold capitalize px-[3em] py-[1em] border border-[#0BDB45] h-fit"
            >
              {!soldOut ? "Buy now" : "View Item"}
            </Button>
          </Link>
          <CartSidebar>
            <Button
              disabled={soldOut}
              onClick={() => crateCart(id)}
              variant={"outline"}
              className="text-[1.1em] font-semibold capitalize px-[3em] py-[1em] rounded-none h-fit"
            >
              Add to cart
            </Button>
          </CartSidebar>
          {/* <Button
            onClick={() => addToWishList()}
            variant={"outline"}
            className="text-[1.1em] font-semibold capitalize px-[3em] py-[1em] rounded-none h-fit"
          >
            Add to cart
          </Button> */}
          <RedirectSignInPopup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
          />
        </div>
      </div>
    </article>
  );
};

export default SwiperCarouselCard;
