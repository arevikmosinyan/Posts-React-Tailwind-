import React from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { HOME_ROUTE, CREATE_ROUTE } from "../constants/constant";

const navigation = [
  { name: "Home", href: `${HOME_ROUTE}` },
  { name: "Create a new post", href: `${CREATE_ROUTE}` },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {navigation.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={classNames(
                  "rounded-full px-9 py-2 text-gray-300 font-medium",
                  "border border-blue-400 border-opacity-50",
                  "focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800",
                  "transition duration-300 ease-in-out  hover:text-white hover:font-bold"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </>
    </Disclosure>
  );
}
