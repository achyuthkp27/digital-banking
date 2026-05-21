export interface ProductContent {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description?: string }[];
  stats?: { value: string; label: string; trend?: string }[];
  sections: { title: string; content: string[] }[];
}

export const productContent: Record<string, ProductContent> = {
  "video-kyc": {
    slug: "video-kyc",
    title: "Video KYC",
    subtitle: "Secure remote verification using real-time video calls, document scanning, and AI-powered identity checks.",
    description: "A complete onboarding flow designed for fast, secure, and compliant remote verification. Secure remote verification using real-time video calls, document scanning, and AI-powered identity checks.",
    features: [
      { title: "AI Verification", description: "Automated verification signals for faster review and decisioning." },
      { title: "Live Video Banking", description: "Connect with bank officials via secure video call." },
      { title: "Secure Digital Onboarding", description: "Multi-layer checks to validate identity and reduce fraud risk." },
      { title: "Document Scanning", description: "Capture and verify documents in real time with guided capture." }
    ],
    sections: [
      {
        title: "Capabilities",
        content: [
          "Encrypted Sessions: Transport-layer security for live verification sessions.",
          "Fraud Signals: Heuristics and checks to detect suspicious patterns.",
          "Agent Review: Human-in-the-loop review with guided evidence capture.",
          "Tokenized Access: Secure access for verification steps and admin operations.",
          "Session Timelines: Track capture and review stages with clear milestones.",
          "Exportable Evidence: Generate reports and share proof-of-verification artifacts."
        ]
      }
    ]
  },
  "kiosk-banking": {
    slug: "kiosk-banking",
    title: "Kiosk Banking",
    subtitle: "Self-service kiosk experience for branches with secure guided flows for deposits, cards, and supported payments.",
    description: "A guided, secure self-service experience designed for fast and convenient branch transactions. 70% faster than traditional teller service, handling 200+ transactions per day.",
    features: [
      { title: "Touch Interface", description: "User-friendly touchscreen navigation." },
      { title: "Cash Acceptance", description: "Accept cash deposits and process withdrawals." },
      { title: "Cards Integration", description: "Seamless integration with card readers." },
      { title: "Passbook Printing", description: "Print statements and receipts instantly after transactions." }
    ],
    stats: [
      { value: "70%", label: "Faster Service" },
      { value: "200+", label: "Transactions/Day" },
      { value: "40%", label: "Cost Reduction" }
    ],
    sections: [
      {
        title: "Available Services",
        content: [
          "Cash withdrawal and deposits",
          "Account statement printing",
          "Cheque book requests",
          "PIN generation/reset",
          "Fund transfers (IMPS, NEFT)",
          "Fixed deposit opening",
          "Loan payment",
          "KYC updates"
        ]
      },
      {
        title: "Technical Specifications",
        content: [
          "Screen Size: 22\" Touchscreen",
          "Cash Handling: Up to 10,000 notes",
          "Print Speed: 50 receipts/hour",
          "Operating Hours: 24/7 Operation"
        ]
      }
    ]
  },
  "agent-banking": {
    slug: "agent-banking",
    title: "Agent Banking",
    subtitle: "A field-ready digital banking experience for agents: onboarding, cash handling, loan collections, and customer support.",
    description: "Optimized for responsive performance and field operations. Touch-optimized interface built specifically for tablet devices.",
    features: [
      { title: "Remote Onboarding", description: "Open accounts and activate services on-site." },
      { title: "Cash Handling", description: "Process deposits and withdrawals with on-spot confirmations." },
      { title: "Loan Collection", description: "Track and collect EMI payments and dues." },
      { title: "Offline Mode", description: "Continue operations without internet connectivity. Syncs securely when connectivity returns." }
    ],
    stats: [
      { value: "10K+", label: "Devices Deployed" },
      { value: "60%", label: "Faster Service" },
      { value: "3x", label: "More Transactions" },
      { value: "95%", label: "Customer Satisfaction" }
    ],
    sections: [
      {
        title: "Agent Capabilities",
        content: [
          "Account opening and KYC verification",
          "Cash and check deposits in the field",
          "Loan applications processing",
          "Insurance and investment product sales",
          "Funds transfer and Bill payments",
          "Digital document signing"
        ]
      },
      {
        title: "Agent Use Cases",
        content: [
          "Branch Assistance: Queue management and assisted transactions",
          "Field Operations: Door-step banking and rural outreach",
          "Relationship Management: Client meetings and portfolio review",
          "Customer Service: Digital forms, Video KYC, e-Signatures"
        ]
      }
    ]
  },
  "merchant-banking": {
    slug: "merchant-banking",
    title: "Merchant Banking",
    subtitle: "A complete merchant payment platform with POS/QR enablement, settlement dashboards, and transaction analytics.",
    description: "Enterprise-grade merchant platform offering real-time KPIs, instant status visibility for settlements, and multi-region configuration support.",
    features: [
      { title: "POS Enablement", description: "Integrate and manage point-of-sale flows across terminals." },
      { title: "QR Payments", description: "Dynamic/static QR acceptance experiences." },
      { title: "Settlement Tracking", description: "Reconciliation and settlement dashboards for easy tracking." },
      { title: "Transaction Insights", description: "Analytics and reporting for performance optimization." }
    ],
    sections: [
      {
        title: "Payments Hub",
        content: [
          "Card & UPI Acceptance: Unified payment acceptance across supported channels.",
          "QR Flow Management: Configure QR parameters, callbacks, and retry behaviors.",
          "POS Lifecycle: Enroll, manage, and monitor POS device activation.",
          "Refunds & Disputes: Track refund states and resolve disputes with audit logs."
        ]
      },
      {
        title: "Settings & Access Control",
        content: [
          "Admin-managed roles and permissions for merchant operations.",
          "Enforce secure callbacks, device rules, and audit trails.",
          "Handle multi-region settings and settlement rules.",
          "Configure API integrations, endpoints, and event subscriptions."
        ]
      }
    ]
  },
  "corporate-banking": {
    slug: "corporate-banking",
    title: "Corporate Banking Platform",
    subtitle: "Enterprise-grade digital solution streamlining corporate banking processes.",
    description: "By streamlining processes, reducing risk and offering convenience, Digital solutions are making it easier for Corporate customers to self-enroll and manage complex financial operations securely.",
    features: [
      { title: "Streamlined Processes", description: "Simplified corporate onboarding with digital automation." },
      { title: "Reduced Risk", description: "Enhanced security and compliance measures." },
      { title: "Convenience", description: "Self-enrollment capabilities for corporate customers." },
      { title: "Maker-Checker", description: "Dual Control principle to prevent mistakes, fraud, and misconduct." }
    ],
    stats: [
      { value: "50K+", label: "Corporate Clients" },
      { value: "$2T+", label: "Assets Under Management" },
      { value: "24/7", label: "Support & Service" },
      { value: "AAA", label: "Credit Rating" }
    ],
    sections: [
      {
        title: "Corporate Solutions",
        content: [
          "Treasury Management: Cash management, liquidity optimization, and forecasting",
          "Trade Finance: Letters of credit, bank guarantees, and documentary collections",
          "Corporate Loans: Working capital, term loans, and credit facilities",
          "Payments & Collections: Bulk payments, vendor management, and receivables",
          "Financial Analytics: Real-time reporting and business intelligence",
          "Risk Management: Hedging, derivatives, and FX risk mitigation"
        ]
      },
      {
        title: "Cash Management",
        content: [
          "Multi-account sweeping",
          "Notional pooling",
          "Zero balance accounts",
          "Virtual accounts"
        ]
      }
    ]
  },
  "retail-banking": {
    slug: "retail-banking",
    title: "Retail Internet Banking",
    subtitle: "Modern, contemporary web banking platform with comprehensive features and multi-lingual support.",
    description: "Responsive web-based banking portal accessible from any device. Customizable dashboard, widgets, and user preferences with support for 15+ languages and RTL.",
    features: [
      { title: "Web Platform", description: "Responsive web-based banking portal accessible from any device." },
      { title: "Personalization", description: "Customizable dashboard, widgets, and user preferences." },
      { title: "Multi-lingual", description: "Support for 15+ languages with RTL language support." },
      { title: "Multi-Factor Authentication", description: "Layered security with OTP, security questions, and device verification." }
    ],
    sections: [
      {
        title: "Accounts Management",
        content: [
          "Account listing with quick filters",
          "Account details and statement view",
          "Categorize and mark favorite transactions",
          "Advanced transaction search and filter",
          "Certified statements (PDF, HTML, Excel)"
        ]
      },
      {
        title: "Fund Transfers",
        content: [
          "IMPS (Immediate Payment Service)",
          "RTGS (Real Time Gross Settlement)",
          "NEFT (National Electronic Funds Transfer)",
          "International remittances",
          "Schedule, Recurring, and Repeat Transfers"
        ]
      },
      {
        title: "Deposits & Wealth Management",
        content: [
          "Fixed Deposits and Recurring Deposits",
          "Tax Saver Deposits",
          "Stock market investments and tracking",
          "Financial Investment Plans (FIP's)",
          "Complete portfolio overview and analysis"
        ]
      }
    ]
  },
  "retail-admin": {
    slug: "retail-admin",
    title: "Retail Internet Banking Admin",
    subtitle: "Comprehensive administrative dashboard for retail banking operations.",
    description: "A centralized hub for managing all retail banking operations, monitoring performance, and ensuring seamless customer experience across all channels with real-time KPI monitoring.",
    features: [
      { title: "Visual Data Display", description: "Comprehensive visual representation of all retail customer data at a glance." },
      { title: "Dashboard", description: "Track key performance indicators in real-time with interactive dashboards." },
      { title: "User & Access Management", description: "Centralized management of users, roles, and permissions." },
      { title: "Approval Workflows", description: "Maker-checker framework for secure approvals and validations." }
    ],
    stats: [
      { value: "125K+", label: "Active Users", trend: "+12%" },
      { value: "2.4M", label: "Transactions", trend: "+18%" },
      { value: "$45M", label: "Revenue", trend: "+24%" },
      { value: "99.2%", label: "Success Rate", trend: "+2%" }
    ],
    sections: [
      {
        title: "Admin Capabilities",
        content: [
          "Real-time transaction monitoring and analysis",
          "Customer account management and provisioning",
          "Fraud detection and security alerts",
          "Comprehensive financial analytics and reports",
          "Exportable reports for analysis and regulatory needs"
        ]
      }
    ]
  },
  "mobile-banking": {
    slug: "mobile-banking",
    title: "Mobile Banking Platform",
    subtitle: "Modern, contemporary mobile banking experience for iOS & Android with native performance.",
    description: "True native experience for both iOS and Android platforms with platform-specific optimizations, multi-lingual support, and enterprise-grade security.",
    features: [
      { title: "iOS & Android Native", description: "True native experience for both platforms with platform-specific optimizations." },
      { title: "Biometric Authentication", description: "Layered security with Face ID, Touch ID, and device verification." },
      { title: "Token-Based Auth", description: "Secure token-based authentication mechanism with auto-expiry." },
      { title: "Personalization", description: "Widget-driven, configurable dashboard with personalization capabilities." }
    ],
    sections: [
      {
        title: "Core Features",
        content: [
          "Complete view of all customer accounts",
          "Fast access to any specific account",
          "Easy access to recent transactions via mini statements",
          "Personalized offers, campaigns, and notifications",
          "Support for 15+ languages with RTL language support"
        ]
      },
      {
        title: "Payments & Transfers",
        content: [
          "IMPS, RTGS, NEFT, and AEPS support",
          "Instant fund transfer and scheduling capabilities",
          "Smart search across all fields for beneficiaries",
          "Phone book style interface for contact management",
          "Bill presentment and adhoc/scheduled payments"
        ]
      }
    ]
  },
  "two-factor-auth": {
    slug: "two-factor-auth",
    title: "Two-Factor Authentication",
    subtitle: "Advanced multi-factor authentication solution protecting against account takeovers and fraud.",
    description: "Enterprise security layer protecting against unauthorized access with biometric and PIN-based security. Digital banking is expected to hit $395 billion by 2026. Don't let fraudsters exploit your processes.",
    features: [
      { title: "Biometric Authentication", description: "Secure login using FaceID or Fingerprint recognition." },
      { title: "Liveness Detection", description: "Advanced liveness detection to prevent spoofing." },
      { title: "PIN Authentication", description: "Secure 4-6 digit PIN for quick access with auto-lock." },
      { title: "Real-Time Notifications", description: "Instantly approve or reject transactions directly from push notifications." }
    ],
    stats: [
      { value: "15B", label: "Stolen Passwords" },
      { value: "20%", label: "Rise in Takeovers" },
      { value: "93%", label: "Online Fraud" },
      { value: "$6.1B", label: "Losses in 2021" }
    ],
    sections: [
      {
        title: "Authentication Dashboard",
        content: [
          "Comprehensive dashboard for managing authentication requests.",
          "Complete user profile and account details.",
          "Pending Actions: Transactions awaiting approval or rejection.",
          "Completed Actions: History of approved and rejected transactions.",
          "Notification Requests: Real-time transaction approval notifications."
        ]
      },
      {
        title: "Notification Channels",
        content: [
          "Push Notifications via App",
          "SMS Alerts",
          "Email Notifications",
          "In-App Alerts"
        ]
      }
    ]
  }
};
