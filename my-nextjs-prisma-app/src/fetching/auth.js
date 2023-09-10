import BASE_URL from "../app/lib/baseUrl";

export const login = async (params) => {

    try {

        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            body: JSON.stringify(params)
        })

        if (!response.ok) {
            // Check if the response is not OK (e.g., 404 Not Found for user not found)
            const errorData = await response.json();
            throw new Error(errorData.message, 'This is error message' || "Internal Server Error");
        }

        const data = await response.json();

        return data;
    } catch (err) {
        throw new Error(err.message, 'This is error message' || "Internal Server Error");
    }
};

export const register = async (params) => {

    try {

        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            body: JSON.stringify(params)
        })

        if (!response.ok) {
            // Check if the response is not OK (e.g., 404 Not Found for user not found)
            const errorData = await response.json();
            throw new Error(errorData.message, 'This is error message' || "Internal Server Error");
        }

        const data = await response.json();

        return data;
    } catch (err) {
        throw new Error(err.message, 'This is error message' || "Internal Server Error");
    }
};



