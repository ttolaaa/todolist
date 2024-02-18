import axios from "axios";

const BASE_URL = "https://thingproxy.freeboard.io/fetch/https://nanameue-front-end-candidate-test.vercel.app/api/tola/todos";

export const fetchTodos = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error : any) {
        throw new Error(error?.response?.data?.error || "Error fetching todos");
    }
};

export const createTodo = async (text: string) => {
    try {
        const response = await axios.post(BASE_URL + "/create", { text });
        return response.data;
    } catch (error : any) {
        throw new Error(error?.response?.data?.error || "Error creating todo");
    }
};

export const toggleTodo = async (todoId: string) => {
    try {
        const response = await axios.put(BASE_URL + `/${todoId}/toggle`);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.error || "Error toggling todo");
    }
};

export const deleteTodo = async (todoId: string) => {
    try {
        const response = await axios.delete(BASE_URL + `/${todoId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.error || "Error deleting todo");
    }
};
