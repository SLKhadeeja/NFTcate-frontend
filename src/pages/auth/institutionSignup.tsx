import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import { getSignupRoute } from "../../helpers/routesHelper";
import * as Yup from "yup";
import { Button, Input, Select } from "antd";
import { Field, Form, Formik } from "formik";
import AuthLayout from "../../components/layouts/authLayout";
import { useState } from "react";
import DomainSelect from "../../components/domainSelect";
import FieldContainer from "../../components/FieldContainer";
import TextArea from "antd/es/input/TextArea";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  institutionId: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  contact: Yup.string().required("Required"),
  website: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

interface FormValues {
  email: string;
  institutionId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contact: string;
  website: string;
  type: string;
  password: string;
}

const InstitutionSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const domain = queryParams.get('d') as string;

  const initialValues = {
    email: "",
    institutionId: "",
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    contact: "",
    website: "",
    type: "",
    password: "",
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await axiosInstance.post(getSignupRoute(domain), values);
      localStorage.setItem(`nftcate-${domain}`, response.data)
      navigate('/login');
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
    <div className="w-[90%] md:w-[60%] lg:w-3/4 xl:w-1/2 max-h-[80%] flex gap-4 bg-white shadow-xl rounded-xl">
      <div className="w-full p-3 no-scrollbar overflow-y-auto">
        <h1 className="my-3 w-full text-2xl font-medium">Institution Signup</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleChange, handleBlur, setFieldValue }) => (
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

            <FieldContainer id="institutionId" label="Institution Id">
              <Field
                as={Input}
                id="institutionId"
                name="institutionId"
                placeholder="Enter institution id"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.institutionId && touched.institutionId ? "border-red-500" : ""
                }`}
              />
              {errors.institutionId && touched.institutionId && (
                <div className="text-red-500 text-sm">{errors.institutionId}</div>
              )}
            </FieldContainer>

            <FieldContainer id="name" label="Institution name">
              <Field
                as={Input}
                id="name"
                name="name"
                placeholder="Enter instituiton name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.name && touched.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
            </FieldContainer>

            <FieldContainer id="country" label="Country">
              <Select
                showSearch
                placeholder="Select country"
                optionFilterProp="label"
                size="large"
                className="w-full"
                status={errors.country && touched.country ? "error" : ''}
                onChange={(value: string) => setFieldValue("country", value)}
                options={[
                  {
                    value: 'nigeria',
                    label: 'Nigeria',
                  },
                ]}
              />
              {errors.country && touched.country && (
                <div className="text-red-500 text-sm">{errors.country}</div>
              )}
            </FieldContainer>

            <FieldContainer id="state" label="State">
              <Select
                showSearch
                placeholder="Select state"
                optionFilterProp="label"
                size="large"
                className="w-full"
                status={errors.state && touched.state ? "error" : ''}
                onChange={(value: string) => setFieldValue("state", value)}
                options={[
                  {
                    value: 'abuja',
                    label: 'FCT',
                  },
                ]}
              />
              {errors.state && touched.state && (
                <div className="text-red-500 text-sm">{errors.state}</div>
              )}
            </FieldContainer>

            <FieldContainer id="city" label="LGA">
              <Select
                showSearch
                placeholder="Select lga"
                optionFilterProp="label"
                size="large"
                className="w-full"
                status={errors.city && touched.city ? "error" : ''}
                onChange={(value: string) => setFieldValue("state", value)}
                options={[
                  {
                    value: 'wuse',
                    label: 'Wuse',
                  },
                ]}
              />
              {errors.city && touched.city && (
                <div className="text-red-500 text-sm">{errors.city}</div>
              )}
            </FieldContainer>

            <FieldContainer id="address" label="Address">
              <TextArea
                id="address"
                name="address"
                rows={4}
                placeholder="Enter your address"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.address && touched.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && touched.address && (
                <div className="text-red-500 text-sm">{errors.address}</div>
              )}
            </FieldContainer>

            <FieldContainer id="contact" label="Contact phone number">
              <Field
                as={Input}
                id="contact"
                name="contact"
                placeholder="Enter institution contact phone"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.contact && touched.contact ? "border-red-500" : ""
                }`}
              />
              {errors.contact && touched.contact && (
                <div className="text-red-500 text-sm">{errors.contact}</div>
              )}
            </FieldContainer>

            <FieldContainer id="website" label="Institution">
              <Field
                as={Input}
                id="website"
                name="website"
                placeholder="Enter institution website"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.website && touched.website ? "border-red-500" : ""
                }`}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </FieldContainer>

            <FieldContainer id="type" label="Instituiton type">
              <Select
                showSearch
                placeholder="Select institution type"
                optionFilterProp="label"
                size="large"
                className="w-full"
                status={errors.type && touched.type ? "error" : ''}
                onChange={(value: string) => setFieldValue("type", value)}
                options={[
                  {
                    value: 'university',
                    label: 'University',
                  },
                  {
                    value: 'college',
                    label: 'College of Education',
                  },
                  {
                    value: 'technical',
                    label: 'Technical school',
                  }
                ]}
              />
              {errors.type && touched.type && (
                <div className="text-red-500 text-sm">{errors.type}</div>
              )}
            </FieldContainer>

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

            <Button type="primary" htmlType="submit" className="p-5">Register</Button>
          </Form>
          )} 
        </Formik>
        <p className="text-center my-4">I already have an account. <span className="cursor-pointer text-primary" onClick={showModal}>Login</span></p>
        <DomainSelect
          open={isModalOpen}
          onCancel={handleCancelModal}
          onInstitution={() => navigate('/login?d=instituiton')}
          onStudent={() => navigate('/login?d=student')}
        />
      </div>
    </div>
   </AuthLayout>
  )
}

export default InstitutionSignup