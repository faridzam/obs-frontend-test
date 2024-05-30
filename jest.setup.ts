import { assetsFetchMock } from '@/__mocks__/fetchMock';
import '@testing-library/jest-dom';

jest.mock("axios");

let fetchMock: any = undefined;

global.fetch = jest.fn((data: any) =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
) as jest.Mock;

beforeEach(() => {
  fetchMock = jest.spyOn(global, "fetch")
  .mockImplementation(assetsFetchMock);
});

afterEach(() => {
  jest.restoreAllMocks();
});