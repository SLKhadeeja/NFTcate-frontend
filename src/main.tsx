import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F28C28',
        },
      }}
    >
      <StyleProvider layer>
        <Router>
          <ToastContainer
            icon={false}
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <App />
        </Router>
      </StyleProvider>
    </ConfigProvider>
  </StrictMode>,
)
