import { Type } from "class-transformer";
import { IsEmail, IsObject, IsString, ValidateNested } from "class-validator";
import ProductIdDto from "./productID.dto";

export default class ReviewDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    message: string;
    @IsObject()
    @ValidateNested()
    @Type(() =>ProductIdDto)
    product:ProductIdDto
}