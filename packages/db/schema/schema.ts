import {
  mysqlTable,
  timestamp,
  text,
  longtext,
  mysqlEnum,
  varchar,
  int,
  json,
  date,
} from "drizzle-orm/mysql-core";

const id = varchar("id", { length: 256 }).primaryKey().notNull().unique();
const created_at = timestamp("created_at").notNull().defaultNow();
const updated_at = timestamp("updated_at").notNull().defaultNow().onUpdateNow();
const election_id = varchar("election_id", { length: 256 }).notNull();
const user_id = varchar("user_id", { length: 256 }).notNull();
const voter_id = varchar("voter_id", { length: 256 }).notNull();

const publicity = ["PRIVATE", "VOTER", "PUBLIC"] as const;
const token_type = [
  "EMAIL_VERIFICATION",
  "PASSWORD_RESET",
  "ELECTION_INVITATION",
] as const;
const acount_status_type = ["ADDED", "INVITED", "DECLINED"] as const;

export const users = mysqlTable("users", {
  id,
  email: varchar("email", { length: 256 }).notNull().unique(),
  email_verified: timestamp("email_verified"),
  first_name: text("first_name").notNull(),
  middle_name: text("middle_name"),
  last_name: text("last_name").notNull(),
  image_link: longtext("image_link"),
  password: longtext("password"),
  created_at,
  updated_at,
});

export const elections = mysqlTable("elections", {
  id,
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  name: text("name").notNull(),
  description: longtext("description"),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
  publicity: mysqlEnum("publicity", publicity).default("PRIVATE"),
  logo: longtext("logo"),
  voter_domain: text("voter_domain"),

  created_at,
  updated_at,
});

export const votes = mysqlTable("votes", {
  id,
  created_at,

  voter_id,
  candidate_id: varchar("candidate_id", { length: 256 }),
  position_id: varchar("position_id", { length: 256 }),
  election_id,
});

export const commissioners = mysqlTable("commissioners", {
  id,
  created_at,

  user_id,
  election_id,
});

export const invited_commissioners = mysqlTable("invited_commissioners", {
  id,
  email: text("email").notNull(),
  status: mysqlEnum("status", acount_status_type).default("INVITED"),

  created_at,

  election_id,
});
export const invited_voters = mysqlTable("invited_voters", {
  id,
  email: text("email").notNull(),
  status: mysqlEnum("status", acount_status_type).default("ADDED"),
  field: json("field"),

  created_at,

  election_id,
});

export const voters = mysqlTable("voters", {
  id,
  created_at,

  user_id,
  election_id,
});

export const partylists = mysqlTable("partylists", {
  id,
  name: text("name").notNull(),
  acronym: text("acronym").notNull(),
  description: longtext("description"),
  logo_link: longtext("logo_link"),

  created_at,
  updated_at,

  election_id,
});

export const positions = mysqlTable("positions", {
  id,
  name: text("name").notNull(),
  description: longtext("description"),
  order: int("order").notNull(),
  min: int("min").default(0).notNull(),
  max: int("max").default(1).notNull(),

  created_at,
  updated_at,

  election_id,
});

export const candidates = mysqlTable("candidates", {
  id,
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  first_name: text("first_name").notNull(),
  middle_name: text("middle_name"),
  last_name: text("last_name").notNull(),
  image_link: longtext("image_link"),

  created_at,
  updated_at,

  election_id,
  position_id: varchar("position_id", { length: 256 }).notNull(),
  partylist_id: varchar("partylist_id", { length: 256 }).notNull(),
});

export const credentials = mysqlTable("credentials", {
  id,

  created_at,
  updated_at,

  candidate_id: varchar("candidate_id", { length: 256 }).notNull(),
});

export const platforms = mysqlTable("platforms", {
  id,
  title: text("title").notNull(),
  description: longtext("description"),

  created_at,
  updated_at,

  candidate_id: varchar("candidate_id", { length: 256 }).notNull(),
});

export const affiliations = mysqlTable("affiliations", {
  id,
  org_name: text("org_name").notNull(),
  org_position: text("org_position").notNull(),
  start_year: date("start_year").notNull(),
  end_year: date("end_year").notNull(),

  created_at,
  updated_at,

  credential_id: varchar("candidate_id", { length: 256 }).notNull(),
});

export const achievements = mysqlTable("achievements", {
  id,
  name: text("name").notNull(),
  year: date("year").notNull(),

  created_at,
  updated_at,

  credential_id: varchar("candidate_id", { length: 256 }).notNull(),
});

export const events_attended = mysqlTable("events_attended", {
  id,
  name: text("name").notNull(),
  year: date("year").notNull(),

  created_at,
  updated_at,

  credential_id: varchar("candidate_id", { length: 256 }).notNull(),
});

export const verification_tokens = mysqlTable("verification_tokens", {
  id,
  type: mysqlEnum("type", token_type).notNull(),
  expires_at: timestamp("expires_at").notNull(),

  created_at,
  updated_at,

  user_id: varchar("user_id", { length: 256 }),
  invited_voter_id: varchar("invited_voter_id", { length: 256 }),
  invited_commissioner_id: varchar("invited_commissioner_id", { length: 256 }),
});

export const generated_election_results = mysqlTable(
  "generated_election_results",
  {
    id,
    name: text("name").notNull(),
    link: longtext("link"),

    created_at,

    election_id: varchar("election_id", { length: 256 }),
  }
);
export const voter_fields = mysqlTable("voter_fields", {
  id,
  name: text("name").notNull(),

  created_at,

  election_id: varchar("election_id", { length: 256 }),
});

export const reported_problems = mysqlTable("reported_problems", {
  id,
  subject: longtext("subject").notNull(),
  description: longtext("description").notNull(),

  created_at,

  election_id,
  user_id,
});