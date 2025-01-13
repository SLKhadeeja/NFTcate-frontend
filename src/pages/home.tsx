import { Button } from "antd";
import DomainSelect from "../components/domainSelect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);

  const handleCancelSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleCancelSigninModal = () => {
    setIsSigninModalOpen(false);
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="w-full text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">NFTcate</h1>
        <div className="space-x-4">
          <Button onClick={() => setIsSigninModalOpen(true)} type="default" className="tbg-white border-primary">
            Login
          </Button>
          <Button onClick={() => setIsSignupModalOpen(true)} type="primary">
            Signup
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero relative w-full h-[60vh] bg-cover bg-center">
        <div className="absolute inset-0 z-[15] flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Revolutionizing Certificate Validation with NFTs
          </h2>
          <p className="text-lg text-center max-w-3xl mb-6">
            NFTcate leverages blockchain and NFTs to ensure tamper-proof, 
            secure, and globally accessible certificate validation. 
            Build trust with immutable records.
          </p>
          <Button
            type="primary"
            size="large"
            className="text-white px-6 py-2"
            onClick={() => setIsSignupModalOpen(true)}
          >
            Get Started
          </Button>
        </div>
        <div className="absolute bg-black/60 inset-0 h-full w-full" />
      </main>

      {/* Features Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto px-4">
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-bold mb-3">Secure Verification</h3>
          <p className="text-gray-600">
            Use NFTs to validate certificates securely without the risk of
            tampering or forgery.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-bold mb-3">Global Accessibility</h3>
          <p className="text-gray-600">
            Validate certificates from anywhere in the world with our
            decentralized platform.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-bold mb-3">User-Friendly</h3>
          <p className="text-gray-600">
            Simple and intuitive interface for issuing and verifying
            certificates.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-md">
          <h3 className="text-xl font-bold mb-3">Immutable Records</h3>
          <p className="text-gray-600">
            Blockchain ensures that certificate records are immutable and
            verifiable.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 w-full text-center mt-12">
        <p>© 2025 NFTcate. All Rights Reserved.</p>
      </footer>

      <DomainSelect
        open={isSignupModalOpen}
        onCancel={handleCancelSignupModal}
        onInstitution={() => navigate('/institution/signup')}
        onStudent={() => navigate('/student/signup')}
      />

      <DomainSelect
        open={isSigninModalOpen}
        onCancel={handleCancelSigninModal}
        onInstitution={() => navigate('/login?d=instituiton')}
        onStudent={() => navigate('/login?d=student')}
      />
    </div>
  );
};

export default Home;
