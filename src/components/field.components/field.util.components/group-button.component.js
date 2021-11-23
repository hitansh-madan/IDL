import React from "react";

export default function groupButton(fieldtype, buttonText, handleClick) {
  return (
    <button
      type="button"
      className="btn btn-dark border my-2"
      onClick={() => handleClick(fieldtype)}
    >
      {buttonText}
    </button>
  );
}
