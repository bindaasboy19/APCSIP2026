export const ATTACK_SCENARIOS = [
  {
    id: 'sim-swap',
    title: 'SIM Swap Attack',
    summary: 'A fraudster hijacks the mobile number tied to OTP delivery and account recovery.',
    impactLevel: 'High',
    exposureLevel: 'High',
    exposureScore: 85,
    steps: [
      'The attacker gathers leaked identity fragments and phone-linked recovery clues.',
      'They impersonate the victim with the telecom provider and request a SIM reissue or number port.',
      'OTP and recovery messages begin landing on the attacker-controlled device.',
      'The attacker resets credentials and attempts access to UPI and banking services.',
    ],
    attackFlow: [
      {
        title: 'Information Gathering',
        description: 'The attacker gathers leaked identity fragments and phone-linked recovery clues.',
      },
      {
        title: 'Social Engineering',
        description: 'They impersonate the victim with the telecom provider and request a SIM reissue or number port.',
      },
      {
        title: 'Interception',
        description: 'OTP and recovery messages begin landing on the attacker-controlled device.',
      },
      {
        title: 'Access Exploitation',
        description: 'The attacker resets credentials and attempts access to UPI and banking services.',
      },
    ],
    impact: [
      'Unauthorized financial transactions',
      'Loss of recovery channel control',
      'Credential compromise across multiple apps',
    ],
    mitigation: [
      'Enable SIM lock / PIN protection',
      'Set up multi-factor authentication on email',
      'Regularly monitor active mobile connections',
    ],
  },
  {
    id: 'identity-theft',
    title: 'Identity Theft',
    summary: 'A criminal assembles a believable identity bundle to open or access services in the victim name.',
    impactLevel: 'High',
    exposureLevel: 'High',
    exposureScore: 75,
    steps: [
      'Breached fragments from email, phone, and finance ecosystems are aggregated.',
      'The attacker assembles a convincing identity profile with enough detail to pass lightweight verification.',
      'That profile is used to enroll in services or reset existing access.',
      'The compromised identity is reused for scams, fraudulent onboarding, or account misuse.',
    ],
    attackFlow: [
      {
        title: 'Data Aggregation',
        description: 'Breached fragments from email, phone, and finance ecosystems are aggregated.',
      },
      {
        title: 'Profile Assembly',
        description: 'The attacker assembles a convincing identity profile with enough detail to pass lightweight verification.',
      },
      {
        title: 'Account Enrolment',
        description: 'That profile is used to enroll in services or reset existing access.',
      },
      {
        title: 'Illicit Reuse',
        description: 'The compromised identity is reused for scams, fraudulent onboarding, or account misuse.',
      },
    ],
    impact: [
      'Damage to personal credit scores',
      'Financial liabilities from fake accounts',
      'Legal and identity cleanup complications',
    ],
    mitigation: [
      'Regularly check credit bureau reports',
      'Freeze credit profiles during inactivity',
      'Secure personal identity records',
    ],
  },
  {
    id: 'loan-fraud',
    title: 'Loan Fraud',
    summary: 'A fraudster uses a compromised identity footprint to apply for instant credit or micro-loans.',
    impactLevel: 'High',
    exposureLevel: 'High',
    exposureScore: 90,
    steps: [
      'The attacker identifies a victim profile likely to pass lightweight lending checks.',
      'Loan applications are submitted using harvested identity details and linked recovery channels.',
      'Verification hurdles are bypassed using OTP interception or weak security controls.',
      'Funds are disbursed and extracted while the debt remains tied to the victim identity.',
    ],
    attackFlow: [
      {
        title: 'Victim Profiling',
        description: 'The attacker identifies a victim profile likely to pass lightweight lending checks.',
      },
      {
        title: 'Application Submission',
        description: 'Loan applications are submitted using harvested identity details and linked recovery channels.',
      },
      {
        title: 'Verification Bypass',
        description: 'Verification hurdles are bypassed using OTP interception or weak security controls.',
      },
      {
        title: 'Disbursement',
        description: 'Funds are disbursed and extracted while the debt remains tied to the victim identity.',
      },
    ],
    impact: [
      'Unrecognized debts tied to your name',
      'Harassment from debt collection agencies',
      'Negative impact on borrowing capacity',
    ],
    mitigation: [
      'Enable strict banking alert notifications',
      'Implement 2FA on primary mobile/email',
      'Audit open loans regularly',
    ],
  },
]
