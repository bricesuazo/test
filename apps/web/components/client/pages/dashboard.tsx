"use client";

import {
  Container,
  Stack,
  Box,
  Flex,
  Title,
  Group,
  Skeleton,
  Text,
} from "@mantine/core";
import CreateElection from "@/components/client/modals/create-election";
import {
  type Vote,
  type Commissioner,
  type Election,
  type Voter,
} from "@eboto-mo/db/schema";
import DashboardCard from "@/components/server/components/dashboard-card";

export default function DashboardPageClient({
  commissioners,
  voters,
}: {
  commissioners: (Commissioner & { election: Election })[];
  voters: (Voter & {
    election: Election & { votes: Vote[] };
  })[];
}) {
  return (
    <Container p="md">
      <Stack spacing="lg">
        <Box>
          <Flex align="center" justify="space-between">
            <Title
              order={2}
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  fontSize: theme.fontSizes.xl,
                },
              })}
            >
              My elections
            </Title>

            <CreateElection />
          </Flex>
          <Text
            size="xs"
            color="grayText"
            sx={(theme) => ({
              marginBottom: theme.spacing.xs,
            })}
          >
            You can manage the elections below.
          </Text>
          <Group>
            {false ? (
              [...Array(3)].map((i) => (
                <Skeleton
                  key={i}
                  width={250}
                  height={332}
                  radius="md"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("xs")]: { width: "100%" },
                  })}
                />
              ))
            ) : commissioners.length === 0 ? (
              <Box h={72}>
                <Text>No elections found</Text>
              </Box>
            ) : (
              commissioners.map((commissioner) => (
                <DashboardCard
                  election={commissioner.election}
                  key={commissioner.id}
                  type="manage"
                />
              ))
            )}
          </Group>
        </Box>

        <Box>
          <Title
            order={2}
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                fontSize: theme.fontSizes.xl,
              },
            })}
          >
            My elections I can vote in
          </Title>
          <Text
            size="xs"
            color="grayText"
            sx={(theme) => ({
              marginBottom: theme.spacing.xs,
            })}
          >
            You can vote in the elections below. You can only vote once per
            election.
          </Text>

          <Group>
            {false ? (
              [...Array(3)].map((i) => (
                <Skeleton
                  key={i}
                  width={250}
                  height={352}
                  radius="md"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("xs")]: { width: "100%" },
                  })}
                />
              ))
            ) : voters.length === 0 ? (
              <Box h={72}>
                <Text>No vote elections found</Text>
              </Box>
            ) : (
              voters.map((voter) => (
                <DashboardCard
                  election={voter.election}
                  key={voter.id}
                  type="vote"
                  // vote={election.vote}
                />
              ))
            )}
          </Group>
        </Box>
      </Stack>
    </Container>
  );
}