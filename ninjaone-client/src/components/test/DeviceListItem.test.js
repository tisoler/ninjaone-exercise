import { render, screen, act, fireEvent } from '@testing-library/react';
import DeviceListItem from '../DeviceListItem';

const DEVICE = {
	id: 'd1',
	systemName: 'Tisoler server',
	typeId: 'WINDOWS_SERVER',
	type: 'Windows server',
	hddCapacity: 500,
}

// Mocks
const mockCallBackFunction = jest.fn();

test('DeviceList item render', async () => {
  render(<DeviceListItem device={DEVICE} actionCallBackFunction={mockCallBackFunction} />);
  
	expect(screen.getByAltText('Device type icon')).toBeInTheDocument();
  expect(screen.getByText('Tisoler server')).toBeInTheDocument();
  expect(screen.getByText('Windows server')).toBeInTheDocument();
  expect(screen.getByText('500 GB')).toBeInTheDocument();
	expect(screen.getByTestId('updateButton')).toBeInTheDocument();
	expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
});

test('DeviceList - click update', async () => {
  render(<DeviceListItem device={DEVICE} actionCallBackFunction={mockCallBackFunction} />);
  
	const updateButton = screen.getByTestId('updateButton');
	// eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    // Click update button
    fireEvent.click(updateButton);
  });

	expect(screen.getByText('Edit device Tisoler server')).toBeInTheDocument();
});

test('DeviceList - click delete', async () => {
  render(<DeviceListItem device={DEVICE} actionCallBackFunction={mockCallBackFunction} />);
  
	const deleteButton = screen.getByTestId('deleteButton');
	// eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    // Click delete button
    fireEvent.click(deleteButton);
  });

	expect(screen.getByText('Delete device')).toBeInTheDocument();
  expect(screen.getByText('Are you sure sure you want to delete the device Tisoler server?')).toBeInTheDocument();
});
