import { Root, StatusPanel, Tag, Text, LinkToLogin, Creators } from "@/app/(external)/styles";
import Link from "next/link";
import { ReactNode } from "react";

export default function Home(): ReactNode {
    const now = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
    });

    return (
        <Root>
            <StatusPanel>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "10px",
                    }}
                >
                    <Tag>PRODUCTION</Tag>
                    <Text>{now}</Text>
                </div>
                <Text>The server is running successfully</Text>
            </StatusPanel>
            <LinkToLogin href="/admin">Click here to access the platform</LinkToLogin>
            <Creators>
                Maintened by{" "}
                <Link href="https://github.com/anthonyvii27" style={{ textDecoration: "none" }}>
                    @anthonyvii27
                </Link>{" "}
                and{" "}
                <Link href="https://github.com/mateusrlopez" style={{ textDecoration: "none" }}>
                    @mateusrlopez
                </Link>
            </Creators>
        </Root>
    );
}
