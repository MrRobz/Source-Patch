import { ChangeRequestApi } from "data/change-request/api";
import { ChangeRequest } from "data/change-request/types";
import { useState, useEffect, ReactElement, MouseEvent, useReducer } from "react";
import { ReactComponent as EditIcon } from "assets/pencil.svg";
import { ReactComponent as TrashIcon } from "assets/trash.svg";
import { Link, useParams } from "react-router-dom";

interface Props {
  id: number;
}

export const ListItem = ({ id }: Props): ReactElement => {
  const { domain } = useParams() as { domain: string };
  const [changeRequest, setChangeRequest] = useState<ChangeRequest>();
  const [tempId, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const onDelete = async (e: MouseEvent<SVGElement>) => {
    e.preventDefault();

    await ChangeRequestApi.delete(domain, id);
    forceUpdate();
  };

  useEffect(() => {
    ChangeRequestApi.get(id)
      .then((item) => setChangeRequest(item ?? undefined))
      .catch(() => setChangeRequest(undefined));
  }, [id, tempId]);

  if (!changeRequest) {
    return <></>;
  }

  return (
    <Link to={`/domain/${domain}/change-request/${id}`}>
      <div className="flex h-16 w-full cursor-pointer items-center rounded border border-neutral-50 bg-white py-3 px-4 shadow-sm hover:border-neutral-200 hover:shadow-none">
        <div className="flex-1 text-lg font-semibold text-neutral-700">{changeRequest?.title}</div>

        <div className="basis-16">
          <div className="flex gap-5">
            <EditIcon width={12} className="text-neutral-600 hover:text-primary-600" />
            <TrashIcon width={12} className="text-neutral-600 hover:text-danger-500" onClick={onDelete} />
          </div>
        </div>
      </div>
    </Link>
  );
};
