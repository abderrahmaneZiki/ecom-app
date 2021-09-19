import { Type } from "class-transformer";
import { IsNumber, IsObject, isObject, IsString, ValidateNested } from "class-validator";
import CategoryDto from "./category.dto";

class CategoryIdDto{
    @IsString()
    id: string;
}
export default class createProductDto {
    @IsString()
    short_name: string;

    @IsString()
    long_name: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsObject()
    @ValidateNested()
    @Type(() => CategoryIdDto)
    category: CategoryIdDto;

    variation: any;

    img:string[];
}