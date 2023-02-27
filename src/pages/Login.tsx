import { Formik, Field, Form } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../core/context";
import authServices from "../core/services/auth.service";
import LoginValidation from "../core/validations/login.validation";
import toastConfig from "../shared/utils/toastifyConfig";

interface ILogin {
  email: string;
  password: string;
}
const Login = () => {
  const { setAuthData } = useContext(AuthContext);

  const navigate = useNavigate();

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: ILogin) => {
    authServices
      .login(values.email.toLowerCase(), values.password)
      .then((res) => {
        if (res.data.success) {
          toast.success("Login Successful", toastConfig);
          localStorage.setItem("authData", JSON.stringify(res.data.authData));
          setAuthData(res.data.authData);
          navigate("/");
        } else {
          toast.error(res.data.message, toastConfig);
        }
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          toast.error("server issue", toastConfig);
        }
      });
  };
  return (
    <div className="w-full p-6 flex justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginValidation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => {
          const { values, touched, errors } = props;
          return (
            <Form className="flex flex-col space-y-5 w-72">
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="email">Email:</label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  className="border border-gray-400 rounded-md px-3 py-1.5 text-sm focus:outline-none"
                  autoComplete="off"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={values.email}
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
                  autoComplete="off"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={values.password}
                  placeholder="***********"
                />
                {errors.password && touched.password && (
                  <p className="text-xs text-red-600 font-semibold">
                    {errors.password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white font-semibold w-full px-4 py-2 rounded-lg"
              >
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
