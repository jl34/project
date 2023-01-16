import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Monthly Review with SoCal team (January)',
    description: `Prepare notes and status reports for each negotiation`,
  },
  {
    label: 'Complete high-spend negotiations',
    description:
      'Execute all high-spend contracts and close out deals',
  },
  {
    label: 'Complete monthly updates',
    description: `December updates`,
  },
  {
    label: 'Manager review updates',
    description: `NSP updates`,
  },
  {
    label: 'All Staff Meeting (Feb 1st)',
    description: `02/01/2023 Prepare quarterly report`,
  },
];

export default function AccountProgress() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box 
    sx={{ 
      height: 450, 
      maxWidth: 390, 
      bgcolor: 'background.paper', 
      boxShadow: 1, 
      borderRadius: 2, 
      p: 3, 
      pt: 1}}>
     <Typography
        color="textSecondary"
        gutterBottom 
        variant="overline" >
            TIMELINE
      </Typography>
      <Stepper activeStep={activeStep} 
      orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography 
                  variant="caption"> 
                  </Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box 
              sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper 
        square elevation={0} 
        sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} 
          sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}