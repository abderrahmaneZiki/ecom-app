import {Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import path = require("path");
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/shared/auth.guard';
import createProductDto from 'src/dto/create-product.dto';
import { Product } from 'src/shared/product.decorator';
const fs = require('fs')

@Controller('work-space/product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Post()
    @UseGuards(new AuthGuard())
    @UseInterceptors(FilesInterceptor('file', 10, {
        storage: diskStorage({
            destination: "./uploads/images",
            filename: (req, file, cb) => {
                const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + (new Date()).getTime();
                const extension = path.parse(file.originalname).ext
                cb(null, `${fileName}${extension}`)
            }
        }),
        fileFilter: function (req, file, cb) {
            let ext = path.extname(file.originalname);
            if (ext.toLocaleLowerCase() !== '.png' && ext.toLocaleLowerCase() !== '.jpg' && ext.toLocaleLowerCase() !== '.gif' && ext.toLocaleLowerCase() !== '.jpeg') {
                req.fileValidationError = "Forbidden extension";
                return cb(null, false);
            }
            cb(null, true);
        }
    }))
    async createProduct(@Req() req, @Product(new ValidationPipe({ validateCustomDecorators: true })) product: createProductDto, @UploadedFiles() files) {
        if (req.file) {
            console.log("No file received or invalid file type");
            throw new HttpException('error file format', HttpStatus.BAD_REQUEST)
        }
        files.map((item, index) => {
            product.img.push(item.filename);
        })
        return await this.productService.createProduct(product);
    }

    @Put('/add-images/:id')
     @UseGuards(new AuthGuard())
    @UseInterceptors(FilesInterceptor('file', 10, {
        storage: diskStorage({
            destination: "./uploads/images",
            filename: (req, file, cb) => {
                const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + (new Date()).getTime();
                const extension = path.parse(file.originalname).ext
                cb(null, `${fileName}${extension}`)
            }
        }),
        fileFilter: function (req, file, cb) {
            let ext = path.extname(file.originalname);
            if (ext.toLocaleLowerCase() !== '.png' && ext.toLocaleLowerCase() !== '.jpg' && ext.toLocaleLowerCase() !== '.gif' && ext.toLocaleLowerCase() !== '.jpeg') {
                console.log('error');
                
                req.fileValidationError = "Forbidden extension";
                return cb(null, false);
            }
            cb(null, true);
        }
    }))

    async addImage(@Req() req, @Param('id') id: any, @UploadedFiles() files) {
        if (req.file) {
            throw new HttpException('error file format', HttpStatus.BAD_REQUEST)
        }
        let images = [];
        files.map((item, index) => {
            images.push(item.filename);
        })
        if (id) {
            let product = await this.productService.product(id);
            if (product) {
                product.img=[...product.img,...images];
                return this.productService.updateProduct(id, product)
            }
        }
        throw new HttpException('error product invalide', HttpStatus.BAD_REQUEST)
    }

    @Delete('/delete-image/:id')
    @UseGuards(new AuthGuard())
    async deleteImage(@Param('id') id: any,@Query('image') image) {
        if (id) {
            let product = await this.productService.product(id);
            if (product) {
                let images=[]
                product.img.map((item,index)=>{
                    if(item != image){
                        images.push(item)
                    }
                     else{
                        try {
                            const path='./uploads/images/'+image
                            fs.unlinkSync(path)
                          } catch(err) {
                            throw new HttpException('delete file error', HttpStatus.BAD_REQUEST)
                          }
                     }
                });
                product.img=images;
               return this.productService.updateProduct(id, product)
            }
        }
        throw new HttpException('error product invalide', HttpStatus.BAD_REQUEST)
        
    }
    @Get()
   // @UseGuards(new AuthGuard())
    listProduct() {
        return this.productService.listProduct();
    }

    @Get('/:id')
    @UseGuards(new AuthGuard())
    productById(@Param('id') id: any) {
        return this.productService.productById(id);
    }


    @Delete(':id')
    //@UseGuards(new AuthGuard())
    async deleteProduct(@Param('id') id: any) {
        let data=await this.productService.removeProduct(id);
        data.img.map((item,index)=>{
            try {
                let path='./uploads/images/'+item
                fs.unlinkSync(path)
              } catch(err) {
                //throw new HttpException('delete file error', HttpStatus.BAD_REQUEST)
              }
        })
    }

}
