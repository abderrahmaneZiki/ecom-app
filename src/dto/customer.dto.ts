import { IsEmail, IsNumber, IsString } from "class-validator";

export default class CustomerDto {
    @IsString()
    first_name: string;
    @IsString()
    last_name: string;
    @IsEmail()
    email: string;
    @IsString()
    phone: string;
    @IsString()
    address: string;
    @IsString()
    city: string;
    @IsString()
    country: string;
    @IsNumber()
    code_postal: number;

}