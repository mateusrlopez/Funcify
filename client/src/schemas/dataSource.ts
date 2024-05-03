import { z } from "zod";

export const MQTTConfigSchema = z.object({
    broker: z.string(),
    qos: z.number(),
    // topic: z.string(),
});

export const RedisConfigSchema = z.object({
    address: z.string(),
    username: z.string(),
    password: z.string(),
    database: z.string(),
    // channel: z.string(),
});

export const DataSourceSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["MQTT", "REDIS"]),
    configuration: z.union([MQTTConfigSchema, RedisConfigSchema]),
});
