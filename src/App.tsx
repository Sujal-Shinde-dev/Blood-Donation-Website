import { useState } from 'react';
import { CategorySelection } from './components/CategorySelection';
import { DonorLogin } from './components/DonorLogin';
import { DonorRegistration } from './components/DonorRegistration';
import { DonorDashboard } from './components/DonorDashboard';
import { HospitalLogin } from './components/HospitalLogin';
import { HospitalRegistration } from './components/HospitalRegistration';
import { HospitalDashboard } from './components/HospitalDashboard';

type ViewType = 'selection' | 'donor-login' | 'donor-register' | 'donor-dashboard' | 'hospital-login' | 'hospital-register' | 'hospital-dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('selection');

  const handleCategorySelect = (category: 'donor' | 'hospital') => {
    if (category === 'donor') {
      setCurrentView('donor-login');
    } else {
      setCurrentView('hospital-login');
    }
  };

  const handleBack = () => {
    setCurrentView('selection');
  };

  const handleDonorLogin = () => {
    setCurrentView('donor-dashboard');
  };

  const handleDonorRegister = () => {
    setCurrentView('donor-register');
  };

  const handleBackToLogin = () => {
    setCurrentView('donor-login');
  };

  const handleDonorRegistrationComplete = () => {
    setCurrentView('donor-dashboard');
  };

  const handleHospitalLogin = () => {
    setCurrentView('hospital-dashboard');
  };

  const handleHospitalRegister = () => {
    setCurrentView('hospital-register');
  };

  const handleBackToHospitalLogin = () => {
    setCurrentView('hospital-login');
  };

  const handleHospitalRegistrationComplete = () => {
    setCurrentView('hospital-dashboard');
  };

  switch (currentView) {
    case 'donor-login':
      return (
        <DonorLogin 
          onBack={handleBack} 
          onLogin={handleDonorLogin}
          onRegister={handleDonorRegister}
        />
      );
    case 'donor-register':
      return (
        <DonorRegistration 
          onBack={handleBackToLogin}
          onRegister={handleDonorRegistrationComplete}
        />
      );
    case 'donor-dashboard':
      return <DonorDashboard onBack={handleBack} />;
    case 'hospital-login':
      return (
        <HospitalLogin 
          onBack={handleBack}
          onLogin={handleHospitalLogin}
          onRegister={handleHospitalRegister}
        />
      );
    case 'hospital-register':
      return (
        <HospitalRegistration 
          onBack={handleBackToHospitalLogin}
          onRegister={handleHospitalRegistrationComplete}
        />
      );
    case 'hospital-dashboard':
      return <HospitalDashboard onBack={handleBack} />;
    default:
      return <CategorySelection onSelectCategory={handleCategorySelect} />;
  }
}