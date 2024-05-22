import { IsBoolean } from "@nestjs/class-validator";
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DepartmentCreateDto {
    @IsEmpty({ message: 'El campo ID no debe existir.' })
    readonly id: number;

    @IsEmpty({ message: 'El campo created_at no debe existir.' })
    readonly created_at: Date;

    @IsEmpty({ message: 'El campo updated_at no debe existir.' })
    readonly updated_at: Date;

    @IsBoolean()
    @IsEmpty({ message: 'El campo status no debe existir.' })
    readonly status: boolean;

    @IsString({ message: 'Debe ser un String.' })
    @IsNotEmpty({ message: 'El campo name es obligatorio.' })
    readonly name: string;

    @IsNotEmpty({ message: 'El campo country_id es obligatorio.' })
    readonly country_id: number;
}

export class DepartmentUpdateDto {
    @IsEmpty({ message: 'El campo ID no debe existir.' })
    readonly id: number;

    @IsEmpty({ message: 'El campo created_at no debe existir.' })
    readonly created_at: Date;

    @IsEmpty({ message: 'El campo updated_at no debe existir.' })
    readonly updated_at: Date;

    @IsOptional()
    @IsBoolean()
    readonly status: boolean;

    @IsOptional()
    readonly name: string;

    @IsOptional()
    readonly country_id: number;
}

export class DepartmentUpdateStatusDto {
    @IsEmpty({ message: 'El campo ID no debe existir.' })
    readonly id: number;

    @IsEmpty({ message: 'El campo created_at no debe existir.' })
    readonly created_at: Date;

    @IsEmpty({ message: 'El campo updated_at no debe existir.' })
    readonly updated_at: Date;

    @IsNotEmpty({ message: 'El campo Status es obligatorio.' })
    readonly status: boolean;

    @IsEmpty({ message: 'El campo Name no debe existir.' })
    readonly name: string;

    @IsEmpty({ message: 'El campo country_id es obligatorio.' })
    readonly country_id: number;
}