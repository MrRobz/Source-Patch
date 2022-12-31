import { ChangeRequest } from "data/change-request/types";

export const generatePrBody = (changeRequest: ChangeRequest): string => {
  let result = changeRequest?.desc ?? "";

  result += "\n \n";
  result += "#### Files updated \n";
  result += Object.keys(changeRequest.fileChanges)
    .map((name) => `* ${name}`)
    .join(" \n");

  result += "\n \n \n \n This PR was made with Source Patch extension";

  return result;
};
