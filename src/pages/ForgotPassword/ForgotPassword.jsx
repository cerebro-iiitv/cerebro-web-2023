/* eslint-disable */
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import AuthForm from '../../components/AuthForm/AuthForm';
import FormInput from '../../components/FormInput/FormInput';
import AuthBtn from '../../components/AuthBtn/AuthBtn';
import axiosInstance from '../../services/AxiosInstance';
import { forgotPasswordFormData, initialValues, validate } from './util/ForgotPasswordFormData';
import './ForgotPassword.scss';

function ForgotPassword() {
  const [submitStatus, setSubmitStatus] = useState('');

  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await axiosInstance.post('/account/request-reset-password/', values);
      if (res.data.success) setSubmitStatus(res.data.success);
      else setFieldError('authentication', res.data.status);
    } catch (error) {
      setFieldError('authentication', 'Invalid email address');
    }
    setSubmitting(false);
  };

  return (
    <AuthForm title="Forgot Password" to="/signup" text="Don't have an account?" link="Sign Up">
      <Formik {...{ validate, initialValues, onSubmit }}>
        {({ isSubmitting, errors }) => (
          <Form className="forgot-password">
            {forgotPasswordFormData.map(({ label, name, type }) => (
              <FormInput
                {...{ label, name, type }}
                key={name}
                page="forgot-pass"
                disabled={submitStatus}
              />
            ))}
            <AuthBtn
              {...{ errors, submitStatus, isSubmitting }}
              btnText="Mail Me"
              successMessage="Check your email for a link to reset your password"
            />
          </Form>
        )}
      </Formik>
    </AuthForm>
  );
}

export default ForgotPassword;
