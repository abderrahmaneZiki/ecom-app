import {  IsString } from "class-validator";

export default class ProductIdDto {
    @IsString()
    id:string
}
