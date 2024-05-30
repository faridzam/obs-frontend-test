import { colors } from '@/constants/colors'
import { setPage, setRowsPerPage } from '@/libs/redux/features/users/users'
import { useAppSelector } from '@/libs/redux/hooks'
import { RootState } from '@/libs/redux/store'
import { Delete, Description, Edit } from '@mui/icons-material'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { Fragment } from 'react/jsx-runtime'
import useUser from '../_hooks/useUser.hook'
import UserModal from './UserModal'

interface Column {
  id: 'photo' | 'name' | 'username' | 'email' | 'address' | 'phone' | 'company' | 'action'
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
}

const columns: readonly Column[] = [
  { id: 'photo', label: 'Photo', minWidth: 30, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
  { id: 'username', label: 'Username', minWidth: 100, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 100, align: 'left' },
  { id: 'address', label: 'Address', minWidth: 100, align: 'left' },
  { id: 'phone', label: 'Phone', minWidth: 100, align: 'left' },
  { id: 'company', label: 'Company', minWidth: 100, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 120, align: 'left' },
]

const UserTable = () => {
  const dispatch = useDispatch()

  const {
    modalOpen,
    handleOpenModal,
    handleCloseModal,
    handleUpdateUser,
    handleDeleteUser,
  } = useUser()

  const users = useAppSelector((state: RootState) => state.user.users)
  const page = useAppSelector((state: RootState) => state.user.page)
  const rowsPerPage = useAppSelector((state: RootState) => state.user.rowsPerPage)

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(+event.target.value))
    dispatch(setPage(0))
  }

  return (
    <>
      <Paper
        sx={{
          height: '70vh',
          minHeight: '250px',
          maxHeight: '980px',
          overflow: 'hidden',
          padding: '0 !important',
        }}
      >
        <TableContainer sx={{ height: '70vh', minHeight: '250px', maxHeight: '1154px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={
                      column.id === 'action'
                        ? {
                            minWidth: column.minWidth,
                            position: 'sticky',
                            right: 0,
                            background: colors.secondary.dark,
                            zIndex: '9999 !important',
                          }
                        : {
                            minWidth: column.minWidth,
                            background: colors.secondary.light,
                          }
                    }
                  >
                    <Typography variant="subtitle2" color={colors.black.main}>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <Fragment key={`user-${row.id}`}>
                      <UserModal
                        data-testid={`modal-update-${row.id}`}
                        id={`modal-update-${row.id}`}
                        open={modalOpen[`modal-update-${row.id}`] === true}
                        type="update"
                        data={row}
                        onClose={handleCloseModal}
                        onUpdate={data => handleUpdateUser(data)}
                      />
                      <TableRow hover role="checkbox" tabIndex={-1} data-testid={`user-row-${row.id}`}>
                        <TableCell align={'center'}>
                          <img
                            src={`https://picsum.photos/id/${row.id}/40.webp`}
                            alt={`photo-${row.id}`}
                            style={{
                              borderRadius: '8px',
                            }}
                          />
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.name}</Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.username}</Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.email}</Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.address.street}</Typography>
                          <Typography variant="body2">{row.address.suite}</Typography>
                          <Typography variant="body2">
                            {row.address.city}, {row.address.zipcode}
                          </Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.phone}</Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.company.name}</Typography>
                        </TableCell>
                        <TableCell
                          align={'left'}
                          sx={{
                            position: 'sticky',
                            right: 0,
                            background: colors.secondary.light,
                            zIndex: '9998 !important',
                          }}
                        >
                          <IconButton>
                            <Description />
                          </IconButton>
                          <IconButton
                            data-testid={`update-user-button-${row.id}`}
                            onClick={() => handleOpenModal(`modal-update-${row.id}`)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            data-testid={`delete-user-button-${row.id}`}
                            onClick={() => handleDeleteUser(row.id!)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default UserTable
