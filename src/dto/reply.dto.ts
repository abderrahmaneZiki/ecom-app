import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import ProductIdDto from "./productID.dto";
class ReviewIdDto{
    @IsString()
    id: string;
}
export default class ReplyDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    message: string;
    @IsObject()
    @ValidateNested()
    @Type(() =>ReviewIdDto)
    review:ReviewIdDto
}