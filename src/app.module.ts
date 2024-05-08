import { Module } from "@nestjs/common";
import { TeacherModule } from "./teacher/teacher.module";
import { AwsSesModule } from "./aws-ses/aws-ses.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TeacherModule,
    AwsSesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
