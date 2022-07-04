import { DEVICE_TYPE_DICT } from "./constants";

export const getDeviceType = (type: string): string => {
  if (!type) return '';
  const deviceType = DEVICE_TYPE_DICT[type.toUpperCase() as keyof typeof DEVICE_TYPE_DICT]
  return deviceType;
}
