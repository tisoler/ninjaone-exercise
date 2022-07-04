import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeviceList from '../DeviceList';

const DEVICES = [
  {
    id: 'd1',
    systemName: 'Tisoler server',
    typeId: 'WINDOWS_SERVER',
    type: 'Windows server',
    hddCapacity: 500,
  },
  {
    id: 'd2',
    systemName: 'Fredy computer',
    typeId: 'MAC',
    type: 'Mac',
    hddCapacity: 50,
  }
]

// Mocks
jest.mock("../../services", () => ({
  fetchDevices: () => DEVICES,
}));

test('DeviceList render', async () => {
  render(<DeviceList />);
  await waitFor(() => screen.findByText('Tisoler server'));

  expect(screen.getByPlaceholderText('Device Type')).toBeInTheDocument();
  expect(screen.getByLabelText('Sort by')).toBeInTheDocument();
  const addDeviceButton = screen.getByTestId('addDeviceButton')
  expect(addDeviceButton).toBeInTheDocument();
  
  expect(screen.getByText('Tisoler server')).toBeInTheDocument();
  expect(screen.getByText('Windows server')).toBeInTheDocument();
  expect(screen.getByText('500 GB')).toBeInTheDocument();

  expect(screen.getByText('Fredy computer')).toBeInTheDocument();
  expect(screen.getByText('Mac')).toBeInTheDocument();
  expect(screen.getByText('50 GB')).toBeInTheDocument();
});


test('DeviceList filter - No elements for "Windows Workstation" type', async () => {
  render(<DeviceList />);
  await waitFor(() => screen.findByText('Tisoler server'));

  const filterInput = screen.getByPlaceholderText('Device Type');
  expect(filterInput).toBeInTheDocument();
  
  expect(screen.getByText('Tisoler server')).toBeInTheDocument();
  expect(screen.getByText('Windows server')).toBeInTheDocument();
  expect(screen.getByText('500 GB')).toBeInTheDocument();

  expect(screen.getByText('Fredy computer')).toBeInTheDocument();
  expect(screen.getByText('Mac')).toBeInTheDocument();
  expect(screen.getByText('50 GB')).toBeInTheDocument();

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    // Click filter input
    fireEvent.click(filterInput);
    await userEvent.type(filterInput, 'Windows Workstation');
  });

  const filterOption = screen.getByText('Windows Workstation');
  expect(filterOption).toBeInTheDocument();

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    // Click 'Windows Workstation' option
    fireEvent.click(filterOption);
  });

  expect(screen.queryByText('Tisoler server')).not.toBeInTheDocument();
  expect(screen.queryByText('Fredy computer')).not.toBeInTheDocument();
});
