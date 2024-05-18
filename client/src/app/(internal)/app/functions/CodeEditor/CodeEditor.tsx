"use client";

import { FunctionsContext } from "@/app/_context/functions";
import { THEMES } from "@/app/(internal)/app/functions/CodeEditor/THEMES";
import { Dropdown } from "@/components/Dropdown";
import { getFunctionById } from "@/repository/functionRepository";
import { javascript } from "@codemirror/lang-javascript";
import { useQuery } from "@tanstack/react-query";
import CodeMirror from "@uiw/react-codemirror";
import { useSearchParams } from "next/navigation";
import { ReactNode, useContext, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { MdCheck, MdFormatColorFill, MdOutlineKeyboardTab } from "react-icons/md";

import { Root, Toolbar, LastUpdate, Settings } from "./CodeEditor.styles";

const CodeEditor = (): ReactNode => {
    const functionsCtx = useContext(FunctionsContext);
    const searchParams = useSearchParams();
    const fid = searchParams.get("fid");

    const [editorConfig, setEditorConfig] = useState({
        lineNumber: true,
        foldGutter: true,
        autocompletion: true,
        tabSize: 4,
        theme: "Github Light",
    });

    const themes: string[] = Object.values(THEMES).map(theme => theme.name);

    const { data } = useQuery({
        queryKey: ["function"],
        queryFn: async () => getFunctionById(fid as string),
    });

    return (
        <Root>
            <Toolbar>
                <LastUpdate>
                    <strong>Last Update:</strong> January 16, 2024 08:09 PM
                </LastUpdate>

                <Dropdown>
                    <Dropdown.Trigger>
                        <Settings>
                            <IoMdSettings size={16} />
                        </Settings>
                    </Dropdown.Trigger>

                    <Dropdown.Content sideOffset={5}>
                        <Dropdown.CheckboxItem
                            checked={editorConfig.lineNumber}
                            onCheckedChange={() =>
                                setEditorConfig(prevState => ({
                                    ...prevState,
                                    lineNumber: !prevState.lineNumber,
                                }))
                            }
                        >
                            Line Numbers
                            <Dropdown.ItemIndicator>
                                <MdCheck size={14} />
                            </Dropdown.ItemIndicator>
                        </Dropdown.CheckboxItem>

                        <Dropdown.CheckboxItem
                            checked={editorConfig.foldGutter}
                            onCheckedChange={() =>
                                setEditorConfig(prevState => ({
                                    ...prevState,
                                    foldGutter: !prevState.foldGutter,
                                }))
                            }
                        >
                            Fold Gutter
                            <Dropdown.ItemIndicator>
                                <MdCheck size={14} />
                            </Dropdown.ItemIndicator>
                        </Dropdown.CheckboxItem>

                        <Dropdown.CheckboxItem
                            checked={editorConfig.autocompletion}
                            onCheckedChange={() =>
                                setEditorConfig(prevState => ({
                                    ...prevState,
                                    autocompletion: !prevState.autocompletion,
                                }))
                            }
                        >
                            Autocompletions
                            <Dropdown.ItemIndicator>
                                <MdCheck size={14} />
                            </Dropdown.ItemIndicator>
                        </Dropdown.CheckboxItem>

                        <Dropdown.Sub>
                            <Dropdown.SubTrigger>
                                <MdOutlineKeyboardTab size={14} />
                                Tab size
                            </Dropdown.SubTrigger>
                            <Dropdown.SubContent sideOffset={2} alignOffset={-5}>
                                {[2, 3, 4, 5, 6].map((tabSize: number) => (
                                    <Dropdown.Item
                                        key={tabSize}
                                        data-selected={tabSize === editorConfig.tabSize}
                                        onClick={() =>
                                            setEditorConfig(prevState => ({
                                                ...prevState,
                                                tabSize,
                                            }))
                                        }
                                    >
                                        {tabSize}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.SubContent>
                        </Dropdown.Sub>

                        <Dropdown.Sub>
                            <Dropdown.SubTrigger>
                                <MdFormatColorFill size={14} />
                                Editor Theme
                            </Dropdown.SubTrigger>
                            <Dropdown.SubContent sideOffset={2} alignOffset={-5}>
                                {themes.map((theme: string) => (
                                    <Dropdown.Item
                                        key={theme}
                                        data-selected={theme === editorConfig.theme}
                                        onClick={() =>
                                            setEditorConfig(prevState => ({
                                                ...prevState,
                                                theme,
                                            }))
                                        }
                                    >
                                        {theme}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.SubContent>
                        </Dropdown.Sub>
                    </Dropdown.Content>
                </Dropdown>
            </Toolbar>

            <CodeMirror
                value={data?.sourceCode}
                width="100%"
                height="calc(100vh - 142px)"
                style={{ flexGrow: 1 }}
                theme={THEMES[editorConfig.theme as keyof typeof THEMES].theme}
                onChange={(code: string) => functionsCtx?.setCode(code)}
                basicSetup={{
                    foldGutter: editorConfig.foldGutter,
                    lineNumbers: editorConfig.lineNumber,
                    allowMultipleSelections: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: editorConfig.autocompletion,
                    crosshairCursor: true,
                    tabSize: editorConfig.tabSize,
                    history: true,
                    highlightActiveLine: true,
                    highlightActiveLineGutter: true,
                    highlightSelectionMatches: true,
                    highlightSpecialChars: true,
                    completionKeymap: true,
                }}
                extensions={[javascript({ jsx: false })]}
            />
        </Root>
    );
};

export { CodeEditor };
