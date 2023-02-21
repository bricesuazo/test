import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  ModalFooter,
  useRadioGroup,
  Text,
  Button,
  Box,
  useRadio,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { useEffect } from "react";
import { positionTemplate } from "../../constants";
import { useRouter } from "next/router";
import { convertNumberToHour } from "../../utils/convertNumberToHour";

const CreateElectionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    !isOpen && reset();
  }, [isOpen, reset]);

  useEffect(() => {
    setValue("template", "0");
  }, [isOpen, setValue]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "template",
    defaultValue: "0",
    onChange: (value) => {
      setValue("template", value);
    },
    value: watch("template") as string,
  });
  const group = getRootProps();

  const createElectionMutation = api.election.create.useMutation();

  function ElectionTemplateCard({
    children,
    ...props
  }: {
    children: React.ReactNode;
  }) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();
    return (
      <Box as="label">
        <input {...input} disabled={createElectionMutation.isLoading} />
        <Box
          {...checkbox}
          cursor={createElectionMutation.isLoading ? "not-allowed" : "pointer"}
          opacity={createElectionMutation.isLoading ? 0.5 : 1}
          borderWidth="1px"
          borderRadius="md"
          _checked={{
            bg: "teal.600",
            color: "white",
            borderColor: "teal.600",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={5}
          py={3}
        >
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Modal
      isOpen={isOpen || createElectionMutation.isLoading}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create election</ModalHeader>
        <ModalCloseButton disabled={createElectionMutation.isLoading} />
        <form
          onSubmit={handleSubmit(async (data) => {
            const election = await createElectionMutation.mutateAsync({
              name: data.name as string,
              start_date: data.start_date as Date,
              end_date: data.end_date as Date,
              slug: data.slug as string,
              voting_start: data.voting_start as number,
              voting_end: data.voting_end as number,
              template: parseInt(data.template as string),
            });
            onClose();
            await router.push(`/dashboard/${election.slug}`);
          })}
        >
          <ModalBody>
            <Stack>
              <FormControl
                isInvalid={!!errors.name}
                isRequired
                isDisabled={createElectionMutation.isLoading}
              >
                <FormLabel>Election name</FormLabel>
                <Input
                  placeholder="Enter election name"
                  type="text"
                  {...register("name", {
                    required: "This is required.",
                  })}
                />

                {errors.name && (
                  <FormErrorMessage>
                    {errors.name.message?.toString()}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={!!errors.slug}
                isRequired
                isDisabled={createElectionMutation.isLoading}
              >
                <FormLabel>Election slug</FormLabel>
                <Input
                  placeholder="Enter election slug"
                  type="text"
                  {...register("slug", {
                    required: "This is required.",
                  })}
                />

                {errors.slug && (
                  <FormErrorMessage>
                    {errors.slug.message?.toString()}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Stack direction={["column", "row"]}>
                <FormControl
                  isInvalid={!!errors.start_date}
                  isRequired
                  isDisabled={createElectionMutation.isLoading}
                >
                  <FormLabel>Voting start date</FormLabel>
                  <Input
                    type="date"
                    {...register("start_date", {
                      valueAsDate: true,
                      required: "This is required.",
                    })}
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />

                  {errors.start_date && (
                    <FormErrorMessage>
                      {errors.start_date.message?.toString()}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={!!errors.end_date}
                  isRequired
                  isDisabled={createElectionMutation.isLoading}
                >
                  <FormLabel>Voting end date</FormLabel>
                  <Input
                    type="date"
                    {...register("end_date", {
                      valueAsDate: true,
                      required: "This is required.",
                    })}
                    defaultValue={
                      // https://stackoverflow.com/a/53236544
                      new Date(Date.now() + 6.048e8).toISOString().split("T")[0]
                    }
                  />

                  {errors.end_date && (
                    <FormErrorMessage>
                      {errors.end_date.message?.toString()}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
              <Stack direction={["column", "row"]} alignItems="center">
                <FormControl
                  isInvalid={!!errors.start_date}
                  isRequired
                  isDisabled={createElectionMutation.isLoading}
                >
                  <FormLabel>Voting hour start</FormLabel>
                  <Select
                    {...register("voting_start", {
                      required: "This is required.",
                      valueAsNumber: true,
                      value: 7,
                    })}
                    defaultValue={7}
                  >
                    {[...Array(24).keys()].map((_, i) => (
                      <option value={i} key={i}>
                        {convertNumberToHour(i)}
                      </option>
                    ))}
                  </Select>

                  {errors.start_date && (
                    <FormErrorMessage>
                      {errors.start_date.message?.toString()}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl
                  isInvalid={!!errors.end_date}
                  isRequired
                  isDisabled={createElectionMutation.isLoading}
                >
                  <FormLabel>Voting hour end</FormLabel>
                  <Select
                    {...register("voting_end", {
                      required: "This is required.",
                      valueAsNumber: true,
                      value: 19,
                    })}
                    defaultValue={19}
                  >
                    {[...Array(24).keys()].map((_, i) => (
                      <option
                        value={i}
                        key={i}
                        disabled={i < watch("voting_start")}
                      >
                        {convertNumberToHour(i)}
                      </option>
                    ))}
                  </Select>

                  {errors.end_date && (
                    <FormErrorMessage>
                      {errors.end_date.message?.toString()}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
              <Text
                textAlign="center"
                fontSize="sm"
                opacity={createElectionMutation.isLoading ? 0.5 : 1}
              >
                {
                  // calculate the number of hours depending on the voting_start and voting_end

                  watch("voting_end") - watch("voting_start")
                }{" "}
                hour
                {watch("voting_end") - watch("voting_start") > 1 ? "s" : ""}
              </Text>

              <Accordion allowToggle>
                <AccordionItem
                  border="none"
                  isDisabled={createElectionMutation.isLoading}
                >
                  <AccordionButton borderRadius="md">
                    <Text flex="1" textAlign="left">
                      Election template
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel
                    {...group}
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                  >
                    {positionTemplate.map((template) => {
                      const radio = getRadioProps({
                        value: template.id.toString(),
                      });
                      return (
                        <ElectionTemplateCard key={template.id} {...radio}>
                          {template.org}
                        </ElectionTemplateCard>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
            {createElectionMutation.error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {createElectionMutation.error.message}
                </AlertDescription>
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={2}
              onClick={onClose}
              disabled={createElectionMutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={createElectionMutation.isLoading}
            >
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateElectionModal;