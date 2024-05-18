import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Admin",
};

const Main = dynamic(() => import("./main"), {
    ssr: false,
});

export default function Page() {
    return <Main />;
}
