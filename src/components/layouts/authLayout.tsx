import { ReactNode } from 'react';
import Hero from '../../assets/login-image.jpg';

const AuthLayout = ({ children }: { children: ReactNode; }) => {
  return (
    <div className="grid lg:grid-cols-2 overflow-hidden">
      <img className="hidden lg:block h-full" src={Hero} alt="image of a girl looking up smiling sitting on the grass with a laptop and books" />
      <div className="flex items-center justify-center h-screen overflow-y-auto">
        <a href="/" className="absolute bg-primary md:bg-transparent rounded z-10 top-5 md:top-10 right-5 md:right-10 px-3 text-white md:text-primary">Go Home</a>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout