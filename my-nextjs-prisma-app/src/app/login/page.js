"use client"
import { useState } from "react";
import { login } from "@/fetching/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const data = await login({ email, password });
            console.log(data);

            Swal.fire({
                icon: "success",
                title: "Login success",
                showConfirmButton: false,
                timer: 1500,
            });

            router.push("/");
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Login failed",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="shadow-xl max-w-xs w-full p-5 rounded-lg bg-white">
                <div className="flex items-center justify-center mb-5">
                    <img
                        src="/favicon.ico"
                        alt="Thinkpad Book Logo"
                        className="w-8 h-8 mr-2"
                    />
                    <h1 className="text-center text-2xl font-semibold">Thinkpad Book</h1>
                </div>
                <h1 className="text-center text-2xl font-semibold mb-5">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <label className="block font-semibold">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            name="email"
                            className="block rounded-lg w-full py-2 px-3 border border-gray-300 focus:outline-none focus:border-cyan-500"
                            required
                        />
                        <label className="block font-semibold">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="block rounded-lg w-full py-2 px-3 border border-gray-300 focus:outline-none focus:border-cyan-500"
                            type="password"
                            name="password"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600"
                        >
                            Sign In
                        </button>
                        <p className="text-center text-gray-600 mt-2">
                            Don't have an account?{" "}
                            <a href="/register" className="text-cyan-500 hover:underline">
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
