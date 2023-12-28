import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      logger: ['error', 'warn', 'log', 'debug', 'verbose']
    }
  );

  const config = new DocumentBuilder()
    .setTitle('Playcount')
    .setDescription('Playcount API')
    .setVersion('1.0')
    .addTag('Playcount')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3030);
}
bootstrap();
