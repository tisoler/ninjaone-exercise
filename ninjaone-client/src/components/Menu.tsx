
import { SyntheticEvent } from "react";
import styled from "styled-components/macro";
import {
  FormControl,
  Autocomplete,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  TextField,
} from '@mui/material';
import { COLORS, DEVICE_FIELDS, DEVICE_TYPE } from '../global/constants';
import AddIcon from '../assets/iconJsx/add';

type Props = {
  deviceTypes: { value: string, label: string }[],
  handleTypeDeviceChange: (event: SyntheticEvent<Element, Event>, selectedTypes: { value: string, label: string }[]) => void,
  sortBy: string,
  handleSortByChange: (event: SelectChangeEvent) => void,
  onAddDevice: () => void;
}

const Menu = (props: Props) => {
  const { deviceTypes, handleTypeDeviceChange, sortBy, handleSortByChange, onAddDevice } = props;

  return (
    <Container>
      <Autocomplete
        multiple
        options={DEVICE_TYPE}
        getOptionLabel={(option) => option.label}
        filterSelectedOptions
        onChange={handleTypeDeviceChange}
        value={deviceTypes}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Device Type"
            placeholder="Device Type"
          />
        )}
      />
      <SecondRowContainer>
        <FormControl fullWidth>
          <InputLabel id="sortByLabel">Sort by</InputLabel>
          <Select
            labelId="sortByLabel"
            value={sortBy}
            label="Sort by"
            onChange={handleSortByChange}
            className='select'
          >
            {DEVICE_FIELDS.map((sortByField: { value: string, label: string }) => <MenuItem key={sortByField.value} value={sortByField.value}>{sortByField.label}</MenuItem>)}
          </Select>
        </FormControl>
        <IconContainer onClick={onAddDevice} data-testid='addDeviceButton'><AddIcon /></IconContainer>
      </SecondRowContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 10px;
  padding: 10px 7px;
  width: calc(100% - 14px);
  background-color: ${COLORS.lighterGray};
`

const SecondRowContainer = styled.div`
  display: flex;
  align-items: center;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 10px;

  &:hover {
    background-color: ${COLORS.lightGray};
  }

  &:active {
    background-color: ${COLORS.lighterGray};
  }
`

export default Menu;
