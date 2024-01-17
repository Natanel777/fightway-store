import { Page } from "utils/types";
import { postRequest, requestNoAuth,request  } from "../utils/axios-interceptor";

export const storeRequest = () => requestNoAuth({ url: "/store" })

export const storePageRequest = (page:Page) => requestNoAuth({ url: `/store/page?pageNo=${page.pageNo}&pageSize=${page.pageSize}&sortBy=${page.sortBy}&sortDir=${page.sortDir}&type=${page.type}` })

export const strikingPageRequest = (page:Page) => requestNoAuth({ url: `/striking/page?pageNo=${page.pageNo}&pageSize=${page.pageSize}&sortBy=${page.sortBy}&sortDir=${page.sortDir}&type=${page.type}` })

export const grapplingPageRequest = (page:Page) => requestNoAuth({ url: `/grappling/page?pageNo=${page.pageNo}&pageSize=${page.pageSize}&sortBy=${page.sortBy}&sortDir=${page.sortDir}&type=${page.type}` })

export const storeCartPostRequest = (quantity:number, id:number) => postRequest(`/store/${id}`,{quantity:`${quantity}`})

export const storeCartRequest = () => request({ url: "/main" })


