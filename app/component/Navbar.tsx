
import Image from "next/image";
import Link from "next/link";
import SignInButtons from "./SignInButtons";


export default function Navbar() {

    return (
        <>
            <nav className="bg-white shadow-md py-3 top-0 sticky">
                <div className="container mx-auto flex justify-between items-center px-6 lg:px-12">
                    <Link href={'/'} className="flex items-center">
                        <Image src={"/iterra.svg"} width={150} height={40} alt="Iterra Logo" />
                    </Link>

                    <div className="hidden md:flex items-center space-x-4 font-medium">
                        <Link href={"/trips"} className="hover:text-blue-900 ">
                            Trips
                        </Link>
                        <Link href={"/globe"} className="hover:text-blue-900" >
                            3D Globe
                        </Link>
                        
                  
                        <SignInButtons /> 
                        
                    </div>
                </div>
            </nav>
        </>
    )
}