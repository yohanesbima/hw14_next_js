
import prisma from "@/app/lib/prisma";
import Link from "next/link"

async function getData(id) {

    try {

        const foundData = await prisma.book.findUnique({
            where: {
                id
            }
        })

        if (!foundData) {
            throw { name: "ErrorNotFound", message: "Error Not Found" }
        }

        return foundData
    } catch (err) {
        throw new Error(err.message || "Internal Server Error")
    }
}
export default async function BookDetail({ params }) {
    const { id } = params;
    const data = await getData(+id);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
            <div className="shadow-xl w-full max-w-2xl bg-white p-5 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                        <img
                            src={data.image || '/placeholder-image.jpg'}
                            alt={data.title}
                            className="w-full h-auto mb-4 rounded-lg"
                        />
                    </div>
                    <div className="md:w-2/3 md:pl-4">
                        <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
                        <p className="text-gray-600 mb-2">Author: {data.author}</p>
                        <p className="text-gray-600 mb-2">Publisher: {data.publisher}</p>
                        <p className="text-gray-600 mb-2">Year: {data.year}</p>
                        <p className="text-gray-600 mb-2">Pages: {data.pages}</p>
                        <p className="text-gray-600 mb-2">ID: {data.id}</p>
                    </div>
                </div>
                <Link href="/" className="block text-center mt-4 rounded-full bg-blue-500 text-white py-2 hover:bg-blue-700">
                    BACK TO HOME
                </Link>

            </div>
        </div>
    );
}
