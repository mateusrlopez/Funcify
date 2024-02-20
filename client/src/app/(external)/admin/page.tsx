import { Panel } from "./_components/Panel";
import { Login } from "./_views/Login";
import { Setup } from "./_views/Setup";

export default async function Page() {
    // const { done: setupIsDone }: SetupIsDoneResponse = await verifyIfSetupWasDone();

    await new Promise(resolve => {
        setTimeout(resolve, 3000);
    });

    const setupIsDone = await new Promise(resolve => {
        resolve(true);
    });

    return (
        <Panel>
            {setupIsDone ? <Login /> : <Setup />}
            {/* <FirstAccess /> */}
            {/* <ForgotPassword /> */}
            {/* <ResetPassword /> */}
        </Panel>
    );
}
