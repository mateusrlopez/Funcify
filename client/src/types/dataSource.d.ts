import {
    MQTTConfigSchema,
    RedisConfigSchema,
    DataSourceSchema as DataSourceZodSchema,
} from "@/schemas/dataSource";
import { z } from "zod";

type MqttConfiguration = z.infer<typeof MQTTConfigSchema>;
type RedisConfiguration = z.infer<typeof RedisConfigSchema>;
type DataSourceSchema = z.infer<typeof DataSourceZodSchema>;

type DataSourceConfigOmittedSchema = {
    id: string;
    name: string;
    type: "MQTT" | "REDIS";
    configuration: Omit<MqttConfiguration, "topic"> | Omit<RedisConfiguration, "channel">;
};

type CreateDataSource = Omit<DataSourceConfigOmittedSchema, "id">;

type GetAllDataSources = {
    dataSources: Array<DataSourceSchema>;
};
