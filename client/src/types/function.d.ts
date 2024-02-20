type MqttConfiguration = {
    broker: string;
    topic: string;
    qos: number;
};

type RedisConfiguration = {
    address: string;
    username: string;
    password: string;
    database: string;
    channel: string;
};

type ConnectorConfiguration = MqttConfiguration | RedisConfiguration;

type FunctionSchema<I = ConnectorConfiguration, O = MqttConfiguration> = {
    id: string;
    name: string;
    sourceCode: string;
    methodToExecute: string;
    status: "CREATING" | "RUNNING" | "ERROR";
    inputConnectorType: "MQTT" | "REDIS";
    inputConnectorConfiguration: I;
    outputConnectorType: "MQTT" | "REDIS";
    outputConnectorConfiguration: O;
};

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
