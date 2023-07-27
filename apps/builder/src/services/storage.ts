import { agentAuthed } from './agent';

export async function getStorageUpload() {
  let { data } = await agentAuthed.get<{
    presignedURL: string;
    mediaURL: string;
  }>('/storage/upload');
  return data;
}
