import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CountryCreateDto {
    @IsEmpty({ message: 'El campo ID no debe existir.' })
    readonly id: number;

    @IsEmpty({ message: 'El campo created_at no debe existir.' })
    readonly created_at: Date;

    @IsEmpty({ message: 'El campo updated_at no debe existir.' })
    readonly updated_at: Date;

    @IsEmpty({ message: 'El campo Status no debe existir.' })
    readonly status: boolean;

    @IsString({ message: 'Debe ser un String.' })
    @IsNotEmpty({ message: 'El campo Name es obligatorio.' })
    readonly name: string;
}

export class CountryUpdateDto {
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
}

export class CountryUpdateStatusDto {
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
}