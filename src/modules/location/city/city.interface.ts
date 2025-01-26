import { CityEntity } from "./city.entity";

export interface Int_city_Response {
    message: string,
    data: CityEntity,
}

export interface Int_City_Pagination_Response {
    data: CityEntity[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}