import Head from "next/head";
import { Box, Container, Typography, Button } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { SettingsNotifications } from "../components/settings/settings-notifications";
import { SettingsPassword } from "../components/settings/settings-password";
import { SettingsNotifications2 } from "../components/settings/settings-notifications";
import { SettingsFinancials } from "../components/settings/settings-financials";
import { SettingsMembership } from "../components/settings/settings-Membership";
import { FinalDealPoints } from "../components/settings/settings-FinalDealPoints";
import { ReviewApproval } from "../components/settings/settings-reviewapproval";
import { FinancialsChart } from "../components/settings/financials-table";
import { SettingsDatagrid } from "../components/settings/settings-datagrid";
import { SettingsTop } from "../components/settings/settings-top";

const Settings = () => (
  <>
    <Head>
      <title>Network Strategic Planner</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Create a new Network Strategic Planner
        </Typography>
        <a href="nsp pdf.pdf" target="_blank" rel="noopener no referrer">
          <Button
            color="primary"
            variant="standard"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
            }}
          >
            Export
          </Button>
        </a>
        <SettingsTop />
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 1 }} variant="h4"></Typography>
        <SettingsNotifications2 />
        <Box sx={{ pt: 3 }}>
          <SettingsFinancials />
          <SettingsDatagrid />
          <FinancialsChart />
        </Box>
      </Container>
    </Box>
    <Container maxWidth="lg">
      <Typography sx={{ mb: 1 }} variant="h4"></Typography>
      <Box sx={{ pt: 0.1 }}>
        <SettingsMembership />
      </Box>
    </Container>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <FinalDealPoints />
        <Box sx={{ pt: 1 }}>
          <ReviewApproval />
        </Box>
      </Container>
    </Box>
  </>
);
Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
