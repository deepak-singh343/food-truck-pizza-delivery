import React from "react";

interface Props {
  message: string;
  type: string;
}

const Notification = ({ message, type }: Props) => {
  return (
    <div
      className={`${type == "success" ? "border-green-400" : "border-red-400"}`}
    >
      {message}
    </div>
  );
};

export default Notification;
