import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Carticon } from "../../assets/cart.svg";
import CartDropdownTest from "./CartDropDown";
import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useTotal } from "../../contexts/TotalContext";
import "../../index.css";

function Dropdown({ isOpen, onClose }) {
  const { cart } = useCart();
  const { quantity, total } = useTotal();
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCartQuantity(quantity);
    setIsLoading(false);
  }, [quantity, cart]);

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex flex-row gap-x-5"
        type="button"
        onClick={() => isOpen && onClose()}
      >
        <div className="indicator mx-2">
          <Carticon />
          {isLoading ? (
            <span className="loading loading-spinner loading-md justify-self-center self-center" />
          ) : (
            <span className="badge badge-sm indicator-item">
              {cartQuantity}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-[100]  mt-2 w-80 rounded-sm   shadow-lg bg-white ">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div role="menuitem" className="flex justify-between">
              <a className="px-4 py-2 w-fit text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                In Your Cart
              </a>
              <a className="px-4 py-2 w-fit text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                ${total}
              </a>
            </div>
            <div role="menuitem">
              <CartDropdownTest />
            </div>
            <Link
              to="/cart"
              className="block px-4 py-2 text-sm  text-center text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Check-Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
