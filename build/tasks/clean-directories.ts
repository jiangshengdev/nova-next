import { deleteAsync } from 'del';

export default async function cleanDirectories() {
  return await deleteAsync(['dist', 'temp']);
}
