import { FunctionSchema } from "@/types/function";
import { createContext, ReactNode, useState } from "react";

type FunctionsContextType = {
    selectedFunction: FunctionSchema | null;
    setSelectedFunction: (functionSchema: FunctionSchema) => void;
    code: string;
    setCode: (code: string) => void;
};

export const FunctionsContext = createContext<FunctionsContextType | null>(null);

const FunctionsProvider = ({ children }: { children: ReactNode }): ReactNode => {
    const [selectedFunction, setSelectedFunction] = useState<FunctionSchema | null>(null);
    const [code, setCode] = useState<string>("");

    return (
        <FunctionsContext.Provider value={{ selectedFunction, setSelectedFunction, code, setCode }}>
            {children}
        </FunctionsContext.Provider>
    );
};

export { FunctionsProvider };
