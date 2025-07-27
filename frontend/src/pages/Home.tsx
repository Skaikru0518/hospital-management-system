import React from 'react';
import { doctors } from '@/mockdata/doctors';
import { DoctorCard } from '@/components/home/doctor-card';
import { services } from '@/mockdata/services';
import { ServiceCard } from '@/components/home/service-card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Services section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehesive healthcare solutions designed to meet all your
              medical needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our expert Doctors
              </h2>
              <p className="text-xl text-muted-foreground">
                Meet our teem of experienced medical professionals
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search doctors by specialty"
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
          <div>
            <Button variant={'outline'} size={'lg'} asChild>
              <Link to={'/doctors'}> View all doctors</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
