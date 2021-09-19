import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import CategoryDto from 'src/dto/category.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { CategoryService } from './category.service';

@Controller('work-space/category')
export class CategoryController {

    constructor(private categoryService:CategoryService){}

    @Post()
    @UsePipes(new ValidationPipe())
   @UseGuards(new AuthGuard())
    createCategory(@Body() data:CategoryDto){
           return this.categoryService.createCategory(data);
    }

    @Get()
   @UseGuards(new AuthGuard())
    listCategries(){
         return this.categoryService.listCategories();
    }

    @Delete('/:id')
    @UseGuards(new AuthGuard())
    removeCategory(@Param('id') id:any){
        return this.categoryService.remove(id);
    }

    @Put('/:id')
   @UseGuards(new AuthGuard())
    updateCategory(@Param('id') id:any,@Body() data :CategoryDto){
        return this.categoryService.updateCategory(id,data);
    }


}
