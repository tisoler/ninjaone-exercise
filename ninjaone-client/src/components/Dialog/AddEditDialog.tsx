
import * as React from 'react';
import { forwardRef, useState, useMemo } from 'react';
import styled from 'styled-components/macro';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Slide,
  TextField,
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
  ADD_CONFIRM_MESSAGE,
  ADD_ERROR_MESSAGE,
  ADD_TITLE,
  DEVICE_TYPE,
  DEVICE_TYPE_DICT,
  EDIT_CONFIRM_MESSAGE,
  EDIT_ERROR_MESSAGE,
  EDIT_TITLE,
  MAC,
  MAC_ID
} from '../../global/constants';
import { Device } from '../../global/types';
import { addDevice, updateDevice } from '../../services';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DEFAULT_DEVICE: Device = {
  systemName: '',
  type: MAC,
  typeId: MAC_ID,
  hddCapacity: 0,
}

type Props = {
  onClose: () => void,
  selectedDevice?: Device,
  callBackFunction: () => void,
}

const AddEditDialog = (props: Props) => {
  const { onClose, selectedDevice, callBackFunction } = props;
  const [message, setMessage] = useState<string>('');
  const [device, setDevice] = useState<Device>(selectedDevice ?? DEFAULT_DEVICE);
  const isEdit = useMemo(() => selectedDevice?.hasOwnProperty('id'), [selectedDevice]);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const handleSystemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevice(prevState => ({ ...prevState, ...{systemName: event.target.value} }))
  }

  const handleDeviceTypeChange = (event: SelectChangeEvent) => {
    if (!event?.target?.value) return;
    const key = event?.target?.value as keyof typeof DEVICE_TYPE_DICT;
    const deviceType = DEVICE_TYPE_DICT[key];
    if (!deviceType) return;
    setDevice(prevState => ({ ...prevState, ...{type: deviceType, typeId: key } }))
  }

  const handleHddCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDevice(prevState => ({ ...prevState, ...{hddCapacity: parseInt(event?.target?.value) || 0} }))
  }

  const handleConfirm = async () => {
    setShowErrors(false);
    if (!device?.systemName.trim() || !device.type || !device.hddCapacity) {
      setShowErrors(true);
      return;
    }

    const confirmMessage = isEdit ? EDIT_CONFIRM_MESSAGE : ADD_CONFIRM_MESSAGE;
    const errorMessage = isEdit ? EDIT_ERROR_MESSAGE : ADD_ERROR_MESSAGE;

    const response = isEdit
      ? await updateDevice(device)
      : await addDevice(device)
    setMessage(response ? confirmMessage : errorMessage)
    callBackFunction(); // Reload devices
    
    setTimeout(() => onClose(), 2000);
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{isEdit ? `${EDIT_TITLE} ${device.systemName}` : ADD_TITLE}</DialogTitle>
      <DialogContent>
        { message ? (
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        ) : (
          <CrudContainer>
            <StyledTextField
              value={device.systemName}
              onChange={handleSystemNameChange}
              fullWidth
              label='System Name *'
              error={showErrors && !device?.systemName.trim()}
              helperText={showErrors && !device?.systemName.trim() && "System Name is required."}
            />
            <FormControl fullWidth>
              <InputLabel id='selectTypedId'>Type *</InputLabel>
              <Select
                value={device.typeId}
                onChange={handleDeviceTypeChange}
                className='select'
                label='Type *'
                labelId='selectTypedId'
                error={showErrors && !device.type}
              >
                {DEVICE_TYPE.map((deviceType: { label: string, value: string }) => <MenuItem key={deviceType.value} value={deviceType.value}>{deviceType.label}</MenuItem>)}
              </Select>
            </FormControl>
            <StyledTextField
              value={device.hddCapacity}
              onChange={handleHddCapacityChange}
              fullWidth label='HDD Capacity (GB) *'
              error={showErrors && !device.hddCapacity}
              helperText={showErrors && !device.hddCapacity && "HDD Capacity is required."}
            />
          </CrudContainer>
        )}
      </DialogContent>
      {!message && (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Save</Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

const CrudContainer = styled.div`
  width: 100%;
`

const StyledTextField = styled(TextField)`
  margin: 20px 0 !important;
`

export default AddEditDialog;
