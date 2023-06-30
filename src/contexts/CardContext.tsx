import React, { createContext, useState } from "react";

// Define the modal context type
export type ModalContextType = {
  showModal: (modalData: ModalData) => void;
  hideModal: () => void;
  modalData: ModalData | null;
};

// Define the modal data type
export type ModalData = {
  id: number;
  name?: string;
  desc?: string;
  type?: string;
  func?: () => void;
  equipment?: string[];
  people?: string[];
  assigned?: { id: number; name: string }[];
  assignedTo?: { id: number; name: string }[];
};

// Create the initial context value
const initialContext: ModalContextType = {
  showModal: () => {},
  hideModal: () => {},
  modalData: null,
};

// Create the modal context
export const ModalContext = createContext(initialContext);

// Create the modal provider component
export const ModalProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  // Function to show the modal with the provided data
  const showModal = (data: ModalData) => {
    setModalData(data);
  };

  // Function to hide the modal
  const hideModal = () => {
    setModalData(null);
  };

  // Create the context value object
  const contextValue: ModalContextType = {
    showModal,
    hideModal,
    modalData,
  };

  // Render the provider with the context value and children components
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
