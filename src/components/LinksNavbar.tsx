import React from "react";

function LinksNavbar({ title }) {
  return (
    <div>
      <li className="hover:text-red-600 cursor-pointer">{title}</li>
    </div>
  );
}

export default LinksNavbar;
