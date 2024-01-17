"use client";

import React, { useState } from "react";
import NewTaskModal from "../NewTaskModal";

import { HiPlusCircle } from "react-icons/hi2";

const ModalButton = ({ btnName }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpenModal((prev) => !prev)}
        className="items-center hidden gap-2 px-4 py-2 font-bold text-white duration-200 rounded-md outline outline-2 outline-white lg:flex hover:bg-white hover:text-black hover:outline-none"
      >
        <HiPlusCircle size={30} />
        {btnName}
      </button>
      {openModal && (
        <NewTaskModal
          isVisible={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default ModalButton;
