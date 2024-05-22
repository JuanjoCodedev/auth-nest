import { IsBoolean } from "@nestjs/class-validator";
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class MunicipalityCreateDto {
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

    @IsNotEmpty({ message: 'El campo department_id es obligatorio.' })
    readonly department_id: number;

    @IsBoolean()
    @IsEmpty({ message: 'El campo is_city no debe existir.' })
    readonly is_city: boolean;
}

export class MunicipalityUpdateDto {
    @IsEmpty({ message: 'El campo ID no debe existir.' })
    readonly id: number;

    @IsEmpty({ message: 'El campo created_at no debe existir.' })
    readonly created_at: Date;

    @IsEmpty({ message: 'El campo updated_at no debe existir.' })
    readonly updated_at: Date;

    @IsOptional()
    readonly status: boolean;

    @IsOptional()
    readonly name: string;

    @IsOptional()
    readonly department_id: number;
}

export class MunicipalityUpdateStatusDto {
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

    @IsEmpty({ message: 'El campo department_id es obligatorio.' })
    readonly department_id: number;

    @IsEmpty({ message: 'El campo is_city es obligatorio.' })
    readonly is_city: boolean;
}