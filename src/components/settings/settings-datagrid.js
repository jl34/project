import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { fontWeight } from '@mui/system';

const orders = [
  {
    id: uuid(),
    ref: 'ASO'
  },
  {
    id: uuid(),
    ref: 'Fully Insured'
  },
  {
    id: uuid(),
    ref: 'CO HMO'
  },
  {
    id: uuid(),
    ref: 'Select'
  },
  {
    id: uuid(),
    ref: 'Commercial Total'
  },
  {
    id: uuid(),
    ref: 'Medicare NICE HMO Cap'
  },
  {
    id: uuid(),
    ref: 'Medicare NICE HMO FFS'
  },
  {
    id: uuid(),
    ref: 'Medicare COSMOS FFS (NSPPO)'
  },
  {
    id: uuid(),
    ref: 'Medicare Total'
  }
  
];

export const SettingsDatagrid = (props) => (
  <Card {...props}>
    <CardHeader title="Financials" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Product
              </TableCell>
              <TableCell>
                Spend
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                SOT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.ref}
                </TableCell>
                <TableCell>
                <TextField
                    id="filled-multiline-static"
                    label="Enter number"
                    multiline
                    rows={1}
                    variant="standard"
                    style={{ width: 150 }}
                />
                </TableCell>
                <TableCell>
                <TextField
                    id="filled-multiline-static"
                    label="Enter date"
                    multiline
                    rows={1}
                    variant="standard"
                    style={{ width: 100 }}
                />
                </TableCell>
                <TableCell>
                <TextField
                    id="filled-multiline-static"
                    label="Enter text"
                    multiline
                    rows={1}
                    variant="standard"
                    style={{ width: 100 }}
                />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
    </Box>
  </Card>
);
