import Spinner from 'Components/Spinner/Spinner';
import AuthContext from 'Context/AuthContext';
import CurrentPageContext from 'Context/CurrentPageContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from 'services/auth-service';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import icon from '../Assets/blackLogoReact.png';


export default function SignUp() {
    const nav = useNavigate();
    const [error, setError] = useState<string>();
    const [loading, setloading] = useState<boolean>(false);
    const { signUp } = useContext(AuthContext)
    const { changeCurrentPage } = useContext(CurrentPageContext)
    const termsLink = 'https://www.dropbox.com/scl/fi/invnie92nz297jbsxctnw/htmlCode.pdf?rlkey=eeq6d0712yn4fyrsefjhl88wo&raw=1';

    const validationSchema = Yup.object({
        username: Yup.string().min(2).max(20).required(),
        email: Yup.string().email().required(),
        password: Yup.string()
            .min(6)
            .max(20)
            .test({
                name: 'password',
                message: 'Password must contain at least one uppercase letter and one number',
                test: (value: string | undefined) => {
                    if (!value) {
                        return false; // Handle empty string or undefined based on your requirements
                    }

                    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/.test(value);
                },
            })
            .required(),
    });

    const intialValues = {
        username: "",
        email: "",
        password: ""
    }

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={intialValues}

            onSubmit={({ username, email, password }) => {
                setloading(true)
                setError(undefined); //new round - clean slate

                authService.register(username, email, password)
                    .then((res) => {
                        Swal.fire({
                            title: 'Registered successfully!',
                            icon: "success",
                            timer: 2000
                        })
                        signUp();
                        nav("/main")
                        changeCurrentPage("/main")
                    })

                    .catch((e) => {
                        console.log(e.response.data)
                        setError(e.response.data.message)
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
                            Create an account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Form className="space-y-6">

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>

                                <div className="mt-2">
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-1"
                                    />

                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    User name
                                </label>

                                <div className="mt-2">
                                    <Field
                                        id="username"
                                        name="username"
                                        type="username"
                                        autoComplete="username"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:pl-1"
                                    />

                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="text-red-500" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

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

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <Field
                                        id="checkbox"
                                        aria-describedby="checkbox"
                                        type="Checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required
                                    />

                                    <ErrorMessage
                                        name="checkbox"
                                        component="div"
                                        className="text-red-500" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="checkbox" className="font-light text-gray-500 dark:text-gray-300">
                                        I Accept the{' '}
                                        <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href={termsLink}>
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </Form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <NavLink to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Login here
                            </NavLink>
                        </p>

                        {error && (
                            <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 mx-auto mt-4 rounded-md shadow-md italic font-medium'>
                                {error}
                            </p>
                        )}

                        {loading && <Spinner />}
                    </div>
                </div>
            </div>
        </Formik>
    )
}