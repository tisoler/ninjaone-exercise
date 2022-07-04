
import { DEVICE_API_URL, COLORS } from '../global/constants';
import { Device } from '../global/types';
import { getDeviceType } from '../global/utils';

export const fetchDevices = async (): Promise<Device[]> => {
  let deviceList: Device[] = []
  try {
    const response = await fetch(DEVICE_API_URL, {
      method: "GET",
    });
    const data = await response.json();
    deviceList = data.map((device: any) => ({
      id: device.id,
      systemName: device.system_name,
      typeId: device?.type.toUpperCase(),
      type: getDeviceType(device?.type),
      hddCapacity: isNaN(device.hdd_capacity) ? 0 : parseInt(device.hdd_capacity)
    }));

  } catch(e) {
    console.log(`ERROR: ${e}`)
  }
  return deviceList;
}

export const deleteDevice = async (deviceId: string): Promise<boolean> => {
  if (!deviceId) return false;

  const response = await fetch(`${DEVICE_API_URL}/${deviceId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data === 1;
}

export const updateDevice = async (device: Device): Promise<boolean> => {
  if (!device?.id) return false;
  const payload = {
    system_name: device.systemName,
    type: device.typeId,
    hdd_capacity: device.hddCapacity,
  }
  const response = await fetch(`${DEVICE_API_URL}/${device.id}`, {
    method: "PUT",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  return data === 1;
}

export const addDevice = async (device: Device): Promise<boolean> => {
  if (!device) return false;
  const payload = {
    system_name: device.systemName,
    type: device.typeId,
    hdd_capacity: device.hddCapacity,
  }

  const response = await fetch(`${DEVICE_API_URL}`, {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  return 'id' in data;
}
