interface Geo {
  lat: string
  lng: string
  [key: string]: unknown
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
  [key: string]: unknown
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
  [key: string]: unknown
}

export interface User {
  id?: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
  [key: string]: unknown
}
