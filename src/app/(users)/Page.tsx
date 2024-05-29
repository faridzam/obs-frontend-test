import { colors } from "@/constants/colors"
import { setUser } from "@/libs/redux/features/users/users"
import { useAppSelector } from "@/libs/redux/hooks"
import store, { RootState } from "@/libs/redux/store"
import { User } from "@/types/user"
import { Add } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import UserModal from "./_components/UserModal"
import UserTable from "./_components/UserTable"
import useUser from "./_hooks/useUser.hook"

const Page = () => {

  const {defaultUsers} = useLoaderData() as {defaultUsers: User[]}

  const {
    modalOpen,
    handleOpenModal,
    handleCloseModal,
    handleCreateUser,
  } = useUser()

  useEffect(() => {
    if (store.getState()._persist.rehydrated && store.getState().user.users.length <= 0) {
      store.dispatch(setUser(defaultUsers))
    }
  }, [useAppSelector((state: RootState) => state._persist.rehydrated)])

  return(
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'16px'}
    >
      {
        modalOpen && (
          <UserModal 
            key={`modal-create-${Math.random()}`}
            open
            type="create"
            onClose={handleCloseModal}
            onCreate={(data) => handleCreateUser(data)}
          />
        )
      }
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="h4">User Lists</Typography>
        <Button 
          variant="contained"
          color="primary"
          startIcon={<Add sx={{color: colors.white.light, fontSize: '18px'}} />}
          onClick={handleOpenModal}
        >
          <Typography variant="button" color={colors.white.light}>Create User</Typography>
        </Button>
      </Box>
      <UserTable />
    </Box>
  )
}

export default Page