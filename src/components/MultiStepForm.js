import { Step, StepLabel, Stepper } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormNavigation from "./FormNavigation";

const MultiStepForm = ({ children, initialValues, onSubmit, loading }) => {
    const [stepNumber, setStepNumber] = useState(0);
    const [snapshot, setSnapshot] = useState(initialValues);
    const steps = React.Children.toArray(children);
    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;
    const nextStep = (values) => {
        setSnapshot(values);
        setStepNumber(stepNumber + 1);
    };
    const previousStep = (values) => {
        setSnapshot(values);
        setStepNumber(stepNumber - 1);
    };
    const handleSubmit = async (values, actions) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values);
        }
        if (isLastStep) {
            return onSubmit(values, actions);
        } else {
            actions.setTouched({});
            nextStep(values);
        }
    };
    return (
        <div>
            <Formik
                initialValues={snapshot}
                onSubmit={handleSubmit}
                validationSchema={step.props.validationSchema}
            >
                {(formik) => (
                    <Form>
                        <Stepper activeStep={stepNumber}>
                            {steps.map((currentStep) => {
                                const label = currentStep.props.stepName;
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {step}
                        <FormNavigation
                            loading={loading}
                            isLastStep={isLastStep}
                            hasPrevious={stepNumber > 0}
                            onBackClick={() => previousStep(formik.values)}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MultiStepForm;

export const FormStep = ({ stepName = "", children }) => children;
