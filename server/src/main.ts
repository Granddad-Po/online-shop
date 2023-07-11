import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
const {PORT} = require('../config')

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);
        await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}

bootstrap();
