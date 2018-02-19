import { Controller, Param, Body, Get, Post, Put, Patch, Delete } from 'routing-controllers'

@Controller()
export class UserController {

  @Get('/users')
  getAll() {
    return 'This action returns all users'
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id
  }

  @Post('/users')
  post(@Body() user: any) {
    return 'Saving user...' + user
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    console.log(user)
    return 'Updating a user...' + id
  }

  @Patch('/users/:id')
  patch(@Param('id') id: number, @Body() user: any) {
    console.log(user)
    return 'Updating a user...' + id
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...' + id
  }
}
