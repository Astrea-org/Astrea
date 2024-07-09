import { CiFilter } from "react-icons/ci";
import { Input } from "@headlessui/react";
import { IoIosSearch } from "react-icons/io";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

function Explore() {
  return (
    <>
      <div className="lg:px-20 md:px-20">
        <div>
          <h1 className="text-center font-extrabold mt-24 text-4xl">Explore</h1>
        </div>
        <div className="flex gap-3 mt-10">
          <div className="bg-[#F3F4F6] flex p-1 px-2 gap-1">
            <CiFilter className="mt-1" />
            <p>Filter</p>
          </div>
          <div className="relative flex items-center">
            <IoIosSearch className="absolute left-3 text-gray-400" />
            <Input
              name="full_name"
              type="text"
              placeholder="Search collections"
              className="bg-[#F3F4F6] p-1 pl-10 outline-none w-[800px]"
            />
          </div>
          <div className="flex gap-3">
            <p>Sort by:</p>
            <Menu>
              <MenuButton className="bg-[#F3F4F6] w-36 px-2 py-1 flex justify-between">
                <span>Newest</span>
                <span>
                  <RiArrowDropDownLine className="mt-1" />
                </span>
              </MenuButton>
              <MenuItems anchor="bottom">
                <MenuItem>
                  <a
                    className="block data-[focus]:bg-blue-100"
                    href="/settings"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a className="block data-[focus]:bg-blue-100" href="/support">
                    Support
                  </a>
                </MenuItem>
                <MenuItem>
                  <a className="block data-[focus]:bg-blue-100" href="/license">
                    License
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
