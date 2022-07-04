
import * as React from 'react';
import { forwardRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { DELETE_CONFIRM_MESSAGE, DELETE_DEVICE_MESSAGE, DELETE_ERROR_MESSAGE, DELETE_TITLE } from '../../global/constants';
import { Device } from '../../global/types';
import { deleteDevice } from '../../services';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  onClose: () => void,
  device: Device | undefined,
  callBackFunction: () => void,
}

const DeleteDialog = (props: Props) => {
  const { onClose, device, callBackFunction } = props;
  const defaultMEssage = `${DELETE_DEVICE_MESSAGE} ${device?.systemName || ''}?`;
  const [message, setMessage] = useState<string>(defaultMEssage);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  if (!device) onClose()

  const handleConfirm = async () => {
    setIsDeleting(true);
    const response = await deleteDevice(device?.id || '');
    setMessage(response ? DELETE_CONFIRM_MESSAGE : DELETE_ERROR_MESSAGE);
    
    setTimeout(() => {
      callBackFunction(); // Reload devices
     }, 2000);
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{DELETE_TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      {!isDeleting && (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Ok</Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default DeleteDialog;
