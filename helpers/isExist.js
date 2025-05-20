import { access } from "fs/promises";

export const isExist = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};
