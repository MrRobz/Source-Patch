import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as LogoIcon } from "assets/logo.svg";
import { ReactComponent as BookIcon } from "assets/book.svg";
import { ReactComponent as ConfigureIcon } from "assets/configure.svg";
import { DomainConfigApi } from "data/domain-config/api";
import { ChangeRequestApi } from "data/change-request/api";
import { useClearLastViewedStore } from "utils/hooks";

export const ViewOrCreateChangePage = (): ReactElement => {
  const { domain } = useParams() as { domain: string };
  const navigate = useNavigate();

  const onCreateNewChangeRequest = async () => {
    const config = await DomainConfigApi.get(domain);

    if (config) {
      const timestampId = new Date().valueOf();

      const updatedChangeRequestIds = [...config.changeRequestIds, timestampId];

      await DomainConfigApi.set(domain, {
        ...config,
        changeRequestIds: updatedChangeRequestIds,
      });

      await ChangeRequestApi.create(timestampId);

      navigate(`/domain/${domain}/change-request/${timestampId}`);
    }
  };

  useClearLastViewedStore();

  return (
    <div>
      <div className="flex flex-col gap-4 py-4">
        <Card
          title={"Create a text change request"}
          desc={`Requests changes to texts in "${domain}". A github pull request will be made with your changes.`}
          icon={<LogoIcon className="text-primary-500" />}
          onClick={onCreateNewChangeRequest}
        />

        <Link to={`/domain/${domain}/change-request-list`}>
          <Card
            title={"View past changes given"}
            desc={`View previously requested changes for "${domain}" and their status.`}
            icon={<BookIcon className="text-secondary-600" />}
          />
        </Link>

        <Link to="/configure">
          <Card
            title={"Configure"}
            desc={`Configure settings for "${domain}".`}
            icon={<ConfigureIcon className="text-neutral-600" />}
          />
        </Link>
      </div>
    </div>
  );
};

const Card = ({
  icon,
  title,
  desc,
  ...rest
}: { icon: ReactNode; title: ReactNode; desc: ReactNode } & ButtonHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="cursor-pointer rounded border border-neutral-50 bg-white p-6 shadow-sm hover:border-neutral-200 hover:shadow-none"
      {...rest}
    >
      <div className="flex gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded bg-primary-100">{icon}</div>
        <div className="flex flex-col justify-center gap-1">
          <div className="text-base font-semibold text-neutral-900">{title}</div>
          <div className="text-sm text-neutral-600">{desc}</div>
        </div>
      </div>
    </div>
  );
};
