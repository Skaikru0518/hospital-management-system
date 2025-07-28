import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">MedCare</h3>
            <p className="text-sm text-muted-foreground">
              Providing exceptional healthcare services with compassion and
              expertise.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/home"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:text-foreground transition-colors"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to={'/'}
                  className="hover:text-foreground transition-colors"
                >
                  General Medicine
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className="hover:text-foreground transition-colors"
                >
                  Cardiology
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className="hover:text-foreground transition-colors"
                >
                  Neurology
                </Link>
              </li>
              <li>
                <Link
                  to={'/'}
                  className="hover:text-foreground transition-colors"
                >
                  Pediatrics
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>123 HealthCare Ave</p>
              <p>MediCity, MC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@medcare.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} MedCare Hospital. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
