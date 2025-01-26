import { CountryEntity } from "./country.entity";

export interface Int_Country_Response {
    message: string,
    data: CountryEntity,
}

export interface Int_Country_Pagination_Response {
    data: CountryEntity[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}