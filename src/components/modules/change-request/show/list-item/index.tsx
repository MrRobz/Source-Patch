import { ChangeItem } from "data/change-request/types";
import { ReactElement } from "react";
import { ReactComponent as PencilIcon } from "assets/pencil.svg";
import { ReactComponent as TrashIcon } from "assets/trash.svg";
import { Link, useParams } from "react-router-dom";

interface Props {
  item: ChangeItem;
  position: number;
  onDelete: (item: ChangeItem) => void;
}

export const ListItem = ({ item, position, onDelete }: Props): ReactElement => {
  const { domain, id } = useParams() as { domain: string; id: string };

  return (
    <div className="group flex h-24 flex-shrink-0 border-t border-neutral-100">
      <div className="flex h-full w-6 items-center justify-center bg-neutral-200 font-bold text-neutral-800">
        {position}
      </div>
      <div className="ml-4 flex flex-1 items-center">{item.id}</div>
      <div className="invisible mr-4 flex basis-20 items-center gap-2 group-hover:visible">
        <Link to={`/domain/${domain}/change-request/${id}/change-item/${item.id}`}>
          <button className="flex h-8 w-8 items-center justify-center rounded-sm  border-neutral-200 hover:border">
            <PencilIcon className="h-3 w-3 text-neutral-600" />
          </button>
        </Link>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-sm  border-neutral-200 hover:border"
          onClick={() => onDelete(item)}
        >
          <TrashIcon className="h-3 w-3 text-neutral-600" />
        </button>
      </div>
    </div>
  );
};
