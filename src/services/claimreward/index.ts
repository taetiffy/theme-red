import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";

export const claimreward = async (id: string): Promise<{ message: string }> => {
  const response = await fetchWithToken(
    getClientBaseUrl(),
    `/minigame/claim/${id}`,
    {
      method: "POST",
    },
    { noStore: true },
  );

  const data = await response.json();

  if (response.ok) return data;

  throw new Error(data.message);
};
