import { Input } from "@/components/Input";
import { ReactNode } from "react";

const MQTT = (): ReactNode => (
    <>
        <Input>
            <Input.Label fieldId="">Client</Input.Label>
            <Input.Field $tag="input" type="text" id="mqtt-client-field" name="client" />
        </Input>
        <Input>
            <Input.Label fieldId="">Topic</Input.Label>
            <Input.Field $tag="input" type="text" id="mqtt-topic-field" name="topic" />
        </Input>
        <Input>
            <Input.Label fieldId="">QoS</Input.Label>
            <Input.Field
                $tag="input"
                type="number"
                id="mqtt-qos-field"
                name="qos"
                defaultValue={2}
                min={0}
                max={2}
            />
        </Input>
    </>
);

export { MQTT };
