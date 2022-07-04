import { DEVICE_TYPE_DICT } from '../constants';
import { getDeviceType } from '../utils';

test('getDeviceType when type is blank', () => {
  const type = getDeviceType('')
  expect(type).toBe('')
});

test('getDeviceType when type is valid', () => {
  const type = getDeviceType('windows_server')
  expect(type).toBe(DEVICE_TYPE_DICT.WINDOWS_SERVER)
});

test('getDeviceType when type is not valid', () => {
  const type = getDeviceType('windows_10')
  expect(type).toBe(undefined)
});
