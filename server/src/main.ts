import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);
        app.use(cookieParser())
        
        const config = new DocumentBuilder()
            .setTitle('Шаблон интернет магазина')
            .setDescription('Документация REST API')
            .setVersion('1.0.0')
            .addTag('Granddad Po')
            .build()
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('/api/docs', app, document)
        
        await app.listen(process.env.PORT || 5050, () => console.log(`Server started on PORT: ${process.env.PORT}`));
    } catch (e) {
        console.log(e)
    }
}

bootstrap();
