import { useAuthContext } from "./useAuthContext";
import { useApi } from "./useApi";
const apiBaseUrl = import.meta.env.VITE_API_URL;
export const useEditForm = () => {
  const { user } = useAuthContext();
  const { loading, error, makeApiCall } = useApi();

  const editForm = async (_id, reportStatus, notes) => {
    if (!user) return;

    try {
      const data = await makeApiCall(() =>
        fetch(`${apiBaseUrl}citizen/editForm/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwtToken}`,
          },
          body: JSON.stringify({ reportStatus, notes }),
        })
      );
      return data;
    } catch (err) {
      console.error("Failed to fetch forms", err);
    }
  };

  return { editForm, loading, error };
};
