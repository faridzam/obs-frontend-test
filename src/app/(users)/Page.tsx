import { colors } from "@/constants/colors"
import { Add } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import UserTable from "./_components/UserTable"

const Page = () => {
  // const {users} = useLoaderData() as {users: User[]}
  // const dispatch = useDispatch()
  return(
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'16px'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="h4">User Lists</Typography>
        <Button 
          variant="contained"
          startIcon={<Add sx={{color: colors.white.light, fontSize: '18px'}} />}
        >
          <Typography variant="button" color={colors.white.light}>Create User</Typography>
        </Button>
      </Box>
      <UserTable />
    </Box>
  )
}

export default Page