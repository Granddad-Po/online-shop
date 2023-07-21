import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);
        app.use(cookieParser())
        await app.listen(process.env.PORT || 5050, () => console.log(`Server started on PORT: ${process.env.PORT}`));
    } catch (e) {
        console.log(e)
    }
}

bootstrap();
