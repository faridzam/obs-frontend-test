import { colors } from '@/constants/colors';
import { setUser } from '@/libs/redux/features/users/users';
import store from '@/libs/redux/store';
import { User } from '@/types/user';
import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import UserModal from './_components/UserModal';
import UserTable from './_components/UserTable';
import useUser from './_hooks/useUser.hook';

const Page = () => {
  const { defaultUsers } = useLoaderData() as { defaultUsers: User[] };

  const { modalOpen, handleOpenModal, handleCloseModal, handleCreateUser } =
    useUser();

  useEffect(() => {
    if (
      !store.getState().user.users ||
      store.getState().user.users.length <= 0
    ) {
      store.dispatch(setUser(defaultUsers));
    }
  }, [defaultUsers]);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
      <UserModal
        id="modal-create"
        open={modalOpen!['modal-create'] === true}
        type="create"
        onClose={() => handleCloseModal('modal-create')}
        onCreate={(data) => handleCreateUser(data)}
      />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="h4">User Lists</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <Add sx={{ color: colors.white.light, fontSize: '18px' }} />
          }
          onClick={() => handleOpenModal('modal-create')}
        >
          <Typography variant="button" color={colors.white.light}>
            Create User
          </Typography>
        </Button>
      </Box>
      <UserTable />
    </Box>
  );
};

export default Page;
