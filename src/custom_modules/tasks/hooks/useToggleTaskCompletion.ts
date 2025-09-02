import { useMutation } from "@apollo/client";
import { ITask } from "../interfaces";
import { completeTaskMutation } from "../graphql/mutations";
import { buildGetTaskByUserQueryVariables } from "./useGetTaskByUserQuery";
import { getTaskByUserQuery } from "../graphql/queries";

export const useToggleTaskCompletion = (args: {
  userId: string;
  userActiveTemplateId: string;
}) => {
  const { userId, userActiveTemplateId } = args;

  const [mutateFunction, result] = useMutation<{ completeTask: ITask }>(
    completeTaskMutation,
    {
      update(cache, { data }) {
        if (!data?.completeTask) return;

        const updatedTask = data.completeTask;

        const { date } = updatedTask;

        const variables = buildGetTaskByUserQueryVariables({
          dateString: date,
          userActiveTemplateId,
          userId,
        });

        const existing = cache.readQuery<{ getTasksByUser: ITask[] }>({
          query: getTaskByUserQuery,
          variables,
        });

        if (!existing) return;

        const updatedTasks = existing.getTasksByUser.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );

        cache.writeQuery({
          query: getTaskByUserQuery,
          variables,
          data: {
            getTasksByUser: updatedTasks,
          },
        });
      },
    }
  );

  const executeMutation = ({ userId, task }: { userId: string; task: ITask }) =>
    mutateFunction({
      variables: {
        task,
        userId,
        tenant: {
          tenantId: import.meta.env.VITE_APP_TENANT_ID,
        },
        completionParam: !task.isCompleted,
      },
    });

  return [executeMutation, result] as const;
};
