import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const ssl = config.get<string>("DB_SSL") === "true";
        return {
          dialect: "postgres",
          host: config.get<string>("DB_HOST"),
          port: Number(config.get<string>("DB_PORT") ?? "5432"),
          username: config.get<string>("DB_USER"),
          password: config.get<string>("DB_PASS"),
          database: config.get<string>("DB_NAME"),
          autoLoadModels: true,
          synchronize: false, // IMPORTANT: don't let Sequelize mutate prod schema
          logging: false,
          dialectOptions: ssl
            ? { ssl: { require: true, rejectUnauthorized: false } }
            : undefined,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
