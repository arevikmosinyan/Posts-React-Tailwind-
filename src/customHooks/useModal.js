import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return {
    isOpen: isOpen,
    openModal: openModal,
    closeModal: closeModal,
  };
}
export default useModal;
