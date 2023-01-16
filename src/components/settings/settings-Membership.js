import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';


export const SettingsMembership = (props) => {
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
          subheader="Update network adequacy details"
          title="Network Adequacy" />
        <Divider />
        <CardContent>
          <TextField
            id="filled-multiline-static"
            label="Enter text"
            multiline
            rows={7}
            defaultValue="Type to enter content"
            variant="filled"
            style={{ width: 1100 }} />
        </CardContent>
        <Divider />
        <CardHeader
          subheader="Update applicable ancillary contracts information. N/A if not applicable"
          title="Ancillary Contracts" />
        <Divider />
        <CardContent>
          <TextField
            id="filled-multiline-static"
            label="Enter text"
            multiline
            rows={5}
            defaultValue="Type to enter content"
            variant="filled"
            style={{ width: 1100 }} />
        </CardContent>
        <Divider />
        <CardHeader
          subheader="Update membership for all Lines of Businesses"
          title="Membership All LOBs" />
        <Divider />
        <CardContent>
          <TextField
            id="filled-multiline-static"
            label="Enter text"
            multiline
            rows={5}
            defaultValue="Type to enter content"
            variant="filled"
            style={{ width: 1100 }} />
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


}