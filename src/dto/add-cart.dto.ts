import { Type } from "class-transformer";
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import ProductIdDto from "./productID.dto";

class PanelDto{

    @IsObject()
    @ValidateNested()
    @Type(() => ProductIdDto)
    product: ProductIdDto;

    @IsNumber()
    quantity:number;

    @IsNumber()
    price:number;
}
export default class AddCartDto {

    @IsString()
    status: string;

    @IsArray()
    @ValidateNested()
    @Type(() => PanelDto)
    products: PanelDto[];
}