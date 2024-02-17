import "../../index.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DropdownCart from "./DropdownCart";
import DropdownAccount from "./DropdownAccount";
import { NavLink } from "react-router-dom";
import DropdownGenre from "./DropdownGenre";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const user = localStorage.getItem("user");

export default function Navbar() {
  const { auth } = useAuth();
  const location = useLocation();
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
    setGenreDropdownOpen(false);
    setCartDropdownOpen(false);
  };

  const toggleGenreDropdown = () => {
    setGenreDropdownOpen(!genreDropdownOpen);
    setAccountDropdownOpen(false);
    setCartDropdownOpen(false);
  };

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
    setAccountDropdownOpen(false);
    setGenreDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setAccountDropdownOpen(false);
    setGenreDropdownOpen(false);
    setCartDropdownOpen(false);
  };

  return (
    <>
      <nav className="flex-col justify-between text-white w-full relative z-[100]">
        <div className="px-10 py-6 flex w-full items-center mx-auto">
          <Link to="">
            <div id="logo" className="rotate-355 bg-white/10 p-2">
              <div
                id="logo"
                className="border border-blockbuster-yellow border-r-0 p-2"
              >
                <h1 id="title" className="text-3xl">
                  {" "}
                  KnockBuster{" "}
                </h1>
              </div>
            </div>
          </Link>
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 h-full place-items-center">
            <li>
              <NavLink
                id="title"
                to="" end
                onClick={() => {
                  closeAllDropdowns();
                }}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-b from-black/50 to-transparent  text-xl h-full p-1"
                    : "non-active-class text-xl p-1"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="flex items-center justify-center">
              <NavLink
                id="title"
                to="products"
                onClick={() => {
                  closeAllDropdowns();
                }}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-b from-black/50 to-transparent text-xl h-full p-1 place-text-center justify-self-center"
                    : "non-active-class text-xl p-1"
                }
              >
                Products
              </NavLink>
            </li>
            <li className="flex items-center justify-center">
              <div
                id="title"
                onClick={toggleGenreDropdown}
                className={
                  location.pathname.includes("/genre") || genreDropdownOpen
                    ? "bg-gradient-to-b from-black/50 to-transparent text-xl h-full p-1"
                    : "non-active-class text-xl p-1"
                }
              >
                <DropdownGenre
                  isOpen={genreDropdownOpen}
                  onClose={() => setGenreDropdownOpen(false)}
                />
              </div>
            </li>

            <li>
              <NavLink
                id="title"
                to="AddProduct"
                onClick={() => {
                  closeAllDropdowns();
                }}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-b from-black/50 to-transparent text-xl h-full p-1"
                    : "non-active-class text-xl p-1"
                }
              >
                Request A Product
              </NavLink>
            </li>
            <li>
              <NavLink
                id="title"
                to="About"
                onClick={() => {
                  closeAllDropdowns();
                }}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-b from-black/50 to-transparent  text-xl h-full p-1"
                    : "non-active-class text-xl p-1"
                }
              >
                {" "}
                About Us{" "}
              </NavLink>
            </li>
          </ul>
          <ul>
            <div className="flex relative right-0 space-x-10 mx-auto px-7">
              {auth === true ? (
                <div className="flex flex-row">
                  <li className="mr-3">
                    <div
                      className={
                        cartDropdownOpen
                          ? "bg-gradient-to-b from-black/50 to-transparent text-xl h-full p-1"
                          : "non-active-class text-xl p-1"
                      }
                      onClick={toggleCartDropdown}
                    >
                      <DropdownCart
                        isOpen={cartDropdownOpen}
                        onClose={() => setCartDropdownOpen(false)}
                      />
                    </div>
                  </li>
                  <li>
                    <div
                      className={
                        accountDropdownOpen
                          ? "bg-gradient-to-b from-black/70 to-transparent text-xl h-full z-[100] py-1 px-2 "
                          : "non-active-class text-xl py-1 px-2 z-[100]"
                      }
                      onClick={toggleAccountDropdown}
                    >
                      <DropdownAccount
                        isOpen={accountDropdownOpen}
                        onClose={() => setAccountDropdownOpen(false)}
                      />
                      <Link to="logout"></Link>
                    </div>
                  </li>
                </div>
              ) : (
                <>
                  <li>
                  <div
                      className={
                        cartDropdownOpen
                          ? "bg-gradient-to-b from-black/50 to-transparent text-xl h-full p-1"
                          : "non-active-class text-xl p-1"
                      }
                      onClick={toggleCartDropdown}
                    >
                      <DropdownCart
                        isOpen={cartDropdownOpen}
                        onClose={() => setCartDropdownOpen(false)}
                      />
                    </div>
                  </li>
                  <li className="mr-3">
                    <Link id="title" className="text-xl" to="login">
                      Log-In
                    </Link>
                  </li>
                  <li className="mr-3">
                    <Link id="title" className="text-xl" to="register">
                      Sign-Up
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}
