import { IsNumber, IsString } from "class-validator";

export default class CartDto {

    @IsString()
    status: string;
}