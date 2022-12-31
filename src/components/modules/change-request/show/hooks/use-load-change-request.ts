import { ChangeRequestApi } from "data/change-request/api";
import { ChangeRequest } from "data/change-request/types";
import { SetStateAction, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useLoadChangeRequest = (setChangeRequest: React.Dispatch<SetStateAction<ChangeRequest | undefined>>) => {
  const { domain, id } = useParams() as { domain: string; id: string };
  const navigate = useNavigate();

  useEffect(() => {
    ChangeRequestApi.get(Number(id))
      .then((item) => {
        if (!item) {
          navigate(`/domain/${domain}`);
        } else {
          setChangeRequest(item);
        }
      })
      .catch(() => {
        navigate(`/domain/${domain}`);
      });
  }, [id]);
};
