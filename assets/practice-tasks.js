const CHALLENGE_DATA = [
  {
    "subsection": "Reading Text",
    "department": "Ad Operations",
    "tasks": [
      "Summarise a long discrepancy email thread before joining the resolution call",
      "Extract action items and owners from a trafficking QA transcript",
      "Condense a platform release note into a plain-language impact summary"
    ]
  },
  {
    "subsection": "Reading Text",
    "department": "Sales",
    "tasks": [
      "Summarise a client email thread before drafting a renewal response",
      "Extract key objections from a call transcript before a follow-up meeting",
      "Get the key points from a competitor report without reading it in full"
    ]
  },
  {
    "subsection": "Reading Text",
    "department": "Political Advertising",
    "tasks": [
      "Summarise a compliance policy update to share with the team",
      "Extract deadlines and requirements from a state filing document",
      "Condense a legal memo on political ad restrictions into a quick-reference"
    ]
  },
  {
    "subsection": "Reading Text",
    "department": "Finance/Billing",
    "tasks": [
      "Summarise a vendor contract before a renegotiation call",
      "Extract payment terms and penalty clauses from a client MSA",
      "Produce a catch-up brief on a billing dispute thread for a new team member"
    ]
  },
  {
    "subsection": "Reading Text",
    "department": "HR & People",
    "tasks": [
      "Summarise candidate interview feedback from multiple reviewers into one brief",
      "Extract action items from an all-hands meeting transcript",
      "Condense a benefits policy update into a plain-language employee summary"
    ]
  },
  {
    "subsection": "Reading Text",
    "department": "Marketing & Comms",
    "tasks": [
      "Summarise press coverage across a campaign period into key themes",
      "Extract client feedback from a lengthy agency review document",
      "Get the key points from an industry report for a leadership briefing"
    ]
  },
  {
    "subsection": "Reading Text",
    "department": "Data & Insights",
    "tasks": [
      "Summarise a lengthy methodology document before a client presentation",
      "Extract performance anomalies flagged across a set of campaign reports",
      "Condense a research paper on TV measurement into an accessible summary"
    ]
  },
  {
    "subsection": "Reading Text",
    "department": "Technology & Engineering",
    "tasks": [
      "Summarise a vendor API documentation update before a sprint planning session",
      "Extract open issues and blockers from a long incident post-mortem",
      "Produce a catch-up brief on a technical thread for a team member joining mid-project"
    ]
  },
  {
    "subsection": "Writing Text",
    "department": "Ad Operations",
    "tasks": [
      "Draft a discrepancy notification email from bullet points on what went wrong",
      "Write a standard response to a recurring trafficking error enquiry",
      "Draft a platform outage update from a list of known facts"
    ]
  },
  {
    "subsection": "Writing Text",
    "department": "Sales",
    "tasks": [
      "Draft a renewal proposal narrative from a list of account performance bullet points",
      "Write a follow-up email after a client call from your meeting notes",
      "Adapt a case study for three different client verticals"
    ]
  },
  {
    "subsection": "Writing Text",
    "department": "Political Advertising",
    "tasks": [
      "Draft a compliance confirmation email from a checklist of verified requirements",
      "Write a standard response to a political advertiser asking about filing deadlines",
      "Draft a team update on a new state regulation from bullet points"
    ]
  },
  {
    "subsection": "Writing Text",
    "department": "Finance/Billing",
    "tasks": [
      "Draft a collections follow-up email from notes on the outstanding balance and history",
      "Write a billing dispute response from a list of facts and resolution steps",
      "Turn a reconciliation summary into a client-facing narrative"
    ]
  },
  {
    "subsection": "Writing Text",
    "department": "HR & People",
    "tasks": [
      "Draft a job description from a list of role requirements and team context",
      "Write a rejection email that feels human from a standard template",
      "Draft an all-hands announcement from leadership bullet points"
    ]
  },
  {
    "subsection": "Writing Text",
    "department": "Marketing & Comms",
    "tasks": [
      "Draft a campaign recap narrative from performance data and key results",
      "Write three versions of a product announcement for different audience segments",
      "Turn a list of product differentiators into a client-facing one-pager narrative"
    ]
  },
  {
    "subsection": "Writing Text",
    "department": "Data & Insights",
    "tasks": [
      "Draft an executive summary of a campaign analysis from your key findings bullets",
      "Write a plain-language explanation of an attribution methodology for a non-technical client",
      "Turn a data table into a narrative insight paragraph for a quarterly review"
    ]
  },
  {
    "subsection": "Writing Text",
    "department": "Technology & Engineering",
    "tasks": [
      "Draft release notes from a list of shipped features and bug fixes",
      "Write a plain-language incident summary for a non-technical stakeholder",
      "Draft a requirements document from a verbal description of a feature request"
    ]
  },
  {
    "subsection": "Transforming Text",
    "department": "Ad Operations",
    "tasks": [
      "Convert a technical trafficking spec into a plain-language client summary",
      "Adapt an internal QA report into a client-facing discrepancy notice",
      "Reformat a long process SOP into a quick-reference checklist"
    ]
  },
  {
    "subsection": "Transforming Text",
    "department": "Sales",
    "tasks": [
      "Convert a formal proposal into a Slack-friendly executive summary",
      "Adapt a case study written for one vertical into a version for a different category",
      "Rewrite a dense contract summary in plain language for a client who is not legally trained"
    ]
  },
  {
    "subsection": "Transforming Text",
    "department": "Political Advertising",
    "tasks": [
      "Convert a legal compliance memo into a plain-language team briefing",
      "Adapt a national filing guide into a state-specific quick reference",
      "Reformat a regulatory update into a checklist your team can act on"
    ]
  },
  {
    "subsection": "Transforming Text",
    "department": "Marketing & Comms",
    "tasks": [
      "Convert an internal performance report into a client-facing narrative",
      "Adapt a thought leadership article for a LinkedIn post and an internal newsletter",
      "Rewrite a technical product description in plain language for a sales audience"
    ]
  },
  {
    "subsection": "Transforming Text",
    "department": "HR & People",
    "tasks": [
      "Convert a dense policy document into a plain-language FAQ for employees",
      "Adapt a formal performance review template into a more conversational format",
      "Reformat onboarding documentation into a first-week checklist"
    ]
  },
  {
    "subsection": "Transforming Text",
    "department": "Data & Insights",
    "tasks": [
      "Convert a technical methodology document into an accessible client explainer",
      "Adapt a detailed campaign analysis into a three-bullet executive summary",
      "Reformat a data dictionary into a plain-language field reference for non-technical users"
    ]
  },
  {
    "subsection": "Searching by Meaning",
    "department": "Ad Operations",
    "tasks": [
      "Search your SharePoint for the most recent version of a platform's trafficking spec when you remember the topic but not the filename",
      "Ask Copilot what the make-good policy says without reading the full document",
      "Find all past communications referencing a specific client's discrepancy history"
    ]
  },
  {
    "subsection": "Searching by Meaning",
    "department": "Sales",
    "tasks": [
      "Search for previous proposals sent to accounts in a specific vertical",
      "Find what was said about pricing flexibility in past client negotiation threads",
      "Locate a previous RFP response that addressed a measurement objection you are facing again"
    ]
  },
  {
    "subsection": "Searching by Meaning",
    "department": "Political Advertising",
    "tasks": [
      "Search for all documents referencing a specific state's filing requirements",
      "Find past communications about a political advertiser's compliance history",
      "Locate the most recent version of your disclaimer requirements by state"
    ]
  },
  {
    "subsection": "Searching by Meaning",
    "department": "Finance/Billing",
    "tasks": [
      "Search for all contract clauses related to payment terms across your active MSAs",
      "Find previous billing dispute resolutions for a specific account type",
      "Locate the most recent collections policy without knowing the exact document name"
    ]
  },
  {
    "subsection": "Searching by Meaning",
    "department": "HR & People",
    "tasks": [
      "Search for all policy documents referencing remote work or flexible scheduling",
      "Find previous job postings for a role you are now hiring for again",
      "Locate onboarding materials for a specific team without knowing where they are stored"
    ]
  },
  {
    "subsection": "Searching by Meaning",
    "department": "Data & Insights",
    "tasks": [
      "Search for all reports referencing a specific measurement methodology",
      "Find past analyses that addressed a particular client vertical's performance benchmarks",
      "Locate a previous data dictionary for a system you are now inheriting"
    ]
  },
  {
    "subsection": "Searching by Meaning",
    "department": "Technology & Engineering",
    "tasks": [
      "Search for all documentation referencing a specific API integration",
      "Find past incident reports related to a specific system or failure type",
      "Locate a runbook for a process you did not write and cannot remember the name of"
    ]
  },
  {
    "subsection": "Searching by Meaning",
    "department": "Marketing & Comms",
    "tasks": [
      "Search for all brand voice guidelines across your SharePoint without knowing the folder structure",
      "Find previous campaign briefs for a specific client category",
      "Locate all content referencing a product feature that has been recently renamed"
    ]
  },
  {
    "subsection": "Analysis and Finding Insights",
    "department": "Ad Operations",
    "tasks": [
      "Group a month of discrepancy notes by root cause type and count frequency",
      "Flag campaigns where delivery fell below threshold across a set of reports",
      "Identify which trafficking errors appear most frequently across a quarter of QA logs"
    ]
  },
  {
    "subsection": "Analysis and Finding Insights",
    "department": "Sales",
    "tasks": [
      "Find the most common objections across your last 20 call notes",
      "Identify which accounts have the highest churn risk based on engagement patterns in your CRM notes",
      "Analyse open-text feedback from a client satisfaction survey to surface dominant themes"
    ]
  },
  {
    "subsection": "Analysis and Finding Insights",
    "department": "Political Advertising",
    "tasks": [
      "Identify which states generate the most compliance exceptions across a filing cycle",
      "Find patterns in political advertiser onboarding delays across a campaign season",
      "Flag orders where spend pacing is below contracted threshold"
    ]
  },
  {
    "subsection": "Analysis and Finding Insights",
    "department": "Finance/Billing",
    "tasks": [
      "Identify which account types generate the most billing disputes",
      "Flag invoices where payment is more than 30 days overdue relative to terms",
      "Find patterns in reconciliation errors across a quarter of billing records"
    ]
  },
  {
    "subsection": "Analysis and Finding Insights",
    "department": "HR & People",
    "tasks": [
      "Analyse exit interview notes to find the most common departure reasons",
      "Find patterns in time-to-hire across roles and departments over the past year",
      "Identify which onboarding steps generate the most new-hire questions"
    ]
  },
  {
    "subsection": "Analysis and Finding Insights",
    "department": "Data & Insights",
    "tasks": [
      "Group campaign performance data by delivery type and surface the top and bottom performers",
      "Identify which metrics most consistently predict over- or under-delivery across a client set",
      "Flag anomalies in impression delivery relative to the 90-day average for a set of campaigns"
    ]
  },
  {
    "subsection": "Analysis and Finding Insights",
    "department": "Technology & Engineering",
    "tasks": [
      "Identify the highest-frequency error types in a system log",
      "Find patterns in incident timing to identify whether failures cluster around deployments or specific times",
      "Flag which integrations generate the most support tickets"
    ]
  },
  {
    "subsection": "Analysis and Finding Insights",
    "department": "Marketing & Comms",
    "tasks": [
      "Analyse engagement data across a content series to find which topics perform best",
      "Find the most common themes in inbound press enquiries over a quarter",
      "Identify which campaign assets generate the strongest response by audience segment"
    ]
  },
  {
    "subsection": "Brainstorming and Ideation",
    "department": "Sales",
    "tasks": [
      "Generate 15 re-engagement approaches for a client relationship that has gone quiet",
      "Brainstorm subject line options for a renewal proposal email",
      "Generate unexpected angles for a pitch to a client who has heard the standard Ampersand story before"
    ]
  },
  {
    "subsection": "Brainstorming and Ideation",
    "department": "Marketing & Comms",
    "tasks": [
      "Generate naming options for a new internal programme or initiative",
      "Brainstorm content angles for a thought leadership piece on TV advertising measurement",
      "Generate five completely different ways to frame Ampersand's STB differentiation story"
    ]
  },
  {
    "subsection": "Brainstorming and Ideation",
    "department": "HR & People",
    "tasks": [
      "Generate ideas for improving the onboarding experience for a specific team",
      "Brainstorm recognition approaches that do not rely on compensation",
      "Generate options for structuring a difficult performance conversation"
    ]
  },
  {
    "subsection": "Brainstorming and Ideation",
    "department": "Ad Operations",
    "tasks": [
      "Brainstorm process improvements to reduce a recurring trafficking error type",
      "Generate options for a new QA checklist structure",
      "Brainstorm ways to communicate platform changes to clients with different levels of technical sophistication"
    ]
  },
  {
    "subsection": "Brainstorming and Ideation",
    "department": "Technology & Engineering",
    "tasks": [
      "Generate approaches for reducing ticket volume on a recurring support issue",
      "Brainstorm options for structuring a technical handover between teams",
      "Generate naming options for a new internal tool or system"
    ]
  },
  {
    "subsection": "Personas and Perspectives",
    "department": "Sales",
    "tasks": [
      "Simulate how a sceptical procurement lead would react to your renewal proposal",
      "Get pushback on your pitch from the perspective of a client who prefers programmatic over linear TV",
      "Anticipate the three hardest objections a new prospect will raise and prepare your responses"
    ]
  },
  {
    "subsection": "Personas and Perspectives",
    "department": "Political Advertising",
    "tasks": [
      "Simulate how a compliance officer would review your political ad trafficking checklist",
      "Get pushback on a new state filing process from the perspective of a cautious advertiser's legal team",
      "Anticipate how a new political client unfamiliar with cable will respond to your onboarding materials"
    ]
  },
  {
    "subsection": "Personas and Perspectives",
    "department": "Marketing & Comms",
    "tasks": [
      "Simulate how a CMO would react to your campaign results narrative before you present it",
      "Get pushback on a new positioning statement from the perspective of a sceptical sales team member",
      "Test a press release against the perspective of a journalist looking for reasons to push back"
    ]
  },
  {
    "subsection": "Personas and Perspectives",
    "department": "HR & People",
    "tasks": [
      "Simulate how a candidate would experience your job posting before publishing it",
      "Get pushback on a new policy from the perspective of a sceptical long-tenured employee",
      "Anticipate how a manager will react to a difficult feedback conversation before you have it"
    ]
  },
  {
    "subsection": "Personas and Perspectives",
    "department": "Data & Insights",
    "tasks": [
      "Simulate how a client's media director would challenge your measurement methodology",
      "Get pushback on your analysis conclusions from the perspective of a sceptical internal stakeholder",
      "Anticipate the questions a CFO will ask about your campaign ROI model before presenting it"
    ]
  },
  {
    "subsection": "Personas and Perspectives",
    "department": "Finance/Billing",
    "tasks": [
      "Simulate how a client's AP team will respond to a collections follow-up before sending it",
      "Get pushback on a new billing process from the perspective of a client who has disputed invoices before",
      NaN
    ]
  },
  {
    "subsection": "Evaluation and Critique",
    "department": "Sales",
    "tasks": [
      "Run a proposal through five evaluation criteria before it goes to a client",
      "Find the weakest assumption in your renewal business case before a leadership review",
      "Check a client email for claims that are not supported by data before sending"
    ]
  },
  {
    "subsection": "Evaluation and Critique",
    "department": "Ad Operations",
    "tasks": [
      "Check a trafficking spec for internal inconsistencies before submitting",
      "Find unsupported claims in a discrepancy report before sending to a client",
      "Review a new QA checklist for gaps against your most common error types"
    ]
  },
  {
    "subsection": "Evaluation and Critique",
    "department": "Political Advertising",
    "tasks": [
      "Check a compliance checklist against known state requirements before filing",
      "Find logical gaps in a new advertiser onboarding process before rolling it out",
      "Review a political ad script for potential compliance issues before trafficking"
    ]
  },
  {
    "subsection": "Evaluation and Critique",
    "department": "Finance/Billing",
    "tasks": [
      "Check a contract for inconsistencies between payment terms in different sections",
      "Find unsupported assumptions in a billing dispute response before sending",
      "Review a new invoicing process for failure modes before going live"
    ]
  },
  {
    "subsection": "Evaluation and Critique",
    "department": "HR & People",
    "tasks": [
      "Review a job posting for exclusionary language before publishing",
      "Find gaps in a new onboarding process by evaluating it against the most common new-hire questions",
      "Check a performance review document for consistency before sharing with an employee"
    ]
  },
  {
    "subsection": "Evaluation and Critique",
    "department": "Marketing & Comms",
    "tasks": [
      "Check a press release for claims that could be challenged before distribution",
      "Review a campaign brief for missing information before briefing the agency",
      "Find the weakest argument in a thought leadership draft before publishing"
    ]
  },
  {
    "subsection": "Evaluation and Critique",
    "department": "Data & Insights",
    "tasks": [
      "Check an analysis for unsupported conclusions before presenting to leadership",
      "Find internal inconsistencies in a methodology document before sharing with a client",
      "Review a dashboard design for metrics that could be misinterpreted"
    ]
  },
  {
    "subsection": "Evaluation and Critique",
    "department": "Technology & Engineering",
    "tasks": [
      "Check a technical specification for ambiguities before development begins",
      "Find failure modes in a new automation design before deploying it",
      "Review a runbook for gaps that would leave a new team member unable to resolve an incident"
    ]
  },
  {
    "subsection": "Writing Code",
    "department": "Ad Operations",
    "tasks": [
      "Write an Excel formula to flag campaigns where delivered impressions fall below a threshold",
      "Generate an Office Script to reformat a weekly trafficking report automatically",
      "Write a SQL query to pull all active campaigns for a specific market and date range"
    ]
  },
  {
    "subsection": "Writing Code",
    "department": "Finance/Billing",
    "tasks": [
      "Write an Excel formula to calculate outstanding balance with penalty based on payment terms",
      "Generate a SQL query to identify invoices overdue by more than 30 days",
      "Write an Office Script to standardise date formats across a billing export"
    ]
  },
  {
    "subsection": "Writing Code",
    "department": "Data & Insights",
    "tasks": [
      "Write a SQL query to pull impression delivery by campaign type for a defined period",
      "Generate a Python script to merge two campaign performance exports on a common key",
      "Write an Excel formula to calculate pacing against contracted delivery for each line item"
    ]
  },
  {
    "subsection": "Writing Code",
    "department": "Technology & Engineering",
    "tasks": [
      "Write a Power Automate flow to route inbound support tickets based on keyword classification",
      "Generate a Python script to parse a log file and count occurrences of each error type",
      "Write a SQL query to identify duplicate records in a system export"
    ]
  },
  {
    "subsection": "Writing Code",
    "department": "Political Advertising",
    "tasks": [
      "Write an Excel formula to flag orders where political ad spend exceeds the declared threshold",
      "Generate an Office Script to check a trafficking sheet for missing required compliance fields",
      "Write a SQL query to pull all political orders by state for a filing period"
    ]
  },
  {
    "subsection": "Reformatting Data and Documents",
    "department": "Ad Operations",
    "tasks": [
      "Clean a system export with inconsistent date formats and missing fields before loading it into a report",
      "Restructure a flat trafficking sheet into a table with consistent column headers",
      "Extract specific fields from a set of similar order forms into a unified summary table"
    ]
  },
  {
    "subsection": "Reformatting Data and Documents",
    "department": "Finance/Billing",
    "tasks": [
      "Standardise a billing export with merged cells and inconsistent formats before reconciliation",
      "Extract invoice numbers, amounts, and due dates from a set of PDF-style tables into a clean spreadsheet",
      "Clean a collections dataset by removing duplicates and flagging blank payment dates"
    ]
  },
  {
    "subsection": "Reformatting Data and Documents",
    "department": "Data & Insights",
    "tasks": [
      "Restructure a raw campaign data export into a format compatible with your reporting template",
      "Clean a dataset with inconsistent market names before running analysis",
      "Extract specific metrics from multiple campaign reports into a single comparison table"
    ]
  },
  {
    "subsection": "Reformatting Data and Documents",
    "department": "HR & People",
    "tasks": [
      "Restructure unstructured interview notes into a consistent evaluation format",
      "Clean a headcount export with inconsistent department names and missing manager fields",
      "Convert free-text onboarding feedback into a structured table by theme"
    ]
  },
  {
    "subsection": "Reformatting Data and Documents",
    "department": "Sales",
    "tasks": [
      "Restructure CRM export data into a clean account list with consistent formatting for a QBR deck",
      "Extract contract values and renewal dates from a set of account records into a pipeline table",
      NaN
    ]
  },
  {
    "subsection": "Reformatting Data and Documents",
    "department": "Technology & Engineering",
    "tasks": [
      "Clean a system log export by standardising timestamps and removing duplicate entries",
      "Restructure a flat configuration file into a structured format for documentation",
      "Extract error codes and frequencies from a raw log into a ranked summary table"
    ]
  },
  {
    "subsection": "Explaining and Documenting Code",
    "department": "Technology & Engineering",
    "tasks": [
      "Ask AI to explain an inherited Power Automate flow before modifying it",
      "Generate plain-language documentation for a script you are handing over to another team",
      "Diagnose why an Excel formula is returning an unexpected result by pasting it with the error"
    ]
  },
  {
    "subsection": "Explaining and Documenting Code",
    "department": "Ad Operations",
    "tasks": [
      "Ask AI to explain what an inherited Office Script does before running it on a live report",
      "Generate a runbook for a trafficking automation so another team member can maintain it",
      "Diagnose why a formula in a delivery report is producing wrong totals"
    ]
  },
  {
    "subsection": "Explaining and Documenting Code",
    "department": "Data & Insights",
    "tasks": [
      "Ask AI to explain a SQL query you inherited before modifying it for a new use case",
      "Generate plain-language documentation of an analysis script for a non-technical stakeholder",
      "Diagnose why a Python script is producing a different output than expected on a new dataset"
    ]
  },
  {
    "subsection": "Explaining and Documenting Code",
    "department": "Finance/Billing",
    "tasks": [
      "Ask AI to explain what a billing reconciliation macro does before running it on live data",
      "Generate a plain-language description of a formula-heavy Excel model for a finance director who did not build it",
      NaN
    ]
  },
  {
    "subsection": "What Agentic Means",
    "department": "Technology & Engineering",
    "tasks": [
      "Identify which AI-assisted steps in your current workflows act before you review and which produce output for review first",
      "Evaluate whether a proposed Copilot automation is prompt-response or agentic based on its design",
      "Map a current manual workflow to identify which steps have clear enough rules to delegate to an agent"
    ]
  },
  {
    "subsection": "What Agentic Means",
    "department": "Ad Operations",
    "tasks": [
      "Identify which steps in your trafficking workflow are candidates for agentic automation and which require human judgment",
      "Evaluate a proposed AI classification step in an order routing flow for agentic risk",
      NaN
    ]
  },
  {
    "subsection": "What Agentic Means",
    "department": "Finance/Billing",
    "tasks": [
      "Identify which steps in your invoicing or collections workflow could be safely automated and which require human review",
      "Evaluate whether an AI-powered payment matching step is acting agentically and what oversight it requires",
      NaN
    ]
  },
  {
    "subsection": "Prompt Chaining",
    "department": "Sales",
    "tasks": [
      "Chain a meeting transcript summary into a follow-up email draft with human review between steps",
      "Use a competitive analysis output as the input for a differentiated proposal section",
      "Build a three-step chain: extract client objections from notes, generate responses, draft a follow-up email"
    ]
  },
  {
    "subsection": "Prompt Chaining",
    "department": "Data & Insights",
    "tasks": [
      "Chain a raw data summary into an insight narrative into an executive slide draft",
      "Use an anomaly detection output as the input for a client alert email",
      "Build a research chain: retrieve relevant benchmarks, summarise findings, draft a methodology note"
    ]
  },
  {
    "subsection": "Prompt Chaining",
    "department": "Marketing & Comms",
    "tasks": [
      "Chain a campaign brief into a draft narrative into a set of social posts for different channels",
      "Use a press coverage summary as the input for a leadership communications update",
      NaN
    ]
  },
  {
    "subsection": "Prompt Chaining",
    "department": "Technology & Engineering",
    "tasks": [
      "Chain an incident description into a root cause analysis into a plain-language stakeholder update",
      "Use a feature request description as the input for a structured technical specification",
      NaN
    ]
  },
  {
    "subsection": "Agentic AI in Practice",
    "department": "Technology & Engineering",
    "tasks": [
      "Design a Copilot agent that monitors a SharePoint folder and routes new files based on content type",
      "Set up a Power Automate flow with an AI classification step that routes inbound tickets by category",
      "Use AI-powered research to synthesise information across multiple sources before a vendor evaluation"
    ]
  },
  {
    "subsection": "Agentic AI in Practice",
    "department": "Ad Operations",
    "tasks": [
      "Design a monitoring workflow that flags orders where pacing falls below threshold without manual checking",
      "Evaluate a proposed AI routing step for inbound trafficking requests for appropriate scope and oversight",
      NaN
    ]
  },
  {
    "subsection": "Agentic AI in Practice",
    "department": "Finance/Billing",
    "tasks": [
      "Design an AI monitoring workflow that flags overdue invoices and drafts a collections follow-up for human review before sending",
      "Evaluate a proposed automated payment matching workflow for failure modes before deploying",
      NaN
    ]
  },
  {
    "subsection": "Agentic AI in Practice",
    "department": "Sales",
    "tasks": [
      "Use AI-powered research to synthesise competitive intelligence before a major pitch",
      NaN,
      NaN
    ]
  },
  {
    "subsection": "Where Agents Fail",
    "department": "Technology & Engineering",
    "tasks": [
      "Run the first 10 instances of a new automated routing workflow manually in parallel to verify the agent is making the right decisions",
      "Build logging into an existing agentic workflow so every action can be audited after the fact",
      "Identify the step in a 5-step workflow where a wrong decision would be most expensive to correct"
    ]
  },
  {
    "subsection": "Where Agents Fail",
    "department": "Ad Operations",
    "tasks": [
      "Identify the steps in an automated order routing flow where a classification error would compound before detection",
      "Design a test batch for a new trafficking automation before scaling to live orders",
      NaN
    ]
  },
  {
    "subsection": "Where Agents Fail",
    "department": "Finance/Billing",
    "tasks": [
      "Identify which step in an automated invoicing workflow is the last safe point for human review before an irreversible action",
      NaN,
      NaN
    ]
  },
  {
    "subsection": "Human Oversight and Checkpoints",
    "department": "Technology & Engineering",
    "tasks": [
      "Design a Copilot agent workflow with an explicit approval checkpoint before any external communication is sent",
      "Build an audit log specification for a new agentic workflow so every action is reviewable after the fact",
      "Define escalation rules for an AI classification flow: what conditions cause it to stop and request human review"
    ]
  },
  {
    "subsection": "Human Oversight and Checkpoints",
    "department": "Ad Operations",
    "tasks": [
      "Design a review checkpoint after an AI order classification step before items are routed to trafficking",
      "Define what a meaningful review looks like for a Copilot-assisted discrepancy response before it is sent to a client",
      NaN
    ]
  },
  {
    "subsection": "Human Oversight and Checkpoints",
    "department": "Finance/Billing",
    "tasks": [
      "Design an approval step before an automated collections email is sent that shows the reviewer what the agent decided and why",
      NaN,
      NaN
    ]
  },
  {
    "subsection": "Human Oversight and Checkpoints",
    "department": "Sales",
    "tasks": [
      "Define which steps in a Copilot-assisted proposal workflow require human review before the output is shared externally",
      NaN,
      NaN
    ]
  }
];
