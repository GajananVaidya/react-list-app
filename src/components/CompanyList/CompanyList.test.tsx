import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompanyList from './CompanyList';

describe('<CompanyList />', () => {
  it('should mount', async() => {
    const mockSuccessResponse = [{"id": 1,"name": "Leanne Graham"}];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });

    var globalRef:any =global;
    globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    render(<CompanyList />);
    const companyList = await screen.findByTestId('CompanyList');
    expect(companyList).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('catches error and returns null', async() => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve(() => mockJsonPromise);

    var globalRef:any =global;
    globalRef.fetch = jest.fn().mockResolvedValueOnce(() => mockFetchPromise);

    render(<CompanyList />);
    const errorMessage = await screen.findByTestId('errorField');
    expect(errorMessage).toBeInTheDocument();
  });

});