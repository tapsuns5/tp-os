
import React from 'react';

const ResumeApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#808080] overflow-hidden">
      {/* Word Toolbar Simulation */}
      <div className="bg-[#c0c0c0] p-1 border-b border-white shadow-sm flex gap-2 overflow-x-auto shrink-0">
        <button className="retro-border-outset px-2 py-0.5 text-xs font-bold hover:bg-[#d0d0d0] active:retro-border-inset">
          File
        </button>
        <button className="retro-border-outset px-2 py-0.5 text-xs font-bold hover:bg-[#d0d0d0] active:retro-border-inset">
          Edit
        </button>
        <button className="retro-border-outset px-2 py-0.5 text-xs font-bold hover:bg-[#d0d0d0] active:retro-border-inset">
          View
        </button>
        <button className="retro-border-outset px-2 py-0.5 text-xs font-bold hover:bg-[#d0d0d0] active:retro-border-inset">
          Insert
        </button>
        <button className="retro-border-outset px-2 py-0.5 text-xs font-bold hover:bg-[#d0d0d0] active:retro-border-inset">
          Format
        </button>
        <div className="h-5 w-px bg-gray-400 mx-1"></div>
        <div className="flex items-center gap-1 bg-white retro-border-inset px-2">
          <span className="text-[10px]">Times New Roman</span>
          <span className="text-xs">▼</span>
        </div>
        <div className="flex items-center gap-1 bg-white retro-border-inset px-2">
          <span className="text-[10px]">12</span>
          <span className="text-xs">▼</span>
        </div>
      </div>

      {/* Document Body */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-[#808080]">
        <div className="bg-white w-full max-w-[800px] min-h-[1000px] shadow-2xl p-12 font-serif text-black leading-normal">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">
              Tyler Palmer
            </h1>
            <p className="text-sm">
              Fort Lauderdale, FL
            </p>
            <p className="text-sm italic">
             Senior Product Manager
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-tight">
              Summary
            </h2>
            <p className="text-sm">
              Senior Product Manager with 6+ years leading SaaS, E-Commerce, Marketplace, and Integrated Services. Proven ability to
              translate complex business and operations workflows into
              scalable product solutions. Experienced in e-commerce, payments,
              integrations, and user experience optimization across web and
              mobile. Passionate about building and launching products from 0→1
              that empower teams and organizations to operate efficiently on and
              off the field.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-tight">
              Experience
            </h2>

            <div className="mb-5">
              <div className="flex justify-between font-bold text-sm">
                <span>Snap! Mobile Inc. — Senior Product Manager</span>
                <span>Nov 2019 – Present | Fort Lauderdale, FL</span>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm mt-2 space-y-1">
                <li>
                  Leading strategy and execution for SaaS products powering athletic fundraising, e-commerce, and team management across the Snap! ecosystem.
                </li>
                <li>
                  Led end-to-end delivery of SaaS products used by thousands of athletic programs nationwide, overseeing integrations, payments, and reporting systems supporting $20M+ in annual transactions.
                </li>
                <li>
                  Partnered with finance and engineering to build compliant payment and payout workflows with integrated KYC/KYB verification, improving reconciliation accuracy and reducing settlement times by 35%.
                </li>
                <li>
                  Defined product roadmaps for multi-platform experiences (web and mobile), enhancing team conversion and retention through data-driven insights.
                </li>
                <li>
                  Managed third-party integrations for logistics, payment gateways, and analytics tools, ensuring scalable, compliant, and secure product operations.
                </li>
                <li>
                  Owned live-platform operations, including backlog triage, prioritization, and SLA management, reducing customer issue resolution time by 40%.
                </li>
                <li>
                  Conducted discovery sessions with coaches, athletic directors, and program admins to map team funding workflows, improving campaign setup efficiency by 25%.
                </li>
                <li>
                  Created prioritization frameworks and agile cadences to align cross-functional teams with business OKRs, improving roadmap predictability by 30%.
                </li>
                <li>
                  Owned API requirements and 3rd party vendor documentation for internal and external integrations, improving communication and delivery velocity.
                </li>
                <li>
                  Functioned as lead PM in a lean, fast-paced environment, defining product processes, sprint cadences, and documentation standards from the ground up.
                </li>
              </ul>
              <div className="mt-3">
                <p className="font-bold text-sm mb-2">Key Achievements:</p>
                <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                  <li>Launched Snap! Mobile's first standalone business unit outside of digital fundraising | 0→1 e-commerce and SaaS platform featuring proprietary payment and payout infrastructure.</li>
                  <li>Increased user adoption, resulting in 350% revenue growth over 3 years.</li>
                  <li>Reduced project delivery time by 25% with improved agile methods.</li>
                  <li>Decreased manual finance workload by 50% through the implementation of automated verification and reconciliation flows integrated with NetSuite.</li>
                </ul>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between font-bold text-sm">
                <span>Blast Motion Inc. — Sales Manager</span>
                <span>Jun 2019 – Nov 2019</span>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm mt-2 space-y-1">
                <li>
                  Drove B2B SaaS partnerships with athletic organizations for wearable motion-tracking technology, contributing to $15M in annual revenue growth.
                </li>
                <li>
                  Collaborated with sports performance and engineering teams to deliver analytics-driven insights to athletic programs, improving data adoption and retention.
                </li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between font-bold text-sm">
                <span>The Grind House — Co-Owner</span>
                <span>Feb 2018 – Aug 2021</span>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm mt-2 space-y-1">
                <li>
                  Co-Owner of an SMB Sports Training Facility start-up, utilizing sport tech to enhance player development through rigorous training in a monthly subscription model.
                </li>
                <li>
                  Owned end-to-end digital operations, integrating CRM, marketing automation, and e-commerce systems to grow recurring revenue by 30%.
                </li>
                <li>
                  Implemented data-driven operational improvements that led to a 60% increase in overall business revenue.
                </li>
              </ul>
              <div className="mt-3">
                <p className="font-bold text-sm mb-2">Key Achievements:</p>
                <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                  <li>Scaled an SMB to $1M ARR in under 16 months by creating new growth and sales channels through product, marketing, and sales efforts.</li>
                  <li>Hired & Trained 15+ operational team members and trainers.</li>
                  <li>Sold and exited a profitable SMB in 40 months.</li>
                </ul>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between font-bold text-sm">
                <span>Snap! Mobile Inc. — Sales Rep/ Regional Sales Manager</span>
                <span>Apr 2016 – Jun 2018</span>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm mt-2 space-y-1">
                <li>
                  Scaled regional sales team from 4 to 32 representatives, driving annual revenue from $400K to $8M.
                </li>
                <li>
                  Developed sales enablement playbooks and onboarding systems, reducing ramp time by 30%.
                </li>
                <li>
                  Partnered cross-functionally with product and operations teams to translate sales feedback into roadmap features.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-tight">
              Education
            </h2>
            <div className="mb-3">
              <div className="flex justify-between font-bold text-sm">
                <span>University of Miami — B.S.Ed. Sport Administration/Management</span>
                <span>2012–2014</span>
              </div>
              <p className="text-xs italic mt-1 text-gray-700">
                NCAA Collegiate Baseball Player
              </p>
            </div>
            <div>
              <div className="flex justify-between font-bold text-sm">
                <span>University of Florida — B.S. Kinesiology and Exercise Science</span>
                <span>2011–2012</span>
              </div>
              <p className="text-xs italic mt-1 text-gray-700">
                NCAA Collegiate Baseball Player
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-tight">
              Key Expertise
            </h2>
            <p className="text-sm">
              Product Strategy · Payments · KYC/KYB Compliance · 0→1 Product Development · API Integrations · SaaS Platform Scaling · Stakeholder Alignment · Startup Environments
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-tight">
              Skills
            </h2>
            <p className="text-sm">
              Product Vision & Road-mapping · Customer Discovery · Stakeholder Alignment · Agile & Scrum · A/B Testing · Funnel Optimization · KPI & OKR Definition · Financial Operations · Cross-System Integrations · Cross-Functional Team Leadership · Vendor & Partner Management · Process Improvement · Technical Fluency (JavaScript, SQL, Node.js, Next.js, React, REST, GraphQL, AWS, GCP)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase tracking-tight">
              Tools
            </h2>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-bold mb-1">Product & Collaboration:</p>
                <p className="text-sm">Jira, Linear, Notion, Asana, Confluence, Airtable, Coda, Trello, GitHub, Figma</p>
              </div>
              <div>
                <p className="font-bold mb-1">Analytics & Finance:</p>
                <p className="text-sm">Posthog, Looker, Fullstory Tableau, GA4, GTM, SQL, NetSuite, Retool, Stripe</p>
              </div>
              <div>
                <p className="font-bold mb-1">CRM & Business Systems:</p>
                <p className="text-sm">HubSpot, Salesforce, NetSuite</p>
              </div>
            </div>
          </section>

          <div className="mt-20 text-[10px] text-gray-400 text-center italic border-t border-gray-100 pt-4">
            - End of Document - Printed on {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Footer / Status bar */}
      <div className="bg-[#c0c0c0] h-6 border-t border-white px-4 flex justify-between items-center text-[10px] shrink-0">
        <div className="flex gap-4">
          <span>Page 1</span>
          <span>Sec 1</span>
          <span>1/1</span>
        </div>
        <div className="flex gap-4">
          <span>REC</span>
          <span>TRK</span>
          <span>EXT</span>
          <span className="font-bold">OVR</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeApp;
