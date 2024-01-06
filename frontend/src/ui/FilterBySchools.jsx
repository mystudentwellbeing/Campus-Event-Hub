import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterBySchools = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilters = searchParams.get('filters')?.split(',') || [];
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newFilters = typeof value === 'string' ? value.split(',') : value;
    setFilters(newFilters);

    setTimeout(() => {
      if (newFilters.length > 0) {
        searchParams.set('schoolFilters', newFilters.join(','));
      } else {
        searchParams.delete('schoolFilters');
      }
      setSearchParams(searchParams, { replace: true });
    }, 0);
  };

  return (
    <FormControl fullWidth size="small" sx={{ width: '300px' }}>
      <InputLabel id="filter-by-school">Filter By School</InputLabel>
      <Select
        id="filter-by-schools-select"
        multiple
        value={filters}
        onChange={handleChange}
        displayEmpty
        MenuProps={MenuProps}
        renderValue={(selected) => selected.join(', ')}
        label="Filter By School"
        inputProps={{ 'aria-label': 'Filter By School' }}
      >
        {options.map((school) => (
          <MenuItem key={school.value} value={school.value}>
            <Checkbox checked={filters.includes(school.value)} />
            <ListItemText primary={school.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBySchools;
