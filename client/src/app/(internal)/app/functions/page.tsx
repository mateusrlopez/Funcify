import { Footer } from "@/app/(internal)/app/functions/Footer";
import { View } from "@/app/(internal)/app/functions/view";
import { Metadata } from "next";

import { Root } from "./Page.styles";

export const metadata: Metadata = {
    title: "Functions",
};

export default function Page() {
    return (
        <>
            <Root>
                <View />
            </Root>
            <Footer />
        </>
    );
}
