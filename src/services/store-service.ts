import { Page } from "utils/types";
import { request } from "../utils/axios-interceptor";

export const storeRequest = () => request({ url: "/store" })

export const storePageRequest = (page:Page) => request({ url: `/store/page?pageNo=${page.pageNo}&pageSize=${page.pageSize}&sortBy=${page.sortBy}&sortDir=${page.sortDir}` })
