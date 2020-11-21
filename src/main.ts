import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '120mb' }));
  app.use(bodyParser.urlencoded({ limit: '120mb', extended: true }));
  app.use(helmet());
  var whitelist = ['https://localhost:4200', ''];
  app.enableCors({
    origin: function (origin, callback) {
      callback(null, true)
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    validationError: {
      target: false,
    }
  }));
  await app.listen(3000);
}
bootstrap();
