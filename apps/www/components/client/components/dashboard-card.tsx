"use client";

import classes from "@/styles/DashboardCard.module.css";
import type { Election, Vote } from "@eboto-mo/db/schema";
import { ActionIcon, Box, Text, UnstyledButton, rem } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import Moment from "react-moment";

const DashboardCard = ({
  election,
  type,
  vote,
}: {
  election: Election;
  type: "vote" | "manage";
  vote?: Vote[];
}) => {
  const { hovered, ref } = useHover();
  return (
    <Box ref={ref} className={classes.container} w={{ sm: "100%" }}>
      {type === "vote" && (
        <ActionIcon
          variant="outline"
          disabled
          style={(theme) => ({
            position: "absolute",
            top: "-" + theme.spacing.sm,
            right: "-" + theme.spacing.sm,
            width: 32,
            height: 32,
            borderRadius: "100%",
            opacity: hovered ? 1 : 0,
            transition: "opacity 100ms ease-in-out",
            pointerEvents: "none",
          })}
        >
          <IconExternalLink size={rem(20)} />
        </ActionIcon>
      )}
      <UnstyledButton
        component={Link}
        href={
          type === "vote" ? `/${election.slug}` : `/dashboard/${election.slug}`
        }
        key={election.id}
        target={type === "vote" ? "_blank" : undefined}
        style={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: theme.spacing.xs,
          width: 250,
          height: type === "vote" ? 352 : 332,
          borderRadius: theme.radius.md,
          padding: theme.spacing.sm,
          // backgroundColor:
          //   theme.colorScheme === "dark"
          //     ? theme.colors.dark[6]
          //     : theme.colors.gray[1],

          // [theme.fn.smallerThan("xs")]: { width: "100%" },

          "&:focus": {
            boxShadow: `0 0 0 2px ${theme.primaryColor}`,
          },

          // "&:hover": {
          //   backgroundColor:
          //     theme.colorScheme === "dark"
          //       ? theme.colors.dark[5]
          //       : theme.colors.gray[2],
          // },
        })}
      >
        {election.logo && (
          <Box
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1/1",
            }}
          >
            <Image
              src={election.logo}
              alt={election.name + " logo"}
              fill
              sizes="100%"
              style={{
                objectFit: "contain",
              }}
              priority
              blurDataURL={election.logo}
            />
          </Box>
        )}
        <Box w="100%">
          <Text fw="bold" lineClamp={1} ta="center">
            {election.name}
          </Text>
          <Text size="sm" color="GrayText" lineClamp={1} ta="center">
            <Moment format="MMM D, YYYY">{election.start_date}</Moment>
            {" - "}
            <Moment format="MMM D, YYYY">{election.end_date}</Moment>
          </Text>
          <Text size="sm" lineClamp={1} color="dimmed" ta="center">
            Open from <Moment format="H A">{election.start_date}</Moment> to{" "}
            <Moment format="H A">{election.end_date}</Moment>
          </Text>

          <Text size="sm" lineClamp={1} color="dimmed" ta="center">
            Publicity:{" "}
            {election.publicity.charAt(0) +
              election.publicity.slice(1).toLowerCase()}
          </Text>

          {type === "vote" && (
            <Text size="sm" color="dimmed" lineClamp={1} ta="center">
              {vote?.length ? "You have voted" : "You have not voted"}
            </Text>
          )}
        </Box>
      </UnstyledButton>
    </Box>
  );
};

export default DashboardCard;