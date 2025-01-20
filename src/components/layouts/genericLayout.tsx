import { Avatar, Button, Popover } from 'antd'
import { FunctionComponent, ReactNode } from 'react'
import { useLayoutContext } from '../../contexts/layout.context';
import { Link } from 'react-router-dom';
import { University, UserRound } from 'lucide-react';

interface Props {
  children: ReactNode;
  noFooter?: boolean;
};

const GenericLayout: FunctionComponent<Props> = ({ children, noFooter }) => {
  const { setIsSigninModalOpen, setIsSignupModalOpen, isLoggedIn, user, logout } = useLayoutContext();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="w-full bg-white px-6 py-4 flex justify-between items-center shadow">
        <Link to="/">
          <h1 className="text-2xl font-bold text-primary">NFTcate</h1>
        </Link>
        {isLoggedIn ? 
          <Popover
            content={
              <div className='w-20 grid gap-y-5'>
                <Link to="/profile" className='text-gray-700 hover:text-primary'>Profile</Link>
                <p className='cursor-pointer text-gray-700 hover:text-primary' onClick={logout}>logout</p>
              </div>
            }
            title={null}
            trigger="click"
          >
            <Avatar className='text-primary bg-primary/30 w-10 h-10 cursor-pointer'>
              {
                user?.userType === 'student'
                ? <UserRound />
                : <University />
              }
            </Avatar>
          </Popover>
          : <div className="space-x-4">
            <Button onClick={() => setIsSigninModalOpen(true)} type="default" className="tbg-white border-primary">
              Login
            </Button>
            <Button onClick={() => setIsSignupModalOpen(true)} type="primary">
              Signup
            </Button>
          </div>
        }
      </header>

      {children}

      {!noFooter && 
        <footer className="bg-gray-800 text-white p-4 w-full text-center mt-12">
          <p>© 2025 NFTcate. All Rights Reserved.</p>
        </footer>
      }
    </div>
  )
}

export default GenericLayout