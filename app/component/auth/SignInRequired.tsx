import SignInButtons from "./SignInButtons";

export default function SignInRequired() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-50 p-6">

            <div className="text-center p-8 bg-white border border-gray-200 rounded-xl shadow-lg max-w-lg">

                <svg
                    className="mx-auto h-12 w-12 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>

                {/*  Message */}
                <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                    Access Restricted
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                    Please sign in to view and manage your travel plans
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center space-x-3">
                    <SignInButtons />
                </div>

            </div>

        </div>
    );
}