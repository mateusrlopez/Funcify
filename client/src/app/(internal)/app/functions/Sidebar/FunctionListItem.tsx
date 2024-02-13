"use client";

import { ContextMenu } from "@/components/ContextMenu";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";
import { FaRegFileCode } from "react-icons/fa6";
import { MdFileOpen, MdOutlineOpenInNew, MdEdit, MdDelete } from "react-icons/md";

import { Root } from "./FunctionListItem.styles";

type Props = {
    name: string;
    id: string;
};

const FunctionListItem = ({ name, id }: Props): ReactNode => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedFunctionID = searchParams.get("fid");

    const createQueryString = useCallback(
        (functionID: string) => {
            const params: URLSearchParams = new URLSearchParams(searchParams.toString());
            params.set("fid", functionID);

            return params.toString();
        },
        [searchParams]
    );

    return (
        <ContextMenu>
            <ContextMenu.Trigger>
                <Root
                    data-selected={selectedFunctionID === id}
                    onClick={() =>
                        router.push(`${pathname}?${createQueryString(id)}`, {
                            scroll: false,
                        })
                    }
                >
                    <FaRegFileCode size={16} />
                    <span title="funfifsdfasdfadsfasdfasdfasfsdfadcuf.js">{name}</span>
                </Root>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item>
                    <MdOutlineOpenInNew size={16} />
                    Open
                </ContextMenu.Item>
                <ContextMenu.Item>
                    <MdEdit size={16} />
                    Edit
                </ContextMenu.Item>
                <ContextMenu.Item>
                    <MdDelete size={16} />
                    Delete
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>
                    <MdFileOpen size={16} />
                    Show logs
                </ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu>
    );
};

export { FunctionListItem };
