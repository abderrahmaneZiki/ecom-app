import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('work-space/customer')
export class CustomerController {
   
    constructor(private customerService:CustomerService){}

    @Get()
    async listCustomer(){
       return await  this.customerService.listCustomer();
    }
}
