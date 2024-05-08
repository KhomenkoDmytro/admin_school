import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AwsSesModule } from "./aws-ses/aws-ses.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Backend for art school app")
    .setDescription("Backend for art school app")
    .setVersion("1.2")
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AwsSesModule],
  });
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.NESTJS_PORT);
}
bootstrap();
