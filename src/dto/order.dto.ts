import { Type } from "class-transformer";
import { IsDate, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import ProductIdDto from "./productID.dto";

export default class OrerDto {
    @IsDate()
    ordered: Date;
    @IsDate()
    shipped: Date;
    @IsNumber()
    quantity: number;
    @IsString()
    ship_to: string;
    @IsString()
    order_status: string;
    @IsNumber()
    total: number;
    @IsObject()
    @ValidateNested()
    @Type(() =>ProductIdDto)
    product:ProductIdDto
    @IsNumber()
    customer_id: number;
}