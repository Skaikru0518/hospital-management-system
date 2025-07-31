import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { axiosInstance } from '@/lib/axios';
import { apiPaths } from '@/lib/api-paths';
import { toast } from 'sonner';

const formSchema = z.object({
  insurance_no: z.string(),
  address: z.string(),
  birth: z.string(),
  phone: z.string(),
});

const PatientForm = ({ ...patientData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (patientData && patientData.id) {
      form.reset({
        insurance_no: patientData.insurance_no || '',
        address: patientData.address || '',
        birth: patientData.birth || '',
        phone: patientData.phone || '',
      });
    }
  }, [patientData?.id]);

  const handleSave = async (values: z.infer<typeof formSchema>) => {
    try {
      const userId = patientData?.user.id;
      if (!userId) {
        toast.error('User ID not found');
        return;
      }
      await axiosInstance.patch(
        apiPaths.patient.updatePatientByUserId(userId),
        values,
      );
      console.log(values);
      console.log(userId);
      toast.success('Your data has been updated');
    } catch (error) {
      console.log(error);
      toast.error('Update failed');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3 mt-5">
        <FormField
          control={form.control}
          name="insurance_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your insurance number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="Enter your phone number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-400 hover:cursor-pointer"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default PatientForm;
