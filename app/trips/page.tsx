import { auth } from "@/auth"
import SignInRequired from "../component/auth/SignInRequired"
export default async function TripsPage() {
    const session = await auth()
    if (!session) {
        return (
            <>
                <SignInRequired />
            </>
        )
    }
    return (
        <>
            <div className="">
                <div>
                    <h1>Dashboard</h1>
                 
                </div>
            </div>
        </>
    )
}