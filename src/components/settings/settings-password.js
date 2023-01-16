import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';


export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }; 
  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Update current state of relationship with UHC, geographic area, shared goals, etc."
          title="General Overview"
        />
        <Divider />
        <CardContent>
          <TextField
             id="filled-multiline-static"
             label="Enter text"
             multiline
             rows={15}
             defaultValue="Type to enter content"
             variant="filled"
             style={{ width: 1100 }}
          />
        </CardContent>
        <Divider />
        <CardHeader
          subheader="Update contract summary points"
          title="Contract Summary"
        />
        <Divider />
        <CardContent>
          <TextField
             id="filled-multiline-static"
             label="Enter text"
             multiline
             rows={15}
             defaultValue="Type to enter content"
             variant="filled"
             style={{ width: 1100 }}
          />
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );

  
};