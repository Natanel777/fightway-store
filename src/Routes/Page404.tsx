import { NavLink } from 'react-router-dom';
import notFoundImage from '../Assets/NotFound.jpg';
import CurrentPageContext from 'Context/CurrentPageContext';
import { useContext } from 'react';

export default function Page404() {
  const { currentPage, changeCurrentPage } = useContext(CurrentPageContext)
    const backgroundImageUrl = notFoundImage; 

  return (
    <>
      <main className="grid min-h-screen p-20 bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImageUrl}')` }}>
        <div className="text-center">
          <p className="text-base font-semibold text-gray-900">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-11">
            <NavLink
              to="/store"
              onClick={ () => changeCurrentPage("/store")}
              className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </NavLink>
            </div>
            
            <div className='pt-6'>
            <NavLink to="/support" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true"></span>
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
}