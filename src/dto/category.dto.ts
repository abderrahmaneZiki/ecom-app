import { IsString } from "class-validator";

export default class CategoryDto {
    @IsString()
    name: string;
}