"use client";

import React, { useState } from "react";
import NewTaskModal from "../NewTaskModal";

import { HiPlusCircle } from "react-icons/hi2";

const FloatingButton = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="fixed right-5 bottom-5 lg:hidden">
      <button
        onClick={() => setOpenModal((prev) => !prev)}
        className="bg-white rounded-full"
      >
        <HiPlusCircle size={60} className="text-orange-500" />
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

export default FloatingButton;
