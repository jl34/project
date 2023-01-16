import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '/Users/Jennifer/Visual Studio/project/src/icons/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'Provider',
    headerName: 'Provider',
    width: 300,
    editable: true,
  },
  {
    field: 'Region',
    headerName: 'Region',
    width: 150,
    editable: true,
  },
  {
    field: 'Effectivedate',
    headerName: 'Effective date',
    type: 'date',
    width: 200,
    editable: true,
  },
];

const rows = [
  { id: 1, Region: 'SoCal', Provider: 'Cedars-Sinai', Effectivedate: '1/1/23' },
  { id: 2, Region: 'NorCal', Provider: 'Stanford University', Effectivedate: '1/1/23' },
  { id: 3, Region: 'NorCal', Provider: 'John Muir Medical Center', Effectivedate: '6/1/23' },
  { id: 4, Region: 'SoCal', Provider: 'Scripps', Effectivedate: '1/1/22' },
  { id: 5, Region: 'SoCal', Provider: 'Sharp', Effectivedate: '1/1/19' },
  { id: 6, Region: 'SoCal', Provider: 'Providence Health', Effectivedate: '1/1/19' },
  { id: 7, Region: 'SoCal', Provider: 'CHOC', Effectivedate: '1/1/22' },
  { id: 8, Region: 'SoCal', Provider: 'CHLA', Effectivedate: '1/1/23' },
];

export default function LatestTasks() {
  return (
    <Box 
    sx={{ 
      height: 450, 
      width: '50%', 
      bgcolor: 'background.paper', 
      boxShadow: 1, 
      borderRadius: 2, 
      p: 3, 
      pt: 1}}>
      <Typography
        color="textSecondary"
        gutterBottom 
        variant="overline" >
            Open Negotiations
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

