import { ChangeRequestApi } from "data/change-request/api";
import { ChangeRequest } from "data/change-request/types";
import { SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";

export const useLoadChangeRequest = (setChangeRequest: React.Dispatch<SetStateAction<ChangeRequest | undefined>>) => {
  const { id } = useParams() as { domain: string; id: string };

  useEffect(() => {
    ChangeRequestApi.get(Number(id))
      .then((item) => setChangeRequest(item ?? undefined))
      .catch(() => setChangeRequest(undefined));
  }, [id]);
};
