import {
  addUser,
  deleteUser,
  updateUser,
} from '@/libs/redux/features/users/users';
import { User } from '@/types/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface IModalOpenState {
  [id: string]: boolean;
}

const useUser = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<IModalOpenState>({});

  const handleCloseModal = (id: string) => {
    setModalOpen({
      [id]: false,
    });
  };

  const handleOpenModal = (id: string) => {
    setModalOpen({
      [id]: true,
    });
  };

  const handleCreateUser = (data: User) => {
    try {
      dispatch(addUser(data));
      setModalOpen({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = (data: User) => {
    try {
      dispatch(updateUser(data));
      setModalOpen({});
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = (id: number) => {
    try {
      dispatch(deleteUser(id));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    modalOpen,
    handleOpenModal,
    handleCloseModal,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
  };
};

export default useUser;
