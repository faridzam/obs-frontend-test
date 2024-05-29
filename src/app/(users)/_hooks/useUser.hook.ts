import { addUser } from "@/libs/redux/features/users/users";
import { User } from "@/types/user";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useUser = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCreateUser = (data: User) => {
    try {
      dispatch(addUser(data));
      handleCloseModal()
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUpdateUser = (data: User) => {
    console.log('update user : ', data);
  };

  return {
    modalOpen,
    handleOpenModal,
    handleCloseModal,
    handleCreateUser,
    handleUpdateUser
  };
};

export default useUser