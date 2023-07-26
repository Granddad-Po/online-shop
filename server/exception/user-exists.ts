import {HttpException, HttpStatus} from "@nestjs/common";

export class UserExistsException extends HttpException {
    constructor() {
        super('Such user already exists', HttpStatus.FORBIDDEN);
    }
}