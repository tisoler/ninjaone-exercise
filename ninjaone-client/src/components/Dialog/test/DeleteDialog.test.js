import { render, screen, fireEvent, act } from '@testing-library/react';
import DeleteDialog from '../DeleteDialog';
import { deleteDevice } from '../../../services';

const DEVICE_ID = 'test1'
const DEVICE = {
  id: DEVICE_ID,
  systemName: 'Tisoler server',
  typeId: 'WINDOWS_SERVER',
  type: 'Windows server',
  hddCapacity: 500,
}
// Mocks
const mockOnClose = jest.fn();
const mockCallBackFunction = jest.fn();
jest.mock("../../../services", () => ({
  deleteDevice: jest.fn()
}));


test('Shows DeleteDialog and trigger the close function', async () => {
  render(<DeleteDialog device={DEVICE} onClose={mockOnClose} />);

  expect(screen.getByText('Delete device')).toBeInTheDocument();
  expect(screen.getByText('Are you sure sure you want to delete the device Tisoler server?')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();

  const cancelButton = screen.getByText('Cancel');
  // Click delete button
  fireEvent.click(cancelButton);

  expect(mockOnClose).toBeCalled();
});

test('Shows DeleteDialog and trigger the confirm function', async () => {
  render(<DeleteDialog device={DEVICE} onClose={mockOnClose} callBackFunction={mockCallBackFunction} />);

  expect(screen.getByText('Delete device')).toBeInTheDocument();
  expect(screen.getByText('Are you sure sure you want to delete the device Tisoler server?')).toBeInTheDocument();
  expect(screen.getByText('Ok')).toBeInTheDocument();

  const okButton = screen.getByText('Ok');

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    // Click ok button
    fireEvent.click(okButton);
  });
  await new Promise((r) => setTimeout(r, 2050)); // Close occurs after 2 sec

  expect(deleteDevice).toBeCalledWith(DEVICE_ID);
  expect(mockCallBackFunction).toBeCalled();
  expect(mockOnClose).toBeCalledWith();
});
