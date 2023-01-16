import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField, DataGrid } from '@mui/material';


export const SettingsFinancials = (props) => {
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
          subheader="Update spend and additional financial position details"
          title="Financial Status"
        />
        <Divider />
        <CardContent>
          <TextField
             id="filled-multiline-static"
             label="Enter text"
             multiline
             rows={8}
             defaultValue="Type to enter content"
             variant="filled"
             style={{ width: 1100 }}
          />
        </CardContent>
        <Divider />
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