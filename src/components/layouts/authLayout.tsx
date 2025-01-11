import { ReactNode } from 'react';
import Hero from '../../assets/login-image.jpg';

const AuthLayout = ({ children }: { children: ReactNode; }) => {
  return (
    <div className="grid grid-cols-2 overflow-hidden">
      <img className="hidden lg:block h-full" src={Hero} alt="image of a girl looking up smiling sitting on the grass with a laptop and books" />
      <div className="flex items-center justify-center h-screen overflow-y-auto">
        <a href="/" className="absolute top-10 right-10 text-primary">Go Home</a>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout