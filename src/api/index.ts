import axios from "axios";

export const searchSkills = async (search: string) => {
  try {
    const params = new URLSearchParams({ q: search });

    const response = await axios.get(
      `${import.meta.env.VITE_APP_SEARCH_URL}?${params}`
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
