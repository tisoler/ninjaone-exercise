
export const COLORS = {
  darkGray: 'rgb(18, 18, 18)',
  white: '#ffffff',
  gray: 'rgba(255, 255, 255, 0.12)',
  lightGray: '#7D7E7F',
  lighterGray: '#DDDDDF',
};

export const MEDIA = {
  mobile: "576px",
  tablet: "768px",
  laptop: "1024px",
  desktopSm: "1200px",
  desktopLg: "1400px",
  maxPageWidth: "1680px",
};

export const GRID_WIDTH = '500px'
export const GRID_WIDTH_MOBILE = '95%'

export const DEVICE_API_URL = process.env.DEVICE_API_URL || 'http://localhost:3000/devices';

const WINDOWS_WORKSTATION_ID = 'WINDOWS_WORKSTATION';
const WINDOWS_WORKSTATION = 'Windows Workstation';
const WINDOWS_SERVER_ID = 'WINDOWS_SERVER';
const WINDOWS_SERVER = 'Windows Server';
export const MAC_ID = 'MAC';
export const MAC = 'Mac';
export const WINDOWS_ID = 'WINDOWS';

export const DEVICE_TYPE_DICT = {
  [WINDOWS_WORKSTATION_ID]: WINDOWS_WORKSTATION,
  [WINDOWS_SERVER_ID]: WINDOWS_SERVER,
  [MAC_ID]: MAC,
};

export const DEVICE_TYPE = [
  { value: WINDOWS_WORKSTATION_ID, label: WINDOWS_WORKSTATION },
  { value: WINDOWS_SERVER_ID, label: WINDOWS_SERVER },
  { value: MAC_ID, label: MAC },
]

export const DEVICE_FIELDS = [
  { value: 'systemName', label: 'System Name' },
  { value: 'type', label: 'Type' },
  { value: 'hddCapacity', label: 'HDD Capacity' },
]

export const ADD_TITLE = 'Add device'
export const ADD_CONFIRM_MESSAGE = 'The device has been added successfully.'
export const ADD_ERROR_MESSAGE = 'There was an error adding the device. Please try again.'
export const EDIT_TITLE = 'Edit device'
export const EDIT_CONFIRM_MESSAGE = 'The device has been updated successfully.'
export const EDIT_ERROR_MESSAGE = 'There was an error updating the device. Please try again.'
export const DELETE_TITLE = 'Delete device'
export const DELETE_DEVICE_MESSAGE = 'Are you sure sure you want to delete the device'
export const DELETE_CONFIRM_MESSAGE = 'The device has been deleted successfully.'
export const DELETE_ERROR_MESSAGE = 'There was an error deleting the device. Please try again.'
