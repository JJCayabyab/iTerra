import Container from "@/app/component/Container";
import NewLocationForm from "@/app/component/NewLocationForm";
import BackButton from "@/app/component/ui/BackButton";


export default async function NewItenerary({ 
  params 
}: { 
  params: Promise<{ tripId: string }> 
}) {
  
    const { tripId } = await params;

    return (
        <Container>
            <BackButton href={`/trips/${tripId}`} />
            <NewLocationForm tripId={tripId} />
        </Container>
    );
}