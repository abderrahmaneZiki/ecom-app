import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const  Product = createParamDecorator((data, ctx: ExecutionContext) => {
  return JSON.parse(ctx.switchToHttp().getRequest().body.product)
  });