import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField, DataGrid } from '@mui/material';


export const FinancialsChart = (props) => {
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
          title="Top 10 ASO Employer Groups"
        />
        <CardContent>
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="1."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="6."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="2."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="7."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="3."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="8."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="4."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="9."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="5."
             variant="outlined"
             style={{ width: 500 }}
          />
          <TextField
             id="filled-multiline-static"
             multiline
             rows={1}
             defaultValue="10."
             variant="outlined"
             style={{ width: 500 }}
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