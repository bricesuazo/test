import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

interface ElectionInvitationProps {
  token: string;
  type: "VOTER" | "COMMISSIONER";
  electionName: string;
  electionEndDate: Date;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function ElectionInvitation({
  token,
  type,
  electionName,
  electionEndDate,
}: ElectionInvitationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {type === "VOTER"
          ? `You have been invited to vote in ${electionName}`
          : `You have been invited to be a commissioner in ${electionName}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://raw.githubusercontent.com/bricesuazo/eboto-mo/main/public/assets/images/eboto-mo-logo.png`}
            width="42"
            height="42"
            alt="eBoto Mo"
            style={logo}
          />
          <Heading style={heading}>
            {type === "VOTER"
              ? `You have been invited to vote in ${electionName}`
              : `You have been invited to be a commissioner in ${electionName}`}
          </Heading>
          <Section style={buttonContainer}>
            <Button
              pY={11}
              pX={23}
              style={button}
              href={`${baseUrl}/invitation?token=${token}`}
            >
              View Invitation
            </Button>
          </Section>
          <Text style={paragraph}>
            This invitation will expire on{" "}
            {electionEndDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Hr style={hr} />
          <Link href={baseUrl} style={reportLink}>
            eBoto Mo
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};