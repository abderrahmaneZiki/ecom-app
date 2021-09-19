import { IsNumber, IsString } from "class-validator";

export default class ShippingDto {
    @IsNumber()
    price: number;
    @IsString()
    city: string;
}