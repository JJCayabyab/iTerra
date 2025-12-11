import Container from "@/app/component/Container";
import NewLocationForm from "@/app/component/NewLocationForm";

export default async function NewItenerary({ params }: { params: { tripId: string } }) {

    const { tripId } = await params;

    return (
        <Container>
            <NewLocationForm tripId={tripId} />
        </Container>

    );
}
