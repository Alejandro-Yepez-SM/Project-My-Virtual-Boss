import { gql } from "@apollo/client";

export const getTaskByUserQuery = gql`
  query GetTasksByUser(
    $tenant: TenantData!
    $userId: String!
    $userActiveTemplateId: ID!
    $date: AWSDate
  ) {
    getTasksByUser(
      tenant: $tenant
      userId: $userId
      userActiveTemplateId: $userActiveTemplateId
      date: $date
    ) {
      category
      description
      id
      date
      isCompleted
      priority
      title
      startTime
      endTime
      source
    }
  }
`;

export const getTaskQuery = gql`
  query getTask($userId: String!, $taskId: ID!) {
    getSingleTask(userId: $userId, taskId: $taskId) {
      category
      description
      id
      date
      isCompleted
      priority
      title
      startTime
      endTime
      source
    }
  }
`;
