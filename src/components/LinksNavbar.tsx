import React from "react";

function LinksNavbar({ title }: { title: string }) {
  return (
    <div>
      <li className="hover:text-green-600 cursor-pointer">{title}</li>
    </div>
  );
}

export default LinksNavbar;
