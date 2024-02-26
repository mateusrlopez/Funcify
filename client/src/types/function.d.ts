import { FunctionSchema as FunctionZodSchema } from "@/schemas/function";
import { MqttConfiguration, RedisConfiguration } from "@/types/dataSource";
import { z } from "zod";

type ConnectorConfiguration = MqttConfiguration | RedisConfiguration;
type FunctionSchema = z.infer<typeof FunctionZodSchema>;

type CreateFunction<I = ConnectorConfiguration, O = ConnectorConfiguration> = Omit<
    FunctionSchema<I, O>,
    "id" | "status"
>;

type UpdateFunction<I = ConnectorConfiguration, O = ConnectorConfiguration> = Omit<
    FunctionSchema<I, O>,
    "id" | "status"
>;

type GetAllFunctions = {
    functions: Array<FunctionSchema>;
};
