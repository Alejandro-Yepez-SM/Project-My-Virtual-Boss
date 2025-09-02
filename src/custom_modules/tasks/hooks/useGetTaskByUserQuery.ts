import { useMemo } from "react";
import { ITask } from "../interfaces";
import { getTaskByUserQuery } from "../graphql/queries";
import { QueryHookOptions, useQuery } from "@apollo/client";

interface IUseGetTaskByUserQueryArgs {
  userId: string;
  userActiveTemplateId: string;
  dateString: string;
  disabled: boolean;
  queryOptions?: QueryHookOptions;
}

export const useGetTaskByUserQuery = (args: IUseGetTaskByUserQueryArgs) => {
  const { userId, userActiveTemplateId, dateString, disabled } = args;

  const query = useQuery<{ getTasksByUser: ITask[] }>(getTaskByUserQuery, {
    variables: buildGetTaskByUserQueryVariables({
      dateString,
      userId,
      userActiveTemplateId,
    }),
    skip: disabled,
    ...args.queryOptions,
  });

  const result = useMemo(() => {
    return {
      ...query,
      cacheKey: buildGetTaskByUserQueryVariables({
        dateString,
        userId,
        userActiveTemplateId,
      }),
    };
  }, [query, dateString, userId, userActiveTemplateId]);

  return result;
};

export const buildGetTaskByUserQueryVariables = ({
  dateString,
  userActiveTemplateId,
  userId,
}: {
  userId: string;
  userActiveTemplateId: string;
  dateString: string;
}) => ({
  tenant: {
    tenantId: import.meta.env.VITE_APP_TENANT_ID,
  },
  date: dateString,
  userId,
  userActiveTemplateId,
});
