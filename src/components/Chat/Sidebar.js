import React, { useContext, useState } from "react";
import {
  faEllipsisVertical,
  faMagnifyingGlass,
  faThumbTack,
  faSliders,
  faRightFromBracket,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext as userContext } from "../../contexs/authContext";
import DropdownMenu from "../Dropdown";
import clientService from "../../services/userService";

function Sidebar({ rooms, setActiveRoom, activeRoom, messages }) {
  const { user, setUser } = useContext(userContext);
  const [search, setSearch] = useState("");
  return (
    <div
      className={
        (activeRoom ? "lg:flex hidden" : "flex") +
        " flex-col h-full w-full lg:w-[30%] bg-gray-800 border-r border-gray-700"
      }
    >
      <div
        className=" h-full w-full bg-opacity-40 bg-gray-900"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div className="flex sticky top-0 items-center py-3 border-b border-gray-700 bg-gray-900 px-5 text-white text-xl font-semibold">
          <img src="/logo.png" className="w-8 rounded-full h-8" />
          <div className="ml-3">
            <h3 className="font-bold text-sm text-gray-300">Mitra Chat</h3>
          </div>
          <DropdownMenu
            icon={faEllipsisVertical}
            menus={[
              { text: "Profile", icon: faUser },
              { text: "New Group", icon: faUsers },
              {
                text: "Logout",
                action: () => {
                  clientService.logout();
                  setUser({});
                },
                icon: faRightFromBracket,
              },
            ]}
          />
        </div>
        <div className="py-2 items-center flex mx-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[95%] h-8 capitalize outline-none bg-opacity-70 px-2 text-white text-xs font-semibold bg-gray-900 rounded-l-lg"
          />
          <button className="bg-gray-900 h-8 bg-opacity-70 text-gray-200 px-3 rounded-r-lg">
            <FontAwesomeIcon className="text-xs" icon={faMagnifyingGlass} />
          </button>
          <FontAwesomeIcon
            className="ml-3 cursor-pointer text-lg font-bold text-gray-300"
            icon={faSliders}
          />
        </div>
        <ul className="flex flex-col h-[84%] overflow-y-scroll">
          {rooms.map((room) => {
            var msgs = messages
              .filter((message) => message.room == room.id)
              .reverse();
            if (!room.name.toLowerCase().includes(search.toLocaleLowerCase())) {
              return;
            }
            return (
              <li
                onClick={() => setActiveRoom(room)}
                className="flex cursor-pointer items-center py-3 border-b border-gray-700 bg-gray-900 bg-opacity-70 hover:bg-opacity-80 px-5 text-white text-xl font-semibold"
              >
                <img
                  src="https://www.kindpng.com/picc/m/22-223910_circle-user-png-icon-transparent-png.png"
                  className="w-8 ring-1 ring-gray-600 hover:scale-110 rounded-full h-8"
                />
                <div className="ml-3">
                  <h3 className="font-bold text-sm text-gray-300">
                    {room.name}
                  </h3>
                  <p className="text-xs font-normal text-gray-400">
                    {msgs.length ? msgs[0].text : ""}
                  </p>
                </div>
                <div className="ml-auto flex flex-col justify-end items-end">
                  <p className="text-gray-600 text-[10px]">
                    {msgs.length
                      ? new Date(msgs[0].time).toLocaleTimeString([], {
                          hour12: true,
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>
                  {/* {room.pinned < 5 ?
                    <FontAwesomeIcon className='ml-0 text-[10px] text-gray-700 hover:scale-150 font-thin rotate-45' icon={faThumbTack} />
                    : <></>} */}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;
