import { auth } from "@/auth"
import SignInRequired from "../component/auth/SignInRequired"
import Button from "../component/ui/button"
import Container from "../component/Container"
import Link from "next/link"


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
            <Container>
                <div>
                    <h1>Dashboard</h1>
                    <Link href={"/trips/new"}>
                        <Button btnName="Create Trip" />
                    </Link>

                </div>
            </Container>

        </>
    )
}