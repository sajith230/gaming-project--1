import React, { useRef, useEffect } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import Link from "next/link";

interface AccessDeniedModalProps {
  open: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const AccessDeniedModal: React.FC<AccessDeniedModalProps> = ({
  open,
  setIsOpen,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setIsOpen]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        ref={dialogRef}
        className="w-4/5 bg-gradient-to-tr from-black/40 from-20%  to-[#00935D]/40 font-primaryFont text-[9px] text-white py-[3.5em] border rounded-none backdrop-blur-[8px] sm:text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
        style={{
          borderImage: `linear-gradient(to bottom, #0D6D49 0%, #19D38E 100%) 1`,
        }}
      >
        <button
          className="absolute top-[1em] right-[1em] hover:opacity-70"
          onClick={() => setIsOpen(false)}
        >
          <IoMdClose className="text-[#00FFA1] text-[1.5em]" />
        </button>

        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-[9px] sm:text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
            <h4 className="font-bold text-[1.5em] uppercase">
              You do not have access
            </h4>
            <p className="font-normal text-[1em]">
              Please Login or Create Account
            </p>
            <hr className="w-4/5 mx-auto opacity-70" />
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-center justify-center text-[calc(1em+1px)]">
          <Link href="/sign-in" className="w-[70%]">
            <Button
              variant="gaming"
              className="w-full h-fit text-[1em] my-[1.5em] px-[1em] py-[0.5em] uppercase"
            >
              Sign in
            </Button>
          </Link>

          <p className="font-light text-[0.8125em] my-[0.5em]">
            Do not have an account?
          </p>

          <Link href="/sign-up" className="w-[70%]">
            <Button
              variant="outline"
              className="w-full h-fit font-semibold text-[1em] px-[1em] py-[0.5em] uppercase border-[#0BDB45] rounded-none hover:bg-[#0BDB45]"
            >
              Create account
            </Button>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccessDeniedModal;
