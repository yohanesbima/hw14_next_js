"use client";
import { useState } from "react";
import { register } from "@/fetching/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await register({ name, email, password });
            console.log(data);

            Swal.fire({
                icon: "success",
                title: "Register success, now login into your account",
                showConfirmButton: false,
                timer: 4500,
            });
            router.push("/login");
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Register failed",
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
                <h1 className="text-center text-2xl font-semibold mb-5">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <label className="block font-semibold">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            className="block rounded-lg w-full py-2 px-3 border border-gray-300 focus:outline-none focus:border-cyan-500"
                            required
                        />
                        <label className="block font-semibold">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
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
                            Register
                        </button>
                        <p className="text-center text-gray-600 mt-2">
                            Already have an account?{" "}
                            <a href="/login" className="text-cyan-500 hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
