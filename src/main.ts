import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { api } from './utils/constants';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/user/user.module';

const currentApiVersion = api.api_v_1_0;

const modules = {
  auth: AuthModule,
  user: UserModule,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  currentApiVersion.entities.forEach(entity => {
    let options = new DocumentBuilder()
      .setTitle(entity.name)
      .setDescription(entity.description)
      .setVersion(currentApiVersion.version)
      .addTag(entity.tag)
      .addBearerAuth()
      .build();
    let document = SwaggerModule.createDocument(app, options, {
      include: [modules[entity.tag]],
    });
    SwaggerModule.setup(
      `api/docs/${currentApiVersion.version}/${entity.tag}`,
      app,
      document,
    );
  });
  await app.listen(3000);
}
bootstrap();
