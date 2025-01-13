import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import * as Yup from "yup";
import { Button, DatePicker, Input, Select } from "antd";
import { Field, Form, Formik } from "formik";
import AuthLayout from "../../components/layouts/authLayout";
import DomainSelect from "../../components/domainSelect";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import FieldContainer from "../../components/fieldContainer";
import { IInstitution } from "../../types/institutions";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  institution: Yup.string().required("Required"),
  studentId: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Required"),
  dob: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phone: Yup.string()
            .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
            .required('Phone number is required'),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

interface FormValues {
  email: string;
  institution: string;
  studentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  password: string;
  gender: string;
  address: string;
  phone: string;
}

const StudentSignup = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [institutions, setInstitutions] = useState();

  const initialValues = {
    email: "",
    institution: "",
    studentId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    password: "",
    gender: "",
    address: "",
    phone: "",
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await axiosInstance.post('/students/register', values);
      toast.success(response.data.message);
      navigate('/login?d=student');
    } catch (error) {
      console.log(error)
    }
  };

  const getInstitutions = async () => {
    try {
      const response = await axiosInstance.get('/institutions');
      setInstitutions(response.data.map((institution: IInstitution) => {
        return (
          {
            label: institution.name,
            value: institution._id
          }
        )
      }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getInstitutions();
  }, []);

  return (
   <AuthLayout>
    <div className="w-[90%] md:w-[60%] lg:w-3/4 xl:w-1/2 max-h-screen md:max-h-[80%] flex gap-4 bg-white md:shadow-xl rounded-xl">
      <div className="w-full p-3 no-scrollbar overflow-y-auto">
        <h1 className="my-3 w-full text-2xl font-medium">Student Signup</h1>
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

            <FieldContainer id="institution" label="Institution">
              <Select
                showSearch
                placeholder="Select your institution"
                optionFilterProp="label"
                className="w-full"
                size="large"
                onChange={(value: string) => setFieldValue("institution", value)}
                options={institutions}
              />
            </FieldContainer>

            <FieldContainer id="studentId" label="Student Id">
              <Field
                as={Input}
                id="studentId"
                name="studentId"
                placeholder="Enter your student id"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.studentId && touched.studentId ? "border-red-500" : ""
                }`}
              />
              {errors.studentId && touched.studentId && (
                <div className="text-red-500 text-sm">{errors.studentId}</div>
              )}
            </FieldContainer>

            <FieldContainer id="firstName" label="First Name">
              <Field
                as={Input}
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.firstName && touched.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && touched.firstName && (
                <div className="text-red-500 text-sm">{errors.firstName}</div>
              )}
            </FieldContainer>

            <FieldContainer id="middleName" label="Middle Name">
              <Field
                as={Input}
                id="middleName"
                name="middleName"
                placeholder="Enter your middle name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.middleName && touched.middleName ? "border-red-500" : ""
                }`}
              />
              {errors.middleName && touched.middleName && (
                <div className="text-red-500 text-sm">{errors.middleName}</div>
              )}
            </FieldContainer>

            <FieldContainer id="lastName" label="Last Name">
              <Field
                as={Input}
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full border p-3 ${
                  errors.lastName && touched.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && touched.lastName && (
                <div className="text-red-500 text-sm">{errors.lastName}</div>
              )}
            </FieldContainer>

            <FieldContainer id="dob" label="Date of Birth">
              <DatePicker
                id="dob"
                name="dob"
                placeholder="Select your date of birth"
                size="large"
                onChange={(date, dateString) => setFieldValue("dob", dateString)}
                className={`mt-1 block w-full border p-3 ${
                  errors.dob && touched.dob ? "border-red-500" : ""
                }`}
              />
              {errors.dob && touched.dob && (
                <div className="text-red-500 text-sm">{errors.dob}</div>
              )}
            </FieldContainer>

            <FieldContainer id="gender" label="Gender">
              <Select
                placeholder="Select your gender"
                optionFilterProp="label"
                className="w-full"
                size="large"
                onChange={(value: string) => setFieldValue("gender", value)}
                options={[
                  {
                    value: 'female',
                    label: 'Female',
                  },
                  {
                    value: 'male',
                    label: 'Male',
                  }
                ]}
              />
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

            <FieldContainer id="phone" label="Phone number">
              <Field
                as={Input}
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                className={`mt-1 block w-full border p-3 ${
                  errors.phone && touched.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && touched.phone && (
                <div className="text-red-500 text-sm">{errors.phone}</div>
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

export default StudentSignup