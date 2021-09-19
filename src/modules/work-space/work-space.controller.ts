import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';
import { WorkSpaceService } from './work-space.service';

@Controller('product')
export class WorkSpaceController {

    constructor(private workSpaceService:WorkSpaceService){}

    @Get('/:image')
    getImage(@Param('image') image:string,@Res() res){
     return res.sendFile(join(process.cwd(),'uploads/images/'+image)) ;
    }

    


}
