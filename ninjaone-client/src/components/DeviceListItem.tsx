
import { useState } from "react";

import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import styled from "styled-components/macro";
import { macLogo, microsoftLogo } from '../assets';
import { COLORS, WINDOWS_ID, MAC_ID } from '../global/constants';
import { Device } from '../global/types'
import RemoveIcon from "../assets/iconJsx/remove";
import UpdateIcon from "../assets/iconJsx/update";
import DeleteDialog from "./Dialog/DeleteDialog";
import AddEditDialog from "./Dialog/AddEditDialog";

type Props = {
  device: Device,
  actionCallBackFunction: () => void;
}

const DeviceListItem = (props: Props) => {
  const { device, actionCallBackFunction } = props;

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const type = device?.typeId || ''
  const avatarSrc = type.includes(MAC_ID)
    ? macLogo
    : type.includes(WINDOWS_ID)
      ? microsoftLogo
      : ''

  const handleRemoveDevice = () => {
    setOpenDeleteDialog(true);
  }

  const handleCloseDeleteDIalog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditDevice = () => {
    setOpenEditDialog(true);
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <>
      <StyledListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar title="Device type icon" alt="Device type icon" src={avatarSrc} />
        </ListItemAvatar>
        <ListItemText
          primary={device.systemName}
          secondary={
            <span style={{ color: COLORS.white }}>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color={COLORS.white}
              >
                {device.type}
              </Typography>
              <br />
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color={COLORS.white}
              >
                {`${device.hddCapacity} GB`}
              </Typography>
            </span>
          }
        />
        <ActionsContainer>
          <IconContainer onClick={handleEditDevice} title="Update device" data-testid="updateButton"><UpdateIcon /></IconContainer>
          <IconContainer onClick={handleRemoveDevice} title="Delete device" data-testid="deleteButton"><RemoveIcon /></IconContainer>
        </ActionsContainer>
      </StyledListItem>
      <StyledDivider variant="inset" />
      {openDeleteDialog && (
        <DeleteDialog
          onClose={handleCloseDeleteDIalog}
          device={device}
          callBackFunction={actionCallBackFunction}
        />
      )}
      {openEditDialog &&
        <AddEditDialog
          onClose={handleCloseEditDialog}
          selectedDevice={device}
          callBackFunction={actionCallBackFunction}
        />
      }
    </>
  )
}

const StyledListItem = styled(ListItem)`
  padding-top: 2px !important;
  padding-bottom: 2px !important;
`

const StyledDivider = styled(Divider)`
  border-color: ${COLORS.gray} !important;
`

const ActionsContainer = styled.div`
  width: 100%;
  max-width: 40px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 5px;
  right: 0;
  padding: 2px;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: ${COLORS.gray};
  }

  &:active {
    background-color: ${COLORS.darkGray};
  }

  & svg {
    width: 25px;
  }
`

export default DeviceListItem;
