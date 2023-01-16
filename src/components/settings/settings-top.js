import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    FormControl,
    Grid,
    TextField,
    Typography,
  } from '@mui/material';

  
  
  export const SettingsTop = (props) => (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Date: 11/30/2022"
          title="Contractor: Jennifer Luu"
          style={{ color:'darkblue'}}
        />
        <Divider />
         <TextField
             id="filled-multiline-static"
             label="Hospital or Group Name"
             multiline
             rows={1}
             variant="standard"
             style={{ width: 500 }}
             sx={{ m: 2 }}
        />
        <TextField
             id="filled-multiline-static"
             label="Effective Date"
             multiline
             rows={1}
             variant="standard"
             style={{ width: 300 }}
             sx={{ m: 2 }}
        />
        <TextField
             id="filled-multiline-static"
             label="Market"
             multiline
             rows={1}
             variant="standard"
             style={{ width: 500 }}
             sx={{ m: 2 }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1
          }}
        >
        </Box>
      </Card>
    </form>
  );
  
  