import { signOut, useSession } from "next-auth/react";
import React from "react";

const useAccount = () => {
  const { data: session, status, update } = useSession({ required: true });
  const purgeSession = React.useCallback(async () => {
    await signOut({ callbackUrl: "/" });
  }, []);

  const values = React.useMemo(
    () => ({ session, status, update, purgeSession, signOut: purgeSession }),
    [session, status, update, purgeSession],
  );

  return values;
};

export default useAccount;
