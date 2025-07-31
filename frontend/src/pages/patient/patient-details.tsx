import PatientForm from '@/components/forms/patient-form';
import { Header } from '@/components/layouts/header';
import { useAuth } from '@/context/auth-context';
import type { PatientType } from '@/types/PatientType';
import { useEffect, useState } from 'react';

const PatientDetails = () => {
  const { user, patient } = useAuth();
  const [patientData, setPatientData] = useState<PatientType | null>(null);

  useEffect(() => {
    setPatientData(patient);
  }, [user, patient]);

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="space-y-2 mt-2">
          <h1 className="text-3xl font-bold">Patient details</h1>
          <p className="text-muted-foreground">
            Manage your presonal information for doctors{' '}
          </p>
        </div>

        <PatientForm {...patientData} />
      </div>
    </>
  );
};

export default PatientDetails;
