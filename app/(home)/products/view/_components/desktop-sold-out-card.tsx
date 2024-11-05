import React from "react";

import { Button } from "@/components/ui/button";
import { IoMdHeart } from "react-icons/io";
import { RiEmotionSadLine } from "react-icons/ri";

const DesktopSoldOutCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <menu
      className="absolute bottom-0 right-0 bg-black/50 px-[1.6em] py-[1.6em] backdrop-blur-md z-10"
      style={{
        borderImage: "linear-gradient(to bottom, transparent, #999999) 1",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {/* Game title */}
      <h3 className="uppercase font-bold text-[1.2em] border-b">{title}</h3>

      <div className="flex flex-col items-center justify-center text-center">
        <RiEmotionSadLine className="text-[1.5em] text-[#75F94C] mt-[0.3em] md:text-[2em] lg:text-[2.6em] 2xl:text-[3.6em] 2xl:mt-[0.1em]" />

        <h4 className="font-bold text-[0.83em] text-[#75F94C] my-[0.4em] uppercase">
          Sorry, sold out &#58;&#40;
        </h4>

        <p className="text-[0.75em] mb-[1em]">
          Want this game? Add it to your wishlist <br /> to keep track of it
          while it&apos;s sold out.
        </p>

        <Button
          variant="gaming"
          className="w-[70%] h-[2em] text-[0.9em] px-[1em] py-0 font-semibold"
        >
          <IoMdHeart className="text-[1.2em] me-[0.1em]" />
          Add to Wishlist
        </Button>
      </div>
    </menu>
  );
};

export default DesktopSoldOutCard;
