import { ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { DragNDropArea } from "./DragNDrop.styles";

const DragNDrop = (): ReactNode => {
    const [fileUploadErrorMessage, setFileUploadErrorMessage] = useState<string>("");

    const onDrop = useCallback((acceptedFiles: File[]): void => {
        if (acceptedFiles.length > 1) {
            setFileUploadErrorMessage("Please drop only one JavaScript file");
            return;
        }

        const file: File = acceptedFiles[0];
        if (!file.type.match(/javascript/)) {
            setFileUploadErrorMessage("Please drop a JavaScript file");
            return;
        }

        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.error("file reading has failed");
        reader.onload = () => {
            const binaryStr = reader.result;
            console.log(binaryStr);
        };
        reader.readAsArrayBuffer(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <DragNDropArea {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <span>Drop the JS file here...</span>
                ) : (
                    fileUploadErrorMessage || (
                        <span>Drag n' drop the JS file here, or click to select it</span>
                    )
                )}
            </DragNDropArea>
        </>
    );
};

export { DragNDrop };
