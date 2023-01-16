import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Typography,
    TextField
  } from '@mui/material';
  
  export const ReviewApproval = (props) => (
    <form {...props}>
      <Card>
          <Divider />
        <CardHeader
          subheader="Manage the buydown terms"
          title="Buydown and Term Approvals"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={1}
            wrap="wrap"
          >
            <Grid
              item
              md={10}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    defaultChecked
                  />
                )}
                label="Willing to Approve Buydown"
              />
              <TextField
             id="filled-multiline-static"
             label="Enter text"
             multiline
             rows={3}
             defaultValue="Type to enter content"
             variant="filled"
             style={{ width: 1100 }}
          />
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    defaultChecked
                  />
                )}
                label="Unwilling to Approve Buydown"
              />
              <TextField
             id="filled-multiline-static"
             label="Enter text"
             multiline
             rows={3}
             defaultValue="Type to enter content"
             variant="filled"
             style={{ width: 1100 }}
          />
            <Divider />
        <CardHeader
          subheader="Term Tolerance Level"
        />
        <Divider />
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    defaultChecked
                  />
                )}
                label="Unwilling To Send External Regulatory Notifications, Employer And Member Letters And Terminate Contract"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    defaultChecked
                  />
                )}
                label="Willing To Send External Regulatory Notifications, Employer And Member Letters But Not Terminate Contract"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Willing To Send External Regulatory Notifications, Employer And Member Letters And Terminate Contract"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    defaultChecked
                  />
                )}
                label="Supports issuing a term notice as negotiating tactic but will need to evaluate NA’s client-specific disruption and net effective analysis prior to making a go/no go decision on whether to take it to the next level with external notification"
              />
            </Grid>
          </Grid>
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
            Save
          </Button>
        </Box>
      </Card>
      <Card>
        <CardHeader
          subheader="Final termination details"
          title="Termination Comments"
        />
        <Divider />
        <CardContent>
          <TextField
             id="filled-multiline-static"
             label="Enter text"
             multiline
             rows={10}
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
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
  
  