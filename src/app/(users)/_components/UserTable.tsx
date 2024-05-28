import { colors } from "@/constants/colors";
import { setPage, setRowsPerPage } from "@/libs/redux/features/users/users";
import { RootState } from "@/libs/redux/store";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

interface Column {
  id: 'photo' | 'name' | 'username' | 'email' | 'address' | 'phone' | 'company' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'photo', label: 'Photo', minWidth: 30, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
  { id: 'username', label: 'Username', minWidth: 100, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 100, align: 'left' },
  { id: 'address', label: 'Address', minWidth: 100, align: 'left' },
  { id: 'phone', label: 'Phone', minWidth: 100, align: 'left' },
  { id: 'company', label: 'Company', minWidth: 100, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 100, align: 'left' },
];

const UserTable = () => {

  const dispatch = useDispatch()

  const users = useSelector((state:RootState) => state.user.users)
  const page = useSelector((state:RootState) => state.user.page)
  const rowsPerPage = useSelector((state:RootState) => state.user.rowsPerPage)

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(+event.target.value));
    dispatch(setPage(0));
  };

  return(
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '0 !important'}}>
      <TableContainer sx={{ height: '70vh', minHeight: '400px', maxHeight: '1154px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={`user-${row.id}`}>
                    <TableCell align={'center'}>
                      <img key={`user-photo-${row.id}`} src={`https://picsum.photos/40.webp?random=${Math.random()}`} alt={`photo-${row.id}`} />
                    </TableCell>
                    <TableCell align={'left'}>
                      <Typography variant="body1">{row.name}</Typography>
                    </TableCell>
                    <TableCell align={'left'}>
                      <Typography variant="body1">{row.username}</Typography>
                    </TableCell>
                    <TableCell align={'left'}>
                      <Typography variant="body1">{row.email}</Typography>
                    </TableCell>
                    <TableCell align={'left'}>
                      <Typography variant="body1">{row.address.street}</Typography>
                      <Typography variant="body1">{row.address.suite}</Typography>
                      <Typography variant="body1">{row.address.city}, {row.address.zipcode}</Typography>
                    </TableCell>
                    <TableCell align={'left'}>
                      <Typography variant="body1">{row.phone}</Typography>
                    </TableCell>
                    <TableCell align={'left'}>
                      <Typography variant="body1">{row.company.name}</Typography>
                    </TableCell>
                    <TableCell align={'left'}>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default UserTable