import DashboardVoter from "@/components/client/pages/dashboard-voter";
import { clerkClient } from "@clerk/nextjs";
import { db } from "@eboto-mo/db";
import { isNull } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Voters",
};

export default async function Page({
  params: { electionDashboardSlug },
}: {
  params: { electionDashboardSlug: string };
}) {
  const election = await db.query.elections.findFirst({
    where: (election, { eq, and }) =>
      and(
        eq(election.slug, electionDashboardSlug),
        isNull(election.deleted_at),
      ),
    with: {
      voter_fields: true,
    },
  });

  if (!election) notFound();

  // const voters = await electionCaller.getVotersByElectionId({
  //   election_id: election.id,
  // });

  const votersFromDB = await db.query.voters.findMany({
    where: (voter, { eq, and }) =>
      and(eq(voter.election_id, election.id), isNull(voter.deleted_at)),
    with: {
      user: true,
      votes: {
        limit: 1,
      },
    },
  });

  const users = await clerkClient.users.getUserList({
    userId: votersFromDB.map((voter) => voter.user_id),
  });

  const voters = votersFromDB.map((voter) => ({
    id: voter.id,
    email:
      users.find((user) => user.id === voter.user_id)?.emailAddresses[0]
        ?.emailAddress ?? "",
    account_status: "ACCEPTED",
    created_at: voter.created_at,
    has_voted: voter.votes.length > 0,
    field: voter.field,
  }));

  return <DashboardVoter election={election} voters={voters} data-superjson />;
}