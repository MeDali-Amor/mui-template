import { Step, StepLabel, Stepper } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormNavigation from "./FormNavigation";
import { AnimatePresence, motion } from "framer-motion";

const MultiStepForm = ({
    children,
    initialValues,
    onSubmit,
    loading,
    setSign,
}) => {
    const [stepNumber, setStepNumber] = useState(0);
    const [snapshot, setSnapshot] = useState(initialValues);
    const steps = React.Children.toArray(children);
    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;
    const nextStep = (values) => {
        setSnapshot(values);
        // console.log(values);
        setStepNumber(stepNumber + 1);
    };
    const previousStep = (values) => {
        setSnapshot(values);
        // console.log(values);

        setStepNumber(stepNumber - 1);
    };
    const handleSubmit = async (values, actions) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values);
            setSign(window.innerWidth);
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
            <AnimatePresence>
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
                                setSign={setSign}
                                isLastStep={isLastStep}
                                hasPrevious={stepNumber > 0}
                                onBackClick={() => {
                                    previousStep(formik.values);
                                    setSign(-window.innerWidth);
                                }}
                            />
                        </Form>
                    )}
                </Formik>
            </AnimatePresence>
        </div>
    );
};

export default MultiStepForm;

export const FormStep = ({ stepName = "", children, sign }) => {
    return (
        <motion.div
            initial={{ x: -sign }}
            animate={{ x: "0" }}
            exit={{ x: sign }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};
