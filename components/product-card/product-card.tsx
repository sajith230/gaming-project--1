import React, { useState } from "react";
import Image from "next/image";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { useWishlistContext } from "@/context/WishListContext";
import cartIcon from "@/public/images/cart.png";
import Rating from "../rating/rating";
import CartSidebar from "@/app/(home)/_components/shopping-cart-sidebar";
import { useCartContext } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  poster: string;
  name: string;
  desc: string;
  rating: number;
  discountPrice: number;
  originalPrice: number;
  stockStatus: string;
  wishList: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  poster,
  name,
  rating,
  discountPrice,
  originalPrice,
  stockStatus,
  wishList,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const router = useRouter();
  const { addToWishlist, removeFromWishlist } = useWishlistContext();
  const [hide, setHide] = useState(false);
  const { addItem } = useCartContext();

  type CartItem = {
    id: number;
    image: string;
    choiceType: string;
    title: string;
    quantity: number;
    price: number;
    productType: string;
  };

  const crateCart = (gameId: any) => {
    const newCardItem: CartItem = {
      id: gameId,
      image: poster,
      choiceType: "aaaaaa",
      title: name,
      quantity: 1,
      price: discountPrice || originalPrice,
      productType: "bbbbbb",
    };

    addItem(newCardItem);
  };

  return (
    <article
      className={`w-fit bg-white bg-opacity-5 text-[7px] p-[0.6em] border border-white/20 select-none sm:text-[9px] md:text-[11px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] hover:bg-opacity-[8%] transition-all duration-500 ${
        hide ? "hidden" : ""
      }`}
    >
      <div className="relative w-[86px] h-[96px] bg-cover bg-center mb-[0.5em] sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[210px] 2xl:w-[246px] sm:h-[130px] md:h-[160px] lg:h-[200px] xl:h-[240px] 2xl:h-[270px] overflow-hidden cursor-pointer">
        <div
          className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${poster})` }}
          onClick={() => router.push(`/products/view/?id=${id}`)}
        ></div>

        <div
          className={`absolute inset-0 w-full h-full bg-black/60 ${
            stockStatus === "OUT_OF_STOCK"
              ? "flex items-center justify-center"
              : "hidden"
          }`}
          onClick={() => router.push(`/products/view/?id=${id}`)}
        >
          <h3 className="font-rajdhaniFont font-bold text-[16px] text-[#FF374E] -translate-y-[0.3em] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[32px]">
            SOLD OUT
          </h3>
        </div>

        {wishList ? (
          <IoHeartSharp
            className="absolute top-[0.2em] left-[0.2em] text-[1.5em] cursor-pointer hover:scale-105 hover:text-[#0BDb45]"
            onClick={async () => {
              // setIsWishlisted(false);
              await removeFromWishlist(id);
              setIsWishlisted(false);
              setHide(true);
            }}
          />
        ) : (
          <IoHeartOutline
            className="absolute top-[0.2em] left-[0.2em] text-[1.5em] cursor-pointer hover:scale-105 hover:text-[#0BDb45]"
            onClick={() => setIsWishlisted(true)}
          />
        )}
      </div>

      <div className="h-[3em] text-[9px] line-clamp-2 uppercase sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[22px] 2xl:text-[25px]">
        <h5
          onClick={() => router.push(`/products/view/?id=${id}`)}
          className="max-w-[12ch] cursor-pointer font-bold"
        >
          {name}
        </h5>
      </div>
      {/* <p className="w-[14ch] font-medium uppercase overflow-hidden text-nowrap text-ellipsis">
        {desc}
      </p> */}
      <hr className="border-t-white/20 my-[0.5em]" />

      <div className="flex items-center justify-between">
        <div className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">
          <Rating rating={Math.round(rating)} />
        </div>

        <button className="text-[9px] hover:opacity-70 sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[22px] 2xl:text-[25px]">
          <CartSidebar>
            <Image
              src={cartIcon}
              alt="Not found background"
              className="size-[1.1em]"
              onClick={() => crateCart(id)}
            />
          </CartSidebar>
        </button>
      </div>

      <div className="flex items-baseline justify-between gap-x-[0.5em]">
        <p className="font-rajdhaniFont font-semibold text-[17px] text-[#75F94C] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[42px] 2xl:text-[46px]">
          $
          {discountPrice === 0
            ? originalPrice.toFixed(2)
            : discountPrice.toFixed(2)}
        </p>
        {discountPrice !== 0 && (
          <p className="line-through">${originalPrice.toFixed(2)}</p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
