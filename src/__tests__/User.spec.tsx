// import '@/__mocks__/globalFetchMock';
import UserPage from '@/app/(users)/Page';
import useUser from '@/app/(users)/_hooks/useUser.hook';
import LoadingModal from '@/components/modals/LoadingModal';
import store, { persistor } from '@/libs/redux/store';
// import { Request } from '@remix-run/web-fetch';
import { act, render, renderHook, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

// dummy datas
const FAKE_USERS_DATA = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
]
const FAKE_CREATE_USER_DATA = {
  "id": 3,
  "name": "Clementine Bauch",
  "username": "Samantha",
  "email": "Nathan@yesenia.net",
  "address": {
    "street": "Douglas Extension",
    "suite": "Suite 847",
    "city": "McKenziehaven",
    "zipcode": "59590-4157",
    "geo": {
      "lat": "-68.6102",
      "lng": "-47.0653"
    }
  },
  "phone": "1-463-123-4447",
  "website": "ramiro.info",
  "company": {
    "name": "Romaguera-Jacobson",
    "catchPhrase": "Face to face bifurcated interface",
    "bs": "e-enable strategic applications"
  }
};
const FAKE_UPDATE_USER_DATA = {
  "id": 1,
  "name": "Leanne Graham Bell", // tambah Bell
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulkas Light", // Kulas > Kulkas
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}

// mocks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLoaderData: () => ({defaultUsers: FAKE_USERS_DATA}),
}));

const router = createMemoryRouter(
  [{
    path: "/user",
    element: <UserPage />,
  }],
  { initialEntries: ["/user"] },
);

// tests
test('Renders the user page', () => {
  
  render(
    <Provider store={store}>
      <PersistGate loading={<LoadingModal />} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
  // page rendered
  expect(screen.getByTestId('user-page')).toBeInTheDocument();
  // loader data exist
  expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
})

test('Create user flow', async () => {
  render(
    <Provider store={store}>
      <PersistGate loading={<LoadingModal />} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );

  // click create button
  const createUserModalButton = screen.getByTestId('create-user-button')
  await user.click(createUserModalButton)
  const createUserModal = screen.getByTestId('modal-create')
  expect(createUserModal).toBeVisible()

  const wrapper = ({children}:{children: ReactNode}) => (
    <Provider store={store}>
      <PersistGate loading={<LoadingModal />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )

  // render hook
  const { result } = renderHook(() => useUser(), {wrapper});

  // open modal state
  expect(result.current.modalOpen['modal-create']).toBe(undefined);
  await act( async () => {
    result.current.handleOpenModal('modal-create');
  })
  expect(result.current.modalOpen['modal-create']).toBe(true)

  // submit create user
  await act( async () => {
    result.current.handleCreateUser(FAKE_CREATE_USER_DATA);
  })
  expect(result.current.modalOpen['modal-create']).toBe(undefined);
  expect(store.getState().user.users.filter((user) => user.name === FAKE_CREATE_USER_DATA.name).length).toBeGreaterThan(0)
})

test(('Update user flow'), async () => {
  render(
    <Provider store={store}>
      <PersistGate loading={<LoadingModal />} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
  const selectedId = 1
  // click update button
  const updateUserModalButton = screen.getByTestId(`update-user-button-${selectedId}`)
  await user.click(updateUserModalButton)
  const createUserModal = screen.getByTestId(`modal-update-${selectedId}`)
  expect(createUserModal).toBeVisible()

  const wrapper = ({children}:{children: ReactNode}) => (
    <Provider store={store}>
      <PersistGate loading={<LoadingModal />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )

  // render hook
  const { result } = renderHook(() => useUser(), {wrapper});

  // open modal state
  expect(result.current.modalOpen[`modal-update-${selectedId}`]).toBe(undefined);
  await act( async () => {
    result.current.handleOpenModal(`modal-update-${selectedId}`);
  })
  expect(result.current.modalOpen[`modal-update-${selectedId}`]).toBe(true)

  // submit update user
  await act( async () => {
    result.current.handleUpdateUser(FAKE_UPDATE_USER_DATA);
  })
  expect(result.current.modalOpen[`modal-update-${selectedId}`]).toBe(undefined);

  expect(store.getState().user.users.filter(
    (user) => user.id === FAKE_UPDATE_USER_DATA.id
      && user.name === FAKE_UPDATE_USER_DATA.name 
      && user.address.street === FAKE_UPDATE_USER_DATA.address.street
  ).length).toBeGreaterThan(0)
})

test(('Delete user flow'), async () => {
  render(
    <Provider store={store}>
      <PersistGate loading={<LoadingModal />} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
  const selectedId = 1
  // click update button
  const deleteUserModalButton = screen.getByTestId(`delete-user-button-${selectedId}`)
  await user.click(deleteUserModalButton)
  expect(screen.queryByTestId(`user-row-${selectedId}`)).not.toBeInTheDocument()

  const wrapper = ({children}:{children: ReactNode}) => (
    <Provider store={store}>
      <PersistGate loading={<LoadingModal />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )

  // render hook
  const { result } = renderHook(() => useUser(), {wrapper});

  // delete user
  await act( async () => {
    result.current.handleDeleteUser(selectedId);
  })

  expect(store.getState().user.users.filter(
    (user) => user.id === selectedId
  ).length).toBe(0)
})