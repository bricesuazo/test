"use client";

import {
  Button,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  Flex,
  Alert,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { hasLength, useForm } from "@mantine/form";
import {
  IconCalendar,
  IconClock,
  IconLetterCase,
  IconTemplate,
} from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";

export default function CreateElection() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      slug: "",
      date: [null, null] as [Date | null, Date | null],
      voting_start: "7",
      voting_end: "19",
      template: "0",
    },
    validateInputOnBlur: true,
    validate: {
      name: hasLength(
        { min: 3 },
        "Election name must be at least 3 characters"
      ),
      slug: (value) => {
        if (!value) {
          return "Please enter an election slug";
        }
        if (!/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(value)) {
          return "Election slug must be alphanumeric and can contain dashes";
        }
        if (value.length < 3 || value.length > 24) {
          return "Election slug must be between 3 and 24 characters";
        }
      },

      date: (value) => {
        if (!value[0] || !value[1]) {
          return "Please select a date range";
        }
      },
    },
  });
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<Text>Create election</Text>}
        closeOnClickOutside={false}
      >
        <form
        // onSubmit={form.onSubmit((value) =>
        //   createElectionMutation.mutate({
        //     name: value.name,
        //     slug: value.slug,
        //     start_date:
        //       value.date[0] ||
        //       new Date(new Date().setDate(new Date().getDate() + 1)),
        //     end_date:
        //       value.date[1] ||
        //       new Date(new Date().setDate(new Date().getDate() + 8)),
        //     voting_start: parseInt(value.voting_start),
        //     voting_end: parseInt(value.voting_end),
        //     template: parseInt(value.template),
        //   })
        // )}
        >
          <Stack spacing="sm">
            <TextInput
              data-autofocus
              label="Election name"
              withAsterisk
              required
              placeholder="Enter election name"
              {...form.getInputProps("name")}
              icon={<IconLetterCase size="1rem" />}
              // disabled={createElectionMutation.isLoading}
            />

            <TextInput
              label="Election slug"
              description={
                <>
                  This will be used as the URL for your election
                  <br />
                  eboto-mo.com/{form.values.slug || "election-slug"}
                </>
              }
              // disabled={createElectionMutation.isLoading}
              withAsterisk
              required
              placeholder="Enter election slug"
              {...form.getInputProps("slug")}
              icon={<IconLetterCase size="1rem" />}
              // error={
              //   form.errors.slug ||
              //   (createElectionMutation.error?.data?.code === "CONFLICT" &&
              //     createElectionMutation.error?.message)
              // }
            />

            <DatePickerInput
              type="range"
              label="Election start and end date"
              placeholder="Enter election date"
              description="You can't change the election date once the election has started."
              required
              withAsterisk
              popoverProps={{
                withinPortal: true,
                position: "bottom",
              }}
              minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
              firstDayOfWeek={0}
              {...form.getInputProps("date")}
              icon={<IconCalendar size="1rem" />}
              // disabled={createElectionMutation.isLoading}
            />
            <Stack spacing={8}>
              <Flex columnGap="sm">
                <Select
                  label="Voting hour start"
                  description="You can't change voting hour start once the election is ongoing."
                  withAsterisk
                  withinPortal
                  required
                  // {...form.getInputProps("voting_start")}
                  data={[...Array(24)].map((_, i) => ({
                    // label: convertNumberToHour(i),
                    label: i.toString(),
                    value: i.toString(),
                  }))}
                  icon={<IconClock size="1rem" />}
                  // disabled={createElectionMutation.isLoading}
                />
                <Select
                  description="You can't change voting hour end once the election is ongoing."
                  label="Voting hour start"
                  withAsterisk
                  withinPortal
                  required
                  {...form.getInputProps("voting_end")}
                  data={[...Array(24)].map((_, i) => ({
                    // label: convertNumberToHour(i),
                    label: i.toString(),
                    value: i.toString(),
                    disabled: i <= parseInt(form.values.voting_start),
                  }))}
                  icon={<IconClock size="1rem" />}
                  // disabled={createElectionMutation.isLoading}
                />
              </Flex>
              <Text
                align="center"
                size="sm"
                // opacity={createElectionMutation.isLoading ? 0.5 : 1}
              >
                {parseInt(form.values.voting_end) -
                  parseInt(form.values.voting_start)}{" "}
                hour
                {parseInt(form.values.voting_end) -
                  parseInt(form.values.voting_start) >
                1
                  ? "s"
                  : ""}
              </Text>
            </Stack>
            <Select
              label="Election template"
              description="Select a template for your election"
              withAsterisk
              required
              withinPortal
              {...form.getInputProps("template")}
              // data={positionTemplate
              //   .sort((a, b) => a.id - b.id)
              //   .map((position) => ({
              //     label: position.org,
              //     value: position.id.toString(),
              //     group: position.college,
              //   }))}
              data={[{ label: "test", value: "0" }]}
              nothingFound="No position template found"
              icon={<IconTemplate size="1rem" />}
              searchable
              // disabled={createElectionMutation.isLoading}
            />

            {/* {createElectionMutation.isError &&
              createElectionMutation.error?.data?.code !== "CONFLICT" && (
                <Alert
                  icon={<IconAlertCircle size="1rem" />}
                  title="Error"
                  color="red"
                >
                  {createElectionMutation.error?.message}
                </Alert>
              )} */}

            <Group position="right" spacing="xs">
              <Button
                variant="default"
                mr={2}
                onClick={close}
                // disabled={createElectionMutation.isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.isValid()}
                // loading={createElectionMutation.isLoading}
              >
                Create
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Button onClick={open}>Create Election</Button>
    </>
  );
}