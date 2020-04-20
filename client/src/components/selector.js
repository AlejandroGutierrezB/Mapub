import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const sizes = [
  {
    value: 'caña',
    label: '0,20L',
  },
  {
    value: 'tercio',
    label: '0,33L',
  },
  {
    value: 'pinta',
    label: '0,5L',
  },
];


export default function MultilineTextFields() {

  const [size, setSize] = React.useState('');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    // <form className={classes.root} noValidate autoComplete="off"> // helpfull for handling everything
        <TextField
          id="outlined-select-size"
          select
          label="Size"
          value={size}
          onChange={handleChange}
          variant="outlined"
          required
          name="size"
        >
          {sizes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
  );
}