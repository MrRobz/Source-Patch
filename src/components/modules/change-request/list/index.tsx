import { DomainConfigApi } from "data/domain-config/api";
import { useState, useEffect, ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { H1 } from "components/ui/typography";
import { ReactComponent as BackIcon } from "assets/arrow-left.svg";
import { ListItem } from "./list-item";

export const ChangeRequestListPage = (): ReactElement => {
  const { domain } = useParams() as { domain: string };
  const [changeRequestIds, setChangeRequestIds] = useState<number[]>([]);

  useEffect(() => {
    DomainConfigApi.get(domain)
      .then((config) => {
        setChangeRequestIds(config?.changeRequestIds ?? []);
      })
      .catch(() => {});
  }, [domain]);

  return (
    <div className="w-ful h-full">
      <H1 className="flex items-center">
        <Link to={`/domain/${domain}`}>
          <BackIcon className="mb-3 mr-2 hover:text-primary-700" />
        </Link>
        Change requests given
      </H1>
      <div className="mt-3 text-neutral-600">View and edit your change requests or check their merge status.</div>

      <div className="mt-4 flex h-96 flex-col gap-3 overflow-auto">
        {[...changeRequestIds].reverse().map((id) => (
          <ListItem key={id} id={id} />
        ))}
      </div>
    </div>
  );
};
