import { DepartmentEntity } from "./department.entity";

export interface Int_Department_Response {
    message: string,
    data: DepartmentEntity,
}

export interface Int_Department_Pagination_Response {
    data: DepartmentEntity[],
    totalCount: number,
    totalPages: number,
    currentPage: number,
}