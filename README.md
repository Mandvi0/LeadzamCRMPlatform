
# LeadZam – UX Audit & Frontend Redesign

A UI/UX audit and frontend redesign of LeadZam, a CRM platform designed to help businesses manage leads, track campaign performance, and organize sales follow-ups.

This project focuses on identifying usability issues in the existing platform and developing a more intuitive experience through UX improvements and a functional React frontend.

## 📌 About the Project

LeadZam is a CRM platform that helps businesses manage leads generated through marketing campaigns, monitor lead performance, and organize sales follow-up activities.

The objective of this assignment was to explore the existing platform from a user's perspective, identify usability challenges, and propose practical improvements to enhance the overall user experience.

Rather than focusing only on visual redesign, the project emphasizes solving interaction-level problems and improving important user workflows.

## 🎯 Project Objectives

- Understand the platform's purpose and core functionality.
- Evaluate the existing user experience.
- Identify usability issues and interaction challenges.
- Prioritize problems based on their impact on users.
- Redesign an important user journey.
- Build a functional frontend prototype using React and TypeScript.
- Improve interaction clarity, consistency, and usability.

## 🔍 UX Audit & Key Findings

During the website exploration and UX evaluation, I identified several areas where the user experience could be improved.

### 1. Follow-up Scheduling Requires a Lead Owner

**Problem:** Users cannot schedule a follow-up when a lead has no assigned owner.

**User Impact:** This interrupts the user's workflow and introduces an additional step before completing the intended action.

**Proposed Improvement:** Allow users to assign an owner as part of the follow-up scheduling process.

### 2. Lead Assignment Opens a Separate Dialog

**Problem:** Selecting the Assign Lead option opens a separate Manage Lead dialog, taking users away from the follow-up scheduling process.

**User Impact:** Switching between different interaction contexts increases cognitive effort and makes the workflow feel disconnected.

**Proposed Improvement:** Integrate owner selection into the follow-up scheduling experience.

### 3. Users Need to Restart the Follow-up Action

**Problem:** After assigning an owner, users need to return and initiate the follow-up action again.

**User Impact:** The original task is interrupted, creating unnecessary additional interactions.

**Proposed Improvement:** Preserve the user's original intent and continue directly to follow-up scheduling after assigning an owner.

## 💡 Proposed UX Solution

The redesign focuses on making lead assignment and follow-up scheduling a more connected and intuitive experience.

### Existing Workflow

1. Open a lead profile.
2. Select the Follow-up option.
3. Receive a message that the lead needs an owner.
4. Select Assign Lead.
5. A separate Manage Lead dialog opens.
6. Assign the lead to a team member.
7. Return to the lead profile.
8. Initiate follow-up scheduling again.

### Proposed Workflow

1. Open a lead profile.
2. Select Follow-up.
3. Check whether the lead has an assigned owner.
4. If no owner exists, select a team member within the scheduling experience.
5. Choose a follow-up date and time.
6. Add an optional note.
7. Confirm the follow-up.
8. Receive clear confirmation of the completed action.

### Design Goals

- Reduce unnecessary navigation.
- Preserve user intent.
- Simplify lead assignment.
- Improve interaction clarity.
- Reduce cognitive load.
- Provide meaningful feedback after actions.

## ✨ Key Features

The frontend prototype focuses on demonstrating the redesigned experience.

- Lead assignment interaction.
- Follow-up scheduling workflow.
- Team member selection.
- Form interactions and input handling.
- Clear information hierarchy.
- Consistent UI components.
- Responsive interface considerations.

## 🛠️ Tech Stack

- React.js
- TypeScript
- Vite
- HTML5
- CSS3
- JavaScript
- Git & GitHub
- Figma

## 🎨 Design & Development Approach

The project followed a structured approach:

1. **Product Exploration:** Understanding the existing platform and its functionality.
2. **UX Evaluation:** Exploring user interactions and identifying usability challenges.
3. **Problem Prioritization:** Focusing on issues that interrupt important user workflows.
4. **Solution Design:** Developing improved interaction patterns and user flows.
5. **Frontend Development:** Implementing the redesigned experience using React and TypeScript.

## 🤖 AI Tools & Usage Disclosure

AI tools were used as supporting resources during exploration and development.

**ChatGPT**
- Explored technical approaches and implementation possibilities.
- Clarified development concepts.
- Assisted with specific coding questions and documentation.

**Cursor**
- Supported code exploration and implementation.
- Assisted with code suggestions, debugging, and refinements.

**My Contribution**

The website exploration, UX audit, identification of usability issues, prioritization, problem-solving approach, and design decisions were independently carried out by me.

AI tools were used for assistance where needed, while the final design direction and implementation decisions remained my responsibility.

## 📋 Project Scope & Limitations

**Included:**
- UX audit and usability evaluation.
- Lead assignment and follow-up scheduling redesign.
- Frontend interface development.
- Interaction states and responsive layout considerations.

**Not Included:**
- Complete CRM platform redesign.
- Backend and database integration.
- Real lead management operations.
- Actual email or WhatsApp notifications.
- Production-level CRM functionality.

This project is a frontend prototype demonstrating the proposed UX improvements.

## 🧪 Validation & Testing

The prototype is intended to be evaluated against the following usability criteria:

- Is lead assignment easy to understand?
- Can users schedule follow-ups without unnecessary navigation?
- Are required actions and fields clearly communicated?
- Does the interface provide clear feedback?
- Is the experience usable across different screen sizes?

Further usability testing with representative users would be required before production release.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd YOUR_PROJECT_FOLDER
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Open the local URL displayed in your terminal, usually:

http://localhost:5173

### Additional Commands

**Build the project**

```bash
npm run build
```

**Run ESLint**

```bash
npm run lint
```

**Preview production build**

```bash
npm run preview
```


## 🔗 Project Links

- **GitHub Repository:** [Leadzam CRM Platform](https://github.com/Mandvi0/LeadzamCRMPlatform)
- **Live Demo (Vercel):** [View Live Project](https://leadzam-crm-platform.vercel.app/)
- **Figma Design & Deliverables:** [View Figma File](https://www.figma.com/design/L2xW3SyG60PoDYkQoBoc5G/DELIVERABLES?node-id=0-1&t=r2qSKCmV9THyt1kN-1)

## 📚 Key Learnings

- Evaluating an existing product from a user's perspective.
- Identifying usability issues beyond visual inconsistencies.
- Understanding how interaction problems affect user workflows.
- Translating UX observations into practical solutions.
- Combining UX thinking with frontend implementation.

---

**Project:** LeadZam – UX Audit & Frontend Redesign  
**Role:** UI/UX Designer & Frontend Developer  
**Built with:** React, TypeScript & Vite
