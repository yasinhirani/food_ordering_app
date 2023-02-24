import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../core/context";
import LoginValidation from "../core/validations/login.validation";

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
    axios
      .post("http://localhost:8080/api/login", {
        userEmail: values.email.toLowerCase(),
        password: values.password,
      })
      .then((res) => {
        if (res.data.success) {
          // toast.success("Login Successful", ToastConfig);
          // localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("authData", JSON.stringify(res.data.authData));
          setAuthData(res.data.authData);
          navigate("/");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          console.log("server issue");
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
