import { DoctorCard } from '@/components/home/doctor-card';
import { services } from '@/mockdata/services';
import { ServiceCard } from '@/components/home/service-card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import type { DoctorType } from '@/types/DoctorType';

const Home = () => {
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const { getDoctors } = useAuth();

  useEffect(() => {
    getDoctors().then(setDoctors);
  }, []);
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section*/}
      <section className="bg-gradient-to-br from-blue-500 via-white to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Quality Healthcare
                  <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    When you need it
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Connect with experienced medical professionals and receive
                  personalized care tailored to your unique health needs
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/doctors">Find a doctor</Link>
                </Button>
                {isAuthenticated ? (
                  ''
                ) : (
                  <Button className="text-lg px-8" size="lg" variant="outline">
                    Log in to your account
                  </Button>
                )}
              </div>
            </div>
            {/* Kép csak sm-től felfelé látszik */}
            <div className="relative hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl transform rotate-6" />
              <img
                src="/images/bg/hospital.jpg"
                alt="hospital"
                className="relative rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
            <div></div>
          </div>
          <Button variant={'outline'} size={'lg'} asChild className="mt-8">
            <Link to={'/doctors'}> View all doctors</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Reado to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of patients who trust MedCare for their healthcare
            needs. Schedule your appointment today and experience exceptional
            medical care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size={'lg'}
              variant={'secondary'}
              className="text-lg px-8"
              asChild
            >
              <Link to={'/register'}>Get Started</Link>
            </Button>
            <Button
              className="text-lg px-8 text-black"
              asChild
              size={'lg'}
              variant={'outline'}
            >
              <Link to={'/contact'}>Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
