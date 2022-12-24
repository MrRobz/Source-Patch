import { ReactComponent as BackIcon } from "assets/arrow-left.svg";
import { H1 } from "components/ui/typography";
import { ChangeRequestApi } from "data/change-request/api";
import { ChangeRequest, ChangeItem } from "data/change-request/types";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as PlusIcon } from "assets/plus.svg";
import { ListItem } from "./list-item";

export const ChangeRequestShow = (): ReactElement => {
  const { domain, id } = useParams() as { domain: string; id: string };
  const navigate = useNavigate();
  const [changeRequest, setChangeRequest] = useState<ChangeRequest>();

  useEffect(() => {
    ChangeRequestApi.get(Number(id))
      .then((item) => setChangeRequest(item ?? undefined))
      .catch(() => setChangeRequest(undefined));
  }, [id]);

  const onCreateChange = async () => {
    if (changeRequest) {
      const changeRequestClone = { ...changeRequest };
      const changeItem = { id: Date.now() } as ChangeItem;
      changeRequestClone.changeItems.push(changeItem);

      await ChangeRequestApi.set(Number(id), changeRequestClone);
      setChangeRequest(changeRequestClone);

      navigate(`/domain/${domain}/change-request/${id}/change-item/${changeItem.id}`);
    }
  };

  const onDeleteChange = (item: ChangeItem) => {
    if (changeRequest) {
      const changeRequestClone = { ...changeRequest };

      changeRequestClone.changeItems = changeRequestClone.changeItems?.filter((o) => o.id !== item.id);

      ChangeRequestApi.set(Number(id), changeRequestClone).catch(() => {});
      setChangeRequest(changeRequestClone);
    }
  };

  return (
    <div className="w-ful h-full">
      <H1 className="flex items-center">
        <BackIcon className="mb-3 mr-2 cursor-pointer hover:text-primary-700" onClick={() => navigate(-1)} />
        {changeRequest?.title}
      </H1>
      <div className="ml-3 mt-3 text-neutral-600">
        {changeRequest?.desc ?? "No description added. Check to add one."}
      </div>

      <div className="mt-4">
        <div className="flex h-14 items-center justify-start rounded-t bg-white px-6">
          <span className="text-xs font-bold uppercase text-neutral-600">List of changes</span>
        </div>

        <div className="flex max-h-96 flex-col overflow-scroll bg-white">
          {changeRequest?.changeItems.map((item, idx) => (
            <ListItem key={item.id} item={item} position={idx + 1} onDelete={onDeleteChange} />
          ))}
        </div>

        <div
          className="group flex h-16 cursor-pointer items-center justify-start rounded-b bg-primary-100 px-6"
          onClick={onCreateChange}
        >
          <div className="flex items-center justify-start gap-3">
            <div className="rounded-full bg-primary-200 group-hover:bg-primary-500">
              <PlusIcon className="text-primary-600 group-hover:text-white" />
            </div>
            <span className="text-sm font-bold text-primary-600">Add Change</span>
          </div>
        </div>
      </div>
    </div>
  );
};
