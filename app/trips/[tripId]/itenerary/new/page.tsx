import Container from "@/app/component/Container";
import NewLocationForm from "@/app/component/NewLocationForm";
import BackButton from "@/app/component/ui/BackButton";

export default  function NewItenerary({ params }: { params: { tripId: string } }) {

    const { tripId } =  params;

    return (
        <Container>
            <BackButton href={`/trips/${tripId}`} />
            <NewLocationForm tripId={tripId} />
        </Container>

    );
}
