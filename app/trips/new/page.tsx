import Container from "@/app/component/Container";
import { auth } from "@/auth";
import SignInRequired from "@/app/component/auth/SignInRequired";
import NewTripForm from "./NewTripForm";
export default async function NewTrip() {

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
                {/* HEADER */}
                <div
                    data-slot="card"
                    className=
                    "mx-auto max-w-xl bg-white text-card-foreground flex flex-col gap-6 rounded-xl  py-6 px-4 shadow-lg"
                >
                    <h1 className="text-2xl font-medium">Add New Trip</h1>
                    <NewTripForm />
                </div>

            </Container>
        </>
    )
}