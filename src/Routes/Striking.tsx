import FilterStore from "Components/FilterStore/FilterStore";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { strikingPageRequest } from "services/store-service";
import { SortDir } from "utils/types";


const Striking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByPage, setSortBy] = useState("id");
  const [sortDirPage, setSortDirPage] = useState(SortDir.desc);
  const [sortTypePage, setTypePage] = useState("");
  const [products, setProducts] = useState([]);
  const { data: res, isSuccess } = useQuery("get-page-products", () => strikingPageRequest({
    pageNo: currentPage,
    pageSize: 15,
    sortBy: sortByPage,
    sortDir: sortDirPage,
    type: sortTypePage,
  }));

  //If Everthing Goes Well Save It
  useEffect(() => {
    if (isSuccess) {
      setProducts(res.data.results);
    } 
  }, [isSuccess, res]);





  //everytime sorting changes calling the page again
  const handlePageChange = useCallback(async (newPage: number) => {

    const newPageData = await strikingPageRequest({
      pageNo: newPage,
      pageSize: 10,
      sortBy: sortByPage,
      sortDir: sortDirPage,
      type: sortTypePage,
    });

    if (newPageData.status === 200) {
      setCurrentPage(newPage);
      setProducts([...newPageData.data.results] as any);
    }

    window.scrollTo(0, 0)
  }, [sortByPage, sortDirPage, sortTypePage]);





  useEffect(() => {
    handlePageChange(currentPage).catch(console.error);
  }, [handlePageChange, currentPage])





  const handlePriceChange = async (sortDir: string) => {

    setSortBy(() => "price")
    setSortDirPage(() => sortDir)
    setCurrentPage(() => 1)

  };

  const handleNewsetChange = async () => {

    setSortBy(() => "id")
    setSortDirPage(() => SortDir.desc)
    setCurrentPage(() => 1)

  };


  const onSubcategoryClick = useCallback((subcategory: any) => {
    setTypePage(subcategory)
    setCurrentPage(() => 1)
  }, []);



  const onNewestClick = async () => await handleNewsetChange();
  const onPriceAscClick = async () => await handlePriceChange(SortDir.asc);
  const onPriceDescClick = async () => await handlePriceChange(SortDir.desc);

  const filtersSection = {
    onNewestClick,
    onPriceAscClick,
    onPriceDescClick,
    onSubcategoryClick,
  };

  return (
    <div>
      <FilterStore
        additionalComponent={
          <div className="bg-white min-h-screen">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:p-8 xl:p-0">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                {products.map((product: any) => (
                  <div key={product.id} className="border border-gray-300 overflow-hidden rounded-lg shadow-md p-2">
                    <Link key={product.id} to={`/store/${product.id}`} className="group">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 relative w-full pt-p-100">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="absolute inset-0 h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="mt-4 text-sm font-semibold text-gray-700">{product.name}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">&#8362;{product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              <div className="mt-4 flex justify-center">
                {Array.from({ length: res?.data.totalPages || 0 }, (pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 px-4 py-2 ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300'
                      }`}
                  >
                    {index + 1}
                  </button>

                ))}
                <button
                  onClick={() => {
                    const nextPage = currentPage + 1;
                    if (nextPage <= res?.data.totalPages) {
                      handlePageChange(nextPage);
                    }
                  }}
                  className='mx-1 px-4 py-2 bg-gray-300'

                >
                  &#10141;
                </button>
              </div>



            </div>
          </div>
        } filtersSection={filtersSection}
      />
    </div>
  );
};

export default Striking;