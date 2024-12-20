import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

import samplePic from "@/public/images/sample-pic.png";
import { useRoleContext } from "@/context/RoleContext";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AddUserModalProps {
  addUser: (newUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profile_image: string;
    password: string;
    address: string;
    state: string;
    city: string;
    postalCode: string;
  }) => Promise<void>;
  setShowModal: (show: boolean) => void;
  editingUser: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profile_image: string;
    password: string;
    address: string;
    state: string;
    city: string;
    postalCode: string;
  } | null;
  getAllAdmins: (page: number) => void;
}

const AddCustomerModal: React.FC<AddUserModalProps> = ({
  addUser,
  setShowModal,
  editingUser,
  getAllAdmins,
}) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const { roles } = useRoleContext();

  const [date, setDate] = useState<Date>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username);
      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
      setEmail(editingUser.email);
      setImage(editingUser.profile_image);
      setAddress(editingUser.address);
      setState(editingUser.state);
      setCity(editingUser.city);
      setPostalCode(editingUser.postalCode);
    } else {
      clearFields();
    }
  }, [editingUser]);

  const handleSubmit = async () => {
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      profile_image: newImageUrl || image,
      password,
      address,
      state,
      city,
      postalCode,
      roleId: "66f283ca91dac61a9ac90d39"
    };

    try {
      let response;
      if (editingUser) {
        response = await axiosInstance.patch(
          `/auth/${editingUser.id}`,
          newUser
        );
      } else {
        response = await axiosInstance.post("/auth/register", newUser);
      }
      toast.success(response.data.message);

      if (response.status >= 200 && response.status < 300) {
        await addUser(newUser);
        setShowModal(false);
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
      getAllAdmins(1);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileType = file.type;
      const data = {
        fileType: fileType,
      };

      const res = await axiosInstance.post(`presigned-url/generate`, data);
      const uploadUrl = res.data.uploadUrl;
      const downloadUrl = res.data.downloadUrl;

      try {
        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": fileType,
          },
          body: file,
        });

        if (response.ok) {
          setNewImageUrl(downloadUrl);
          setImage(downloadUrl);
        } else {
          console.error("Failed to upload file", response);
        }
      } catch (error) {
        console.error("Error during file upload", error);
      }
    }
  };

  const clearFields = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setImage("");
    setPassword("");
    setAddress("");
    setState("");
    setCity("");
    setPostalCode("");
    setNewImageUrl("");
  };

  return (
    <div className="fixed h-full inset-0 bg-black/80 flex justify-center items-center font-medium text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px]">
      <div className="relative bg-gradient-to-tr from-black/40 from-15% to-[#00a76966] backdrop-blur-md p-[3em] rounded-md border border-[#19D38E]">
        <div className="font-bold text-[1.5em] pb-[0.6em] border-b border-b-[#0D6D49] flex justify-between">
          <h2>{editingUser ? "Edit User" : "Add User"}</h2>
          <button
            className="text-[#00FFA1] text-[1.4em] hover:opacity-80 transition-opacity duration-100"
            onClick={() => setShowModal(false)}
          >
            <IoClose />
          </button>
        </div>

        <div className="flex flex-col gap-y-[2em] my-[2em] md:flex-row md:gap-y-0 md:gap-x-[2em] *:md:bg-black/40 *:md:p-[2.8em] *:md:rounded-sm *:md:border *:md:border-[#0D6D49]">
          {/* Image area */}
          <div className="flex items-center justify-center gap-x-[2em] md:flex-col md:justify-start md:text-center md:mb-[15%]">
            <div className="relative">
              <Image
                src={image ? image : samplePic}
                alt="Sample pic"
                className="size-[8em] rounded-full"
                width={104}
                height={104}
              />
              <label
                htmlFor="profile-image"
                className="text-[2em] text-[#0BDB45] absolute bottom-0 right-0 cursor-pointer"
              >
                <FaCirclePlus />
              </label>
            </div>
            <div className="py-[1em] border-b border-[#0D6D49] font-secondaryFont text-[1.5em] font-bold md:text-[1.2em]">
              <p>
                {firstName !== "" || lastName !== ""
                  ? `${firstName} ${lastName}`
                  : "Your Name"}
              </p>
              <p className="font-light text-[0.6em]">
                {email ? email : "sample@sample-domain.com"}
              </p>
            </div>
          </div>

          {/* Form area */}
          <div>
            <h2 className="font-bold text-[1.4em] uppercase mb-[0.5em]">
              Personal details
            </h2>

            {/* First name and last name */}
            <div className="grid grid-cols-2 gap-x-[0.7em] mt-[1.4em] font-medium xl:gap-x-[2em] 2xl:gap-x-[4.8em]">
              <div>
                <p className="capitalize">First Name</p>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  required
                />
              </div>
              <div>
                <p className="capitalize">Last Name</p>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  required
                />
              </div>
            </div>

            {/* Username and birth date */}
            <div className="grid grid-cols-2 gap-x-[0.7em] mt-[1.4em] font-medium xl:gap-x-[2em] 2xl:gap-x-[4.8em]">
              <div>
                <p className="capitalize">Username</p>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  readOnly={editingUser ? true : false}
                  required
                />
              </div>
              <div>
                <label className="block capitalize">Date of birth</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-[1em] h-fit py-[0.6em] justify-start text-left font-normal rounded-sm",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-[0.6em] size-[1.4em]" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Address */}
            <div className="mt-[1.4em]">
              <label className="block capitalize">Address</label>
              <Input
                type="text"
                className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* State, city and zip code */}
            <div className="grid grid-cols-3 gap-x-[0.7em] mt-[1.4em] font-medium xl:gap-x-[2em] 2xl:gap-x-[4.8em]">
              <div>
                <label className="block capitalize">State</label>
                <Input
                  type="text"
                  className="text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div>
                <label className="block capitalize">City</label>
                <Input
                  type="text"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className="block capitalize">ZIP Code</label>
                <Input
                  type="text"
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className=" mt-[1.4em]">
              <p className="capitalize">E-mail</p>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm"
                required
              />
            </div>

            {/* Password */}
            {!editingUser && (
              <div className=" mt-[1.4em]">
                <p className="capitalize">Password</p>
                {/* <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm xl:w-[65ch] 2xl:w-[72ch]"
                  required={!editingUser}
                /> */}

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent w-full text-[1em] px-[1em] py-[0.6em] h-fit rounded-sm xl:w-[65ch] 2xl:w-[72ch] border-[1px] border-white"
                    required={!editingUser}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            )}

            {/* Avatar */}
            <Input
              id="profile-image"
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />

            {/* Submit */}
            <div className="flex justify-between items-center mt-[2em]">
              <p className="text-[0.76em] max-w-[40ch] md:max-w-[44ch] xl:max-w-[50ch] 2xl:max-w-[65ch]">
                Please review and ensure that all the details you have entered
                are correct before submitting.
              </p>
              <button
                className="text-black font-semibold text-[1.1em] px-[1.5em] py-[0.5em] bg-[#00FFA1] rounded hover:opacity-90 transition-opacity duration-100"
                onClick={handleSubmit}
              >
                {editingUser ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
