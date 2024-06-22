import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { APP_IS_PROD, APP_PORT } from './config/envs';
import { BadRequestException, LogLevel, Logger, ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const logLevel: LogLevel[] = ['error', 'warn', 'fatal', 'log'];

  if (!APP_IS_PROD) {
    logLevel.push('debug', 'verbose');
  }

  const app = await NestFactory.create(AppModule, { logger: logLevel });

  app.enableVersioning({type: VersioningType.URI});

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

   // print validation errors
   app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: !APP_IS_PROD,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const allErrorMsg = errors.flatMap((error) =>
          Object.values(error.constraints),
        );

        if (!APP_IS_PROD) {
          logger.debug('Validations errors', allErrorMsg);
          logger.debug('Error schema', errors);
        }

        return new BadRequestException(allErrorMsg);
      },
    }),
  );


  await app.listen(APP_PORT);
}
bootstrap();
