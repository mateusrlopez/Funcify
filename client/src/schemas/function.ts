import { z } from "zod";

import { MQTTConfigSchema, RedisConfigSchema } from "./dataSource";

export const FunctionSchema = z.object({
    id: z.string(),
    name: z.string(),
    sourceCode: z.string(),
    methodToExecute: z.string(),
    status: z.enum(["CREATING", "RUNNING", "ERROR"]),
    inputConnectorType: z.enum(["MQTT", "REDIS"]),
    inputConnectorConfiguration: z.union([MQTTConfigSchema, RedisConfigSchema]),
    outputConnectorType: z.enum(["MQTT", "REDIS"]),
    outputConnectorConfiguration: z.union([MQTTConfigSchema, RedisConfigSchema]),
});
