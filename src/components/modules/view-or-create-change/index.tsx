import { ReactElement, ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as LogoIcon } from "assets/logo.svg";
import { ReactComponent as BookIcon } from "assets/book.svg";
import { ReactComponent as ConfigureIcon } from "assets/configure.svg";

export const ViewOrCreateChangePage = (): ReactElement => {
  const { domain } = useParams() as { domain: string };

  return (
    <div>
      <div className="flex flex-col gap-4 py-4">
        <Card
          title={"Create a text change request"}
          desc={`Requests changes to texts in "${domain}". A github pull request will be made with your changes.`}
          icon={<LogoIcon className="text-primary-500" />}
          to="/domain/:domain/change-request/new"
        />

        <Card
          title={"View past changes given"}
          desc={`View previously requested changes for "${domain}" and their status.`}
          icon={<BookIcon className="text-secondary-600" />}
          to="/domain/:domain/change-request-list"
        />

        <Card
          title={"Configure"}
          desc={`Configure settings for "${domain}".`}
          icon={<ConfigureIcon className="text-neutral-600" />}
          to="/configure"
        />
      </div>
    </div>
  );
};

const Card = ({ icon, title, desc, to }: { icon: ReactNode; title: ReactNode; desc: ReactNode; to: string }) => {
  return (
    <Link to={to}>
      <div className="cursor-pointer rounded border border-neutral-50 bg-white p-6 shadow-sm hover:border-neutral-200 hover:shadow-none">
        <div className="flex gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded bg-primary-100">{icon}</div>
          <div className="flex flex-col justify-center gap-1">
            <div className="text-base font-semibold text-neutral-900">{title}</div>
            <div className="text-sm text-neutral-600">{desc}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
