import React, { useState } from 'react';
import Tour from 'reactour';
import { Button, useTheme } from '@mui/material';

import { IStepDescriptor } from '../../../interfaces/step-descriptor.interface';
import { getToolbarSteps } from '../../../utils/stepper.utils';
import StepContent from './StepContent/StepContent';

type ToolbarStepperProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const ToolbarStepper: React.FC<ToolbarStepperProps> = ({ isOpen, handleClose }: ToolbarStepperProps) => {
  const [step, setStep] = useState(0);
  const theme = useTheme();
  const stepDescriptors: IStepDescriptor[] = getToolbarSteps();
  const supportPanelStep = stepDescriptors.length - 1; // Support Panel should be always last
  const viewStep = [1, 2, 3, 4].includes(step); // 1 - schedule, 2 - student, 3 - staff, 4 - logout
  const isOnSupportPanelStep = step === supportPanelStep;
  const style = {
    color: '#000',
    maxWidth: 450,
    marginTop: isOnSupportPanelStep ? 20 : 0,
  };

  const steps = stepDescriptors.map((sd) => {
    return {
      selector: sd.selector,
      content: (
        <StepContent
          title={`${sd.title}`}
          body={`${sd.body}`}
        />
      ),
      style: style,
    };
  });

  return (
    <Tour
      steps={steps}
      isOpen={isOpen}
      showCloseButton={false}
      onRequestClose={handleClose}
      accentColor={theme.palette.primary.main}
      maskSpace={isOnSupportPanelStep || viewStep ? 0 : 16}
      closeWithMask={false}
      getCurrentStep={(currentStep) => setStep(currentStep)}
      startAt={0}
      lastStepNextButton={
        <Button color="primary" variant="contained">
          {"Let's Begin"}
        </Button>
      }
      disableInteraction
    />
  );
};

export default ToolbarStepper;
