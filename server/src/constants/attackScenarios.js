export const ATTACK_SCENARIOS = [
  {
    id: 'sim-swap',
    title: 'SIM Swap Attack',
    summary: 'A fraudster hijacks the mobile number used for OTPs and account recovery.',
    steps: [
      'The attacker collects identity fragments and phone-linked recovery clues.',
      'They impersonate the victim to the telecom provider and request a SIM reissue or number port.',
      'OTP and recovery messages begin landing on the attacker-controlled device.',
      'Credentials are reset and financial apps become easier to access.',
    ],
    finalImpact: 'OTP interception can lead to account takeover and unauthorized financial transactions.',
    impactLevel: 'High',
  },
  {
    id: 'identity-theft',
    title: 'Identity Theft',
    summary: 'A fraudster assembles a believable identity bundle to open or access services in the victim name.',
    steps: [
      'Breached fragments from email, phone, and finance ecosystems are aggregated.',
      'The attacker builds a convincing profile that can pass lightweight verification.',
      'That profile is used to open services, reset access, or bypass weak checks.',
      'The stolen identity is reused across scams or financial misuse.',
    ],
    finalImpact: 'The victim can face fake accounts, financial liabilities, and a long cleanup process.',
    impactLevel: 'High',
  },
  {
    id: 'loan-fraud',
    title: 'Loan Fraud',
    summary: 'A fraudster uses a compromised identity footprint to apply for instant credit or micro-loans.',
    steps: [
      'The attacker identifies a victim profile likely to pass lightweight lending checks.',
      'Loan applications are submitted using stolen identity details and linked recovery channels.',
      'Verification is bypassed using OTP interception or weak security practices.',
      'Funds are disbursed and extracted while the debt remains tied to the victim.',
    ],
    finalImpact: 'The victim may discover unrecognized debt, credit damage, and aggressive recovery follow-up.',
    impactLevel: 'High',
  },
]
