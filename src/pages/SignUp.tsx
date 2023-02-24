import { Formik, Form, Field } from "formik";
import authServices from "../core/services/auth.service";
import RegisterValidation from "../core/validations/resgiter.validation";

interface IRegister {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUp = () => {
  const initialValues: IRegister = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (values: IRegister) => {
    authServices
      .register(values.userName, values.email, values.password)
      .then((res) => {
        console.log(res.data.message);
      });
  };
  return (
    <div className="w-full p-6 flex justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterValidation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => {
          const { values, touched, errors } = props;
          return (
            <Form action="" className="flex flex-col space-y-5 w-72">
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="email">Username:</label>
                <Field
                  type="text"
                  name="userName"
                  id="userName"
                  className="border border-gray-400 rounded-md px-3 py-1.5 text-sm focus:outline-none"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={values.userName}
                  autoComplete="off"
                  placeholder="username"
                />
                {errors.userName && touched.userName && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.userName}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="email">Email:</label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  className="border border-gray-400 rounded-md px-3 py-1.5 text-sm focus:outline-none"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={values.email}
                  autoComplete="off"
                  placeholder="youremail@gmail.com"
                />
                {errors.email && touched.email && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="password">Password:</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="border border-gray-400 rounded-md px-3 py-1.5 text-sm focus:outline-none"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={values.password}
                  autoComplete="off"
                  placeholder="***********"
                />
                {errors.password && touched.password && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="password">Confirm Password:</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="border border-gray-400 rounded-md px-3 py-1.5 text-sm focus:outline-none"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={values.confirmPassword}
                  autoComplete="off"
                  placeholder="***********"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white font-semibold w-full px-4 py-2 rounded-lg"
              >
                Register
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUp;
