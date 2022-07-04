
import { useEffect, useState, SyntheticEvent } from "react";

import styled from "styled-components/macro";
import { List, CircularProgress, SelectChangeEvent } from '@mui/material';
import { COLORS, GRID_WIDTH, GRID_WIDTH_MOBILE, MEDIA } from '../global/constants';
import { Device } from '../global/types'
import { fetchDevices } from "../services";
import DeviceListItem from "./DeviceListItem";
import Menu from "./Menu";
import AddEditDialog from "./Dialog/AddEditDialog";

const DeviceList = () => {
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<{ value: string, label: string }[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);

  const filterFunc = (selectedTypes: { value: string, label: string }[]) => (device: Device) => !selectedTypes.length || selectedTypes.some(selectedItem => selectedItem.value === device.typeId)

  const sortFunc = (selectedSortBy: string) => (deviceA: Device, deviceB: Device) => {
    let fieldToCompareDeviceA = deviceA[selectedSortBy as keyof Device];
    let fieldToCompareDeviceB = deviceB[selectedSortBy as keyof Device];
    if (typeof fieldToCompareDeviceA === 'string') fieldToCompareDeviceA = fieldToCompareDeviceA?.toString().toLowerCase()
    if (typeof fieldToCompareDeviceB === 'string') fieldToCompareDeviceB = fieldToCompareDeviceB?.toString().toLowerCase()

    if (!fieldToCompareDeviceA || !fieldToCompareDeviceB) return 0; // id field could be null
    if (fieldToCompareDeviceA < fieldToCompareDeviceB) return -1;
    else if (fieldToCompareDeviceA > fieldToCompareDeviceB) return 1;
    return 0;
  }

  const getDevices = async () => {
    const deviceList = await fetchDevices()
    const filteredSortedDeviceList = deviceList.filter(filterFunc(deviceTypes)).sort(sortFunc(sortBy));
    setDevices(deviceList)
    setFilteredDevices(filteredSortedDeviceList)
  }

  useEffect(() => {
    getDevices();
  }, [])

  const handleTypeDeviceChange = (event: SyntheticEvent<Element, Event>, selectedTypes: { value: string, label: string }[]) => {
    if (!selectedTypes) return;
    const filteredItems = devices?.filter(filterFunc(selectedTypes)).sort(sortFunc(sortBy)) || []

    setDeviceTypes(selectedTypes)
    setFilteredDevices(filteredItems)
  }

  const handleSortByChange = (event: SelectChangeEvent) => {
    if (!event?.target?.value) return;
    const selectedSortBy = event.target.value as string;
    const sortedItems = filteredDevices.sort(sortFunc(selectedSortBy))

    setSortBy(selectedSortBy)
    setFilteredDevices(sortedItems)
  }

  const handleAddDevice = () => {
    setOpenAddDialog(true)
  }

  const handleCloseAddDeviceDialog = () => {
    setOpenAddDialog(false);
  };

  const onDeleteItem = (deviceId: string) => {
    setFilteredDevices(prevState => {
      if (!prevState) return []
      return prevState.filter(device => device.id !== deviceId)
    })
  }

  return (
    <Container>
      <SubContainer data-testid='deviceList'>
        <Menu
          deviceTypes={deviceTypes}
          handleTypeDeviceChange={handleTypeDeviceChange}
          sortBy={sortBy}
          handleSortByChange={handleSortByChange}
          onAddDevice={handleAddDevice}
        />
        {openAddDialog &&
          <AddEditDialog
            onClose={handleCloseAddDeviceDialog}
            callBackFunction={getDevices}
          />
        }
        {!devices
          ? <CircularProgress />
          : (
            <>
              <List sx={{ width: '100%', bgcolor: COLORS.darkGray, height: '100%', overflowY: 'auto', }}>
                {filteredDevices.map((device: Device) => (
                  <DeviceListItem key={device.id} device={device} actionCallBackFunction={() => onDeleteItem(device.id || '')} />
                ))}
              </List>
            </>
          )
        }
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem 0;
  color: ${COLORS.white};
  height: calc(100vh - 4rem);
  overflow-y: hidden;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: ${GRID_WIDTH};

  @media (max-width: ${MEDIA.mobile}) {
    max-width: ${GRID_WIDTH_MOBILE};
  }
`

export default DeviceList;
