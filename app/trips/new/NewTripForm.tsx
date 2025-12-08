import Button from "@/app/component/ui/button"
export default function NewTripForm() {
    return (
        <>
            <form className="space-y-6">
                <div >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name</label>
                    <input type="text" name="title" className="w-full border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-primary"
                        placeholder="(e.g., Brazil Trip, Hawaiian Vacation, Tokyo Trip)" required />
                </div>
                <div >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea name="description" className="w-full border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-primary"
                        placeholder="Trip description" required />
                </div>
                <div className=" space-y-4 gap-4 md:flex">
                    <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <input type="date" name="startDate" className="w-full border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-primary"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input type="date" name="endDate" className="w-full border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-primary"
                        />
                    </div>
                </div>
                <Button btnName="Create Trip" className="w-full text-lg" type="submit" />
            </form>
        </>
    )
}