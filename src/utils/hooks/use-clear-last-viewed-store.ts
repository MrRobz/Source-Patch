import { useEffect } from "react";
import { clearLastViewedDomainChangeId } from "utils/last-viewed-items";

export const useClearLastViewedStore = () => {
  useEffect(() => {
    clearLastViewedDomainChangeId();
  }, []);
};
