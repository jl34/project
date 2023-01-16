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
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';

const orders = [
  {
    id: uuid(),
    ref: 'NSP1049',
    amount: 30.5,
    customer: {
      name: 'John Smith'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'NSP1048',
    amount: 25.1,
    customer: {
      name: 'Jennifer Luu'
    },
    createdAt: 1555016400000,
    status: 'completed'
  },
  {
    id: uuid(),
    ref: 'NSP1047',
    amount: 10.99,
    customer: {
      name: 'Alex Richardson'
    },
    createdAt: 1554930000000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'NSP1046',
    amount: 96.43,
    customer: {
      name: 'George Washington'
    },
    createdAt: 1554757200000,
    status: 'not started'
  },
  {
    id: uuid(),
    ref: 'NSP1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gilbert'
    },
    createdAt: 1554670800000,
    status: 'completed'
  },
  {
    id: uuid(),
    ref: 'NSP1044',
    amount: 16.76,
    customer: {
      name: 'Adam Eve'
    },
    createdAt: 1554670800000,
    status: 'completed'
  }
];

export const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Latest Negotiations" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                NSP ID
              </TableCell>
              <TableCell>
                Contract Manager
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
                Status
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
                  {order.customer.name}
                </TableCell>
                <TableCell>
                  {format(order.createdAt, 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(order.status === 'completed' && 'success')
                    || (order.status === 'not started' && 'error')
                    || 'warning'}
                  >
                    {order.status}
                  </SeverityPill>
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
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
