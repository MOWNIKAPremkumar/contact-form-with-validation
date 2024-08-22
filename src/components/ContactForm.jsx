import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './ContactForm.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().matches(
    /^\+?\d{10,14}$/,
    'Phone number is not valid'
  ),
  message: Yup.string().required('Message is required'),
  agreeToTerms: Yup.bool().oneOf([true], 'You must agree to the terms'),
});

const ContactForm = () => {
  const { control, handleSubmit, formState:{ errors },reset} = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    reset({
        name: '',
        email: '',
        phone: '',
        message: '',
        agreeToTerms: false,
      });

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label>Name</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input type="email" {...field} />}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Phone (Optional)</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <input type="tel" {...field} />}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>      
      <div>
        <label>Message</label>
        <Controller
          name="message"
          control={control}
          render={({ field }) => <textarea {...field} />}
        />
        {errors.message && <p>{errors.message.message}</p>}
      </div>
      <div>
        <label>
          <Controller
            name="agreeToTerms"
            control={control}
            render={({ field }) => <input type="checkbox" {...field} />}
          />
          I agree to the terms and conditions
        </label>
        {errors.agreeToTerms && <p>{errors.agreeToTerms.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
