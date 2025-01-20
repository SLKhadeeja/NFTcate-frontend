import { Button, Input } from "antd"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import { getLoginRoute } from "../../helpers/routesHelper";
import AuthLayout from "../../components/layouts/authLayout";
import { useState } from "react";
import DomainSelect from "../../components/domainSelect";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get('d') as string;

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await axiosInstance.post(getLoginRoute(domain), values);
      localStorage.setItem('accessToken', response.data.token);
      navigate(`/${domain}`);
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <AuthLayout>
      <div className="w-[90%] md:w-[60%] lg:w-3/4 xl:w-1/2 h-1/2 flex gap-4 bg-white md:shadow-xl rounded-xl">
        <div className="w-full p-3 flex flex-col items-center justify-center">
          <h1 className="my-3 w-full text-2xl font-medium capitalize">{domain} Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form className="flex flex-col w-full gap-2">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full border p-3 ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Field
                  as={Input.Password}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full border flex p-3 ${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <Button type="primary" htmlType="submit" className="p-5">Login</Button>
            </Form>
          )} 
          </Formik>
          <a className="ml-auto text-primary mt-3" href="#">Forgot Password?</a>
          <p className="my-3">Don't have an account? <span className="cursor-pointer text-primary" onClick={showModal}>register</span></p>
          <DomainSelect
            open={isModalOpen}
            onCancel={handleCancelModal}
            onInstitution={() => navigate('/institution/signup')}
            onStudent={() => navigate('/student/signup')}
          />
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login;