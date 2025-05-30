import { useAuthContext } from "./useAuthContext";
import { useApi } from "./useApi";
const apiBaseUrl = import.meta.env.VITE_API_URL;

export const useSubmitForm = () => {
  const { user } = useAuthContext();
  const { loading, error, makeApiCall } = useApi();

  const submitForm = async ({ location, problemType, receiveNotification, additionalDetails }) => {
    console.log(location, problemType, receiveNotification, additionalDetails);

    if (!user) return;

    try {
      const response = await makeApiCall(() =>
        fetch(`${apiBaseUrl}citizen/submit/${user.user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwtToken}`,
          },
          body: JSON.stringify({ location, problemType, receiveNotification, note: additionalDetails }),
        })
      );

      return response;
    } catch (err) {
      console.error("Form Submit Failed:", err.message);
    }
  };

  return { submitForm, loading, error };
};