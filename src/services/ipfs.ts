import { agentNext } from "./agent";

export async function uploadFile(formData: FormData) {
  // return fetch('/api/ipfs', { method: 'POST', body: formData });

  let { data } = await agentNext.post<{ cid: string }>("/api/ipfs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
