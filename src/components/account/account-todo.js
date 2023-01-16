import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export function Todo1() {
  return (
    <Box 
    sx={{ height: 400, width: '22%', bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2, p: 2, pt: 2}}>
    <FormGroup>
        <Typography
          color="textSecondary" 
          gutterBottom variant="overline" >
           <div style={{padding: 3}}></div>
            REMINDERS
        </Typography>
      <FormControlLabel control={<Checkbox defaultChecked />} 
      label="Complete UC System NSP" />
      <FormControlLabel control={<Checkbox />} 
      label="Sign contracts" />
      <FormControlLabel control={<Checkbox />} 
      label="Send update to project manager" />
      <FormControlLabel control={<Checkbox />} 
      label="Close out completed negotiations" />
      <FormControlLabel control={<Checkbox />} 
      label="Send update to project manager" />
      <FormControlLabel control={<Checkbox />} 
      label="Create presentation" />
      <FormControlLabel control={<Checkbox />} 
      label="Review Buydowns" />
      <div style={{padding: 6}}></div>
    </FormGroup>
    </Box>
  );
}
