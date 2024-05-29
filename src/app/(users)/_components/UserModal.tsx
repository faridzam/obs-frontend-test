import TextInput from "@/components/inputs/TextInput"
import { User } from "@/types/user"
import { checkEmptyForm } from "@/utils/object"
import { setNestedState } from "@/utils/stateHelper"
import { capitalizeFirstLetter } from "@/utils/strings"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography, useMediaQuery, useTheme } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { ChangeEvent, useState } from "react"

interface IUserModalProps {
  type?: 'create' | 'update'
  open: boolean
  data?: User
  onClose: () => void
  onCreate?: (data: User) => void
  onUpdate?: (data: User) => void
}

const initialState: User = {
  id: 0,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lng: '-6.174710065565897',
      lat: '106.78988380973301',
    }
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: '',
  }
}

const UserModal = (props: IUserModalProps) => {
  const {
    type = 'create',
    open,
    data = initialState,
    onClose,
    onCreate = () => {},
    onUpdate = () => {}
  } = props
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onSubmit = () => {
    switch (type) {
      case 'create':
        onCreate(form)
        break;
      case 'update':
        onUpdate(form)
        break;
    
      default:
        break;
    }
  }

  const [form, setForm] = useState<User>(() => data)

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const keys = name.split('.');

    setForm((prevState: User) => setNestedState(prevState, keys, value));
  };

  // simple validation (just require not empty)
  const disabledSubmit = checkEmptyForm(form, []).includes(true)

  return(
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        sx={{
          zIndex: '10000'
        }}
      >
        <DialogTitle variant="h4">
          {`${capitalizeFirstLetter(type)} User ${data.id || ''}`}
        </DialogTitle>
        <DialogContent>
          <Grid2
            container
            direction={'row'}
            spacing={3}
            columns={16}
          >
            <Grid2 xs={16}>
              <Typography variant="h6">Personal Information</Typography>
            </Grid2>
            <Grid2 xs={16}>
              <TextInput
                label="Name"
                name="name"
                placeholder="Enter user's name"
                value={form.name}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Username"
                name="username"
                placeholder="Enter user's username"
                value={form.username}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter user's email"
                value={form.email}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Phone"
                name="phone"
                type="tel"
                placeholder="Enter user's phone number"
                value={form.phone}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Website"
                name="website"
                placeholder="Enter user's website url"
                value={form.website}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={16}>
              <Divider />
            </Grid2>
            <Grid2 xs={16}>
              <Typography variant="h6">Address Information</Typography>
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Street"
                name="address.street"
                placeholder="Enter user's address (street)"
                value={form.address.street}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Suite"
                name="address.suite"
                placeholder="Enter user's address (suite)"
                value={form.address.suite}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="City"
                name="address.city"
                placeholder="Enter user's address (city)"
                value={form.address.city}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Zip code"
                name="address.zipcode"
                placeholder="Enter user's address (zip code)"
                value={form.address.zipcode}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                disabled
                label="Longitude"
                name="address.geo.lng"
                placeholder="Enter user's address (longitude)"
                value={form.address.geo.lng}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                disabled
                label="Latitude"
                name="address.geo.lat"
                placeholder="Enter user's address (latitude)"
                value={form.address.geo.lat}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={16}>
              <Divider />
            </Grid2>
            <Grid2 xs={16}>
              <Typography variant="h6">Company Information</Typography>
            </Grid2>
            <Grid2 xs={16}>
              <TextInput
                label="Company Name"
                name="company.name"
                placeholder="Enter user's company name"
                value={form.company.name}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Company Catch Phrase"
                name="company.catchPhrase"
                placeholder="Enter user's company catch phrase"
                value={form.company.catchPhrase}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={8}>
              <TextInput
                label="Company Business Sector"
                name="company.bs"
                placeholder="Enter user's company bs"
                value={form.company.bs}
                onChange={(e) => handleChangeForm(e)}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={disabledSubmit} variant="contained" color="primary" onClick={onSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserModal