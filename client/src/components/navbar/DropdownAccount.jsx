import { useState } from "react";
import { ReactComponent as Usericon } from "../../assets/user.svg";
import { Link } from "react-router-dom";
import { Logout } from "../../pages/Logout";
import { useAuth } from "../../contexts/AuthContext";

function Dropdown({ isOpen, onClose }) {
  //  const [isOpen, setIsOpen] = useState(false);
  const { auth, user } = useAuth();

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex flex-row"
        type="button"
        onClick={() => isOpen && onClose()}
      >
        <Usericon />
      </button>
      {isOpen && (
        <div className="absolute right-[-8px] z-10 mt-2 w-60 shadow-lg rounded-sm bg-white ">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <ol>
              {user ? (
        
                  <div className="flex justify-between hover:bg-gray-100 hover:text-gray-900">
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700 "
                      role="menuitem"
                      to="/account-settings"
                    >
                      Account Settings
                    </Link>
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      to="/account-settings"
                    >
                      {user.username}
                    </Link>
                  </div>
      
              ) : (
                <Link to="/account-settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Account settings
                
                </Link>
              )}
              <Link to="/watchListMenu">
                <li
                  className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Watch Lists
                </li>{" "}
              </Link>
              <Link to="/changepassword">
                <li
                  className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Change Password
                </li>{" "}
              </Link>
              <li
                className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {" "}
                Update Information
              </li>
              <li
                className="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {" "}
                Payment Details
              </li>
            </ol>
            <a className="text-center">
              <Logout />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
