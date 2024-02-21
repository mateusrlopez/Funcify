"use client";

import { EditFunctionModal } from "@/app/(internal)/app/functions/Sidebar/EditFunctionModal";
import { ContextMenu } from "@/components/ContextMenu";
import { CoreTheme } from "@/theme/core";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";
import { FaRegFileCode } from "react-icons/fa6";
import { MdFileOpen, MdOutlineOpenInNew, MdEdit, MdDelete } from "react-icons/md";

import { DeleteFunctionModal } from "./DeleteFunctionModal";
import { Root } from "./FunctionListItem.styles";

const STATUS_COLORS = {
    CREATING: CoreTheme.colors.lighterBlue,
    RUNNING: CoreTheme.colors.darkestGreen,
    ERROR: CoreTheme.colors.lighterRed,
};

const FunctionListItem = (props: FunctionSchema): ReactNode => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedFunctionID = searchParams.get("fid");
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

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
                    data-selected={selectedFunctionID === props.id}
                    onClick={() =>
                        router.push(`${pathname}?${createQueryString(props.id)}`, {
                            scroll: false,
                        })
                    }
                >
                    <FaRegFileCode size={16} color={STATUS_COLORS[props.status]} />
                    <span title={props.name}>{props.name}</span>
                </Root>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item>
                    <MdOutlineOpenInNew size={16} />
                    Open
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => setEditModal(true)}>
                    <MdEdit size={16} />
                    Edit
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => setDeleteModal(true)}>
                    <MdDelete size={16} />
                    Delete
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item disabled>
                    <MdFileOpen size={16} />
                    Show logs
                </ContextMenu.Item>
            </ContextMenu.Content>

            <EditFunctionModal open={editModal} setOpen={setEditModal} {...props} />
            <DeleteFunctionModal open={deleteModal} setOpen={setDeleteModal} {...props} />
        </ContextMenu>
    );
};

export { FunctionListItem };
