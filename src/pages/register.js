import Head from 'next/head';
//import Head from '/Users/Jennifer/Visual Studio/project/src/icons/next';
import { Box, Container, Grid, Typography, Card, Icon, Menu, MenutItem } from '@mui/material';
import { AccountDash } from '../components/account/account-dashboard';
import { AccountDash2 } from '../components/account/account-dashboard2';
import { AccountDash3 } from '../components/account/account-dashboard3';
import { Todo1 } from '../components/account/account-todo';
import { DashboardLayout } from '../components/dashboard-layout';
import AccountProgress from '../components/account/account-progress';
import LatestTasks from '../components/account/account-mytasks'; 
import BasicTable from '../components/account/account-projects'; 


const Dashboard = () => (

  <>
    <Head>
      <title>
        My Workspace
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container 
      maxWidth={false}>
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          My Workspace
        </Typography>

        <Grid 
        container 
        spacing={2}>
         <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
          <AccountDash />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
          <AccountDash2 />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
          <AccountDash3 />
          </Grid>

          <Grid 
          item 
          lg={6} xl={9}>
          <BasicTable />
            <div style={{padding: 8}}></div>
          </Grid>
            <div style={{padding: 8}}></div>
          <Todo1 />
          <AccountProgress />
           <div style={{padding: 8}}></div>
          <LatestTasks />
           <div style={{padding: 8}}></div>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
