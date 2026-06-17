export const INTERACTIVE_SCENARIOS = [
  {
    id: 'sim-swap',
    title: 'SIM Swap Playback',
    summary: 'Evaluate vulnerability to telecom number takeover attempts.',
    stages: [
      {
        text: 'You receive an urgent phone call claiming to be your telecom operator. They ask for Aadhaar verification to prevent immediate network disconnection.',
        options: [
          { value: 'reject', label: 'Refuse to share details and hang up', riskDelta: 0 },
          { value: 'share', label: 'Share simulated details to stay connected', riskDelta: 25 },
        ],
      },
      {
        text: 'A notification pops up on your screen indicating a replacement SIM card swap request has been initialized.',
        options: [
          { value: 'cancel', label: 'Decline / cancel request immediately', riskDelta: 0 },
          { value: 'approve', label: 'Approve swap / ignore notification', riskDelta: 25 },
        ],
      },
    ],
    outcomes: {
      'reject_cancel': {
        outcome: 'Successful Defence',
        description: 'You verified details out-of-band and stopped the number takeover attempt. The attacker failed to hijack your line.',
        riskAdded: 0,
        severity: 'Low',
        chain: ['Aadhaar leak attempt rejected', 'SIM swap cancelled', 'Fraud prevented'],
      },
      'share_approve': {
        outcome: 'Critical Takeover',
        description: 'Attackers hijacked your active number, intercepted verification codes, and accessed linked bank accounts.',
        riskAdded: 50,
        severity: 'Critical',
        chain: ['Aadhaar details shared', 'SIM swap approved by attacker', 'Bank OTPs hijacked', 'Account takeover complete'],
      },
      'default': {
        outcome: 'Partial Exposure',
        description: 'Attackers gathered identity elements but could not fully lock you out. Recovery steps are required.',
        riskAdded: 25,
        severity: 'Medium',
        chain: ['Aadhaar elements exposed', 'SIM swap blocked or delayed', 'Creds flagged for reset'],
      },
    },
  },
  {
    id: 'loan-fraud',
    title: 'Loan Fraud Playback',
    summary: 'Evaluate risk of identity theft for micro-lending disbursement.',
    stages: [
      {
        text: 'You click a social media banner promising instant, paperless credit using digital verification.',
        options: [
          { value: 'close', label: 'Close page immediately', riskDelta: 0 },
          { value: 'login', label: 'Log in with simulated profile credentials', riskDelta: 20 },
        ],
      },
      {
        text: 'The phishing portal asks to verify your recovery credentials without multi-factor verification active.',
        options: [
          { value: 'enable', label: 'Abort and activate two-step verification', riskDelta: 0 },
          { value: 'skip', label: 'Skip security checks and proceed', riskDelta: 25 },
        ],
      },
    ],
    outcomes: {
      'close_enable': {
        outcome: 'Secure Profile',
        description: 'You closed the phishing site and secured your accounts. Your identity remains safe.',
        riskAdded: 0,
        severity: 'Low',
        chain: ['Phishing link ignored', 'Two-step verification activated', 'Credit profile safe'],
      },
      'login_skip': {
        outcome: 'Loan Disbursement Fraud',
        description: 'Attackers successfully applied for and received multiple instant micro-loans in your name, leaving you with the liability.',
        riskAdded: 45,
        severity: 'Critical',
        chain: ['Phishing credentials stolen', 'Security checks skipped', 'Instant loan approved', 'Funds transferred to third-party'],
      },
      'default': {
        outcome: 'Profile Compromised',
        description: 'Attackers gathered credential hashes, but could not complete the loan disbursement due to security blocks.',
        riskAdded: 20,
        severity: 'High',
        chain: ['Credentials exposed', 'Disbursement blocked', 'Security audit required'],
      },
    },
  },
  {
    id: 'mule-acc',
    title: 'Mule Account Playback',
    summary: 'Evaluate risk of bank account leasing and fraud network routing.',
    stages: [
      {
        text: 'A remote job offer asks you to lease your unused bank account for simulated international processing in exchange for commission.',
        options: [
          { value: 'refuse', label: 'Decline job offer immediately', riskDelta: 0 },
          { value: 'link', label: 'Link unused bank account', riskDelta: 30 },
        ],
      },
      {
        text: 'The client requests that you disable transaction limit notifications on your linked payment app.',
        options: [
          { value: 'limit', label: 'Keep limit controls active', riskDelta: 0 },
          { value: 'disable', label: 'Disable limits for higher commission', riskDelta: 25 },
        ],
      },
    ],
    outcomes: {
      'refuse_limit': {
        outcome: 'Mule Risk Neutralized',
        description: 'You refused to rent out your credentials. Your bank links remain clean.',
        riskAdded: 0,
        severity: 'Low',
        chain: ['Offer declined', 'Account limits maintained', 'No mule involvement'],
      },
      'link_disable': {
        outcome: 'Money Laundering Compromise',
        description: 'Your bank accounts were leased and utilized immediately to route multiple illicit transactions, making you legally liable.',
        riskAdded: 55,
        severity: 'Critical',
        chain: ['Bank account leased', 'Alert limits disabled', 'Illicit fund forwarding active', 'Account flagged by law enforcement'],
      },
      'default': {
        outcome: 'Vulnerable Links',
        description: 'You leased access details, but transaction routing was limited due to active notifications.',
        riskAdded: 30,
        severity: 'High',
        chain: ['Bank account leased', 'Limits blocked large transfers', 'Account flagged for review'],
      },
    },
  },
]
