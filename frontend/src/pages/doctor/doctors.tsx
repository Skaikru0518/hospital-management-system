import { DoctorCard } from '@/components/home/doctor-card';
import { Header } from '@/components/layouts/header';
import { useAuth } from '@/context/auth-context';
import type { DoctorType } from '@/types/DoctorType';
import { useEffect, useState } from 'react';

function Doctors() {
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const { getDoctors } = useAuth();

  useEffect(() => {
    getDoctors().then(setDoctors);
  }, []);
  useEffect(() => {
    console.log('Doctors updated:', doctors);
  }, [doctors]);
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-col space-y-2 p-4">
          <h1 className="text-3xl font-bold">See our experts</h1>
          <p className="text-muted-foreground">Book appointment</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Doctors;
