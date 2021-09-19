import {  IsNumber, IsString } from "class-validator";

export default class UpdatePanelDto {

    @IsString()
    id: String;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}
