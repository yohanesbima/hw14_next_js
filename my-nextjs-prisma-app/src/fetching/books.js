import BASE_URL from "../app/lib/baseUrl";

export const findBooks = async () => {

    try {

        const result = await fetch(`${BASE_URL}/books`, {
            method: "GET",
        })

        const data = await result.json();

        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err.message || "Internal Server Error")
    }
}

export const findBookById = async (id) => {
    try {
        const result = await fetch(`${BASE_URL}/books/${id}`, {
            method: "GET",
        });

        const data = await result.json();

        return data;
    } catch (err) {
        console.error(err);
        throw new Error(err.message || "Internal Server Error");
    }
};