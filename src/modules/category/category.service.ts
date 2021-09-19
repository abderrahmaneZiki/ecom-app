import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryDto from 'src/dto/category.dto';
import CategoryEntity from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) { }

    async createCategory(data: CategoryDto) {
        let category = await this.categoryRepository.create(data);
        await this.categoryRepository.save(category);
        return this.listCategories();
    }

    async listCategories() {
        return await this.categoryRepository.find();
    }

    async remove(id) {
        let category = await this.categoryById(id);
        if (category) {
            await this.categoryRepository.remove(category);
            return this.listCategories();
        }
        throw new HttpException("id invalid", HttpStatus.BAD_REQUEST);
    }

    async updateCategory(id, name) {
        let category = await this.categoryById(id); 
        if (category) {
            category.name = name;
            await this.categoryRepository.update(id, category);
            return category;
        }
        throw new HttpException("id invalid", HttpStatus.BAD_REQUEST);
    }
    async categoryById(id) {
        return await this.categoryRepository.findOne({ where: {id} });
    }
}
