// frontend/src/components/common/CheckoutSteps.jsx
import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const steps = ['ورود', 'آدرس ارسال', 'روش پرداخت', 'ثبت سفارش'];

const CheckoutSteps = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default CheckoutSteps;