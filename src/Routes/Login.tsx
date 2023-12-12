import { NavLink, useNavigate } from 'react-router-dom'
import icon from '../Assets/blackLogoReact.png'
import { useContext, useState } from 'react'
import CurrentPageContext from 'Context/CurrentPageContext'
import * as Yup from 'yup';
import AuthContext from 'Context/AuthContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import authService from 'services/auth-service';
import Spinner from 'Components/Spinner/Spinner';

export default function Login() {

  const { currentPage, changeCurrentPage } = useContext(CurrentPageContext)
  const { login } = useContext(AuthContext)
  const nav = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setloading] = useState<boolean>(false);


  const validationSchema = Yup.object({
    username: Yup.string().min(2).max(20).required(),
    password: Yup.string().min(6).max(20).required(),
  });

  const intialValues = {
    username: "",
    password: ""
  }

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={intialValues}

        onSubmit={({ username, password }) => {
          setloading(true)
          setError(undefined); 

          authService.login(username, password)
            .then((res) => {
              //save the user name and jwt on the app contect (in memory - app wide state)
              login(username, res.jwt)
              nav("/store")
            })

            .catch((e) => {
              console.log(e.response.data)
              setError("Invalid username or password.")
            })

            .finally(() => {
              setloading(false)
            })

        }
        }
      >
        <div className="space-y-6 border rounded-md p-4">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src={icon}
                alt="Fight Way Icon"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <Field
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-1"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <NavLink to="/support" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </NavLink>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-1"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500" />
                  </div>
                </div>

                <div>
                  <button
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                </div>
              </Form>
            
              <p className="mt-6 text-center text-sm text-gray-500">
                Don't have an account yet?{' '}
                <NavLink to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Sign Up
                </NavLink>
              </p>
              {error && <p className=' border-red-500 border-b-2 w-fit mx-auto px-10 py-4 shadow-md rounded-3xl italic font-medium text-red-500 text-center'>{error}</p>}
              {loading && <Spinner />}
            </div>
          </div>
        </div>
      </Formik>
    </>
  )
}