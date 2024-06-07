"use client"

import { NextPage } from "next"
import ImageCompressor from "@/component/ImageCompressor"

const Home: NextPage = () => {

    return (
        <main className="w-full min-h-[100svh] flex flex-col items-center">
            <div className="mt-32 mb-10 max-sm:hidden">
            </div>
            <div className="max-sm:h-20" />
            <div className="max-w-96 w-[90%] h-[570px] max-sm:h-[85svh] shadow-xl rounded-xl border-4 border-gray-200/50">
                <ImageCompressor />
            </div>
        </main>
    )
}
export default Home
