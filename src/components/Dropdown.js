import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function DropdownMenu({icon, menus}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative ml-auto inline-block text-left">
            <div onClick={toggleDropdown} className="w-fit px-3 cursor-pointer">
                <FontAwesomeIcon
                    className='font-thin text-lg text-gray-200 cursor-pointer' icon={icon} />

            </div>
            {/* Dropdown panel */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 mt-10 overflow-hidden"
                    aria-labelledby="menu-button"
                    role="menu"
                    aria-orientation="vertical"
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0" onClick={toggleDropdown}></div>

                        {/* Dropdown content */}
                        <div className="absolute right-2 w-40 mt-2 origin-top-right bg-gray-800 rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                {menus.map((item) => <li
                                    className="block px-5 py-2 text-sm font-sans font-normal text-gray-200 hover:bg-gray-700 cursor-pointer"
                                    role="menuitem"
                                    onClick={item.action}
                                >
                                    <FontAwesomeIcon className="mr-3 w-6" icon={item.icon}/>
                                    {item.text}
                                </li>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
