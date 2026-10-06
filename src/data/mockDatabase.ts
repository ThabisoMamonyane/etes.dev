import {
  Person,
  Organisation,
  TrustDimensionSummary,
  TrustSignal,
  TrustGap,
  PerceptionGap,
  TriggerSensorAggregated,
  DataRoomDocument,
  AuditLogEntry,
  TrustJourneyMilestone
} from '../types';

export const SAMPLE_ORGANISATIONS: Organisation[] = [
  {
    id: 'org-vanguard-01',
    legal_name: 'Vanguard Logistics Group (Pty) Ltd',
    trading_name: 'Vanguard Logistics SA',
    reg_number: '2018/449102/07',
    industry: 'Freight, Supply Chain & Intermodal Transport',
    headquarters: 'Sandton, Johannesburg, South Africa',
    hierarchy_level: 'group',
    certification_status: 'current',
    certification_number: 'ETES-CERT-2026-ZA09',
    certified_since: '2024-11-15',
    valid_until: '2027-11-14',
    last_cycle_date: 'Oct 2026',
    employee_count: 1240
  },
  {
    id: 'org-apex-02',
    legal_name: 'Apex Mining & Minerals Resources Ltd',
    trading_name: 'Apex Minerals',
    reg_number: '2015/098311/06',
    industry: 'Natural Resources & Extraction',
    headquarters: 'Rustenburg, North West, South Africa',
    hierarchy_level: 'group',
    certification_status: 'current',
    certification_number: 'ETES-CERT-2025-ZA44',
    certified_since: '2025-03-01',
    valid_until: '2028-02-28',
    last_cycle_date: 'Aug 2026',
    employee_count: 3850
  },
  {
    id: 'org-meridian-03',
    legal_name: 'Meridian Health & Life Sciences Group',
    trading_name: 'Meridian Healthcare',
    reg_number: '2019/332140/07',
    industry: 'Healthcare, Clinical Trials & Pharmaceuticals',
    headquarters: 'Cape Town, Western Cape, South Africa',
    hierarchy_level: 'group',
    certification_status: 'in_review',
    certification_number: 'ETES-REV-2026-088',
    certified_since: '2023-09-10',
    valid_until: '2026-09-09',
    last_cycle_date: 'May 2026',
    employee_count: 890
  },
  {
    id: 'org-horizon-04',
    legal_name: 'Horizon Digital Fintech Solutions Ltd',
    trading_name: 'Horizon Fintech',
    reg_number: '2021/771923/07',
    industry: 'Financial Technology & Payments',
    headquarters: 'Rosebank, Johannesburg, South Africa',
    hierarchy_level: 'group',
    certification_status: 'expired',
    certification_number: 'ETES-CERT-2024-ZA12',
    certified_since: '2023-01-15',
    valid_until: '2025-01-14',
    last_cycle_date: 'Nov 2024',
    employee_count: 310
  }
];

// Pre-defined personas to simulate the multi-relationship architecture
const PUBLIC_GUEST_PERSONA: Person = {
  id: 'per-public-001',
  verified_identity_ref: 'VID-PUBLIC-VISITOR',
  full_name: 'Institutional Guest',
  email: 'visitor@public-domain.org',
  title: 'Public Observer & Researcher',
  mfa_enabled: false,
  relationships: [
    {
      id: 'rel-public-01',
      person_id: 'per-public-001',
      organisation_name: 'National Trust Registry (Public Access)',
      relationship_type: 'public',
      status: 'active',
      started_at: '2026-09-01',
      role: {
        id: 'role-public-guest',
        relationship_id: 'rel-public-01',
        role_name: 'Public Visitor',
        permission_set: ['public:view', 'directory:search', 'constitution:read']
      },
      scope: {
        id: 'scope-public-01',
        role_id: 'role-public-guest',
        scope_type: 'enterprise_wide',
        scope_target_name: 'Publicly Authorised Disclosures'
      }
    }
  ]
};

export const SIMULATED_PERSONAS: { [key: string]: Person } = {
  public: PUBLIC_GUEST_PERSONA,
  public_guest: PUBLIC_GUEST_PERSONA,
  employee: {
    id: 'per-sindi-101',
    verified_identity_ref: 'VID-ZA-891002-KHU',
    full_name: 'Sindi Khumalo',
    email: 's.khumalo@vanguardlogistics.co.za',
    title: 'Fleet Operations Coordinator',
    mfa_enabled: true,
    relationships: [
      {
        id: 'rel-emp-01',
        person_id: 'per-sindi-101',
        organisation_id: 'org-vanguard-01',
        organisation_name: 'Vanguard Logistics Group',
        relationship_type: 'employee',
        status: 'active',
        started_at: '2023-02-01',
        role: {
          id: 'role-emp',
          relationship_id: 'rel-emp-01',
          role_name: 'Verified Staff Member',
          permission_set: ['assessment:participate', 'privacy:inspect', 'trust_journey:view']
        },
        scope: {
          id: 'scope-emp-01',
          role_id: 'role-emp',
          scope_type: 'branch',
          scope_target_name: 'Inland Depot - Jet Park'
        }
      }
    ]
  },
  ceo: {
    id: 'per-arthur-202',
    verified_identity_ref: 'VID-ZA-760412-MTH',
    full_name: 'Dr. Arthur Mthembu',
    email: 'a.mthembu@vanguardlogistics.co.za',
    title: 'Group Chief Executive Officer',
    mfa_enabled: true,
    relationships: [
      {
        id: 'rel-exec-ceo',
        person_id: 'per-arthur-202',
        organisation_id: 'org-vanguard-01',
        organisation_name: 'Vanguard Logistics Group',
        relationship_type: 'executive',
        status: 'active',
        started_at: '2021-06-01',
        role: {
          id: 'role-ceo',
          relationship_id: 'rel-exec-ceo',
          role_name: 'Chief Executive Officer',
          permission_set: ['executive:view_all', 'signals:inspect', 'dna:inspect', 'actions:manage', 'reports:export']
        },
        scope: {
          id: 'scope-ceo-all',
          role_id: 'role-ceo',
          scope_type: 'enterprise_wide',
          scope_target_name: 'Vanguard Logistics Group (All 1,240 Employees)'
        }
      }
    ]
  },
  director: {
    id: 'per-elena-303',
    verified_identity_ref: 'VID-ZA-831120-ROS',
    full_name: 'Elena Rostova',
    email: 'e.rostova@vanguardlogistics.co.za',
    title: 'Managing Director — Intermodal Freight BU',
    mfa_enabled: true,
    relationships: [
      {
        id: 'rel-exec-dir',
        person_id: 'per-elena-303',
        organisation_id: 'org-vanguard-01',
        organisation_name: 'Vanguard Logistics Group',
        relationship_type: 'executive',
        status: 'active',
        started_at: '2022-09-15',
        role: {
          id: 'role-dir',
          relationship_id: 'rel-exec-dir',
          role_name: 'Business Unit Director',
          permission_set: ['executive:view_scoped', 'signals:inspect', 'dna:inspect_scoped']
        },
        scope: {
          id: 'scope-dir-bu',
          role_id: 'role-dir',
          scope_type: 'business_unit',
          scope_target_name: 'Intermodal Freight Division (380 Employees)'
        }
      }
    ]
  },
  investor: {
    id: 'per-marcus-404',
    verified_identity_ref: 'VID-UK-772911-VAN',
    full_name: 'Marcus Vance',
    email: 'm.vance@aegiscap.co.uk',
    title: 'Managing Partner — Aegis Capital Infrastructure Fund',
    mfa_enabled: true,
    relationships: [
      {
        id: 'rel-inv-01',
        person_id: 'per-marcus-404',
        organisation_name: 'ETES Institutional Holdings',
        relationship_type: 'investor',
        status: 'active',
        started_at: '2026-01-10',
        role: {
          id: 'role-inv-verified',
          relationship_id: 'rel-inv-01',
          role_name: 'Approved Institutional Investor (Tier 2)',
          permission_set: ['investor:view_dashboard', 'data_room:access_tier2', 'documents:watermarked_view']
        },
        scope: {
          id: 'scope-inv-01',
          role_id: 'role-inv-verified',
          scope_type: 'enterprise_wide',
          scope_target_name: 'ETES Holding Entity'
        }
      }
    ]
  },
  admin: {
    id: 'per-tariq-505',
    verified_identity_ref: 'VID-ETES-0004-ADM',
    full_name: 'Tariq Al-Mansoor',
    email: 'tariq.governance@etes.org',
    title: 'Registrar & Chief Governance Officer',
    mfa_enabled: true,
    relationships: [
      {
        id: 'rel-admin-01',
        person_id: 'per-tariq-505',
        organisation_name: 'ETES Digital Headquarters™ Authority',
        relationship_type: 'admin',
        status: 'active',
        started_at: '2025-01-01',
        role: {
          id: 'role-admin-cgo',
          relationship_id: 'rel-admin-01',
          role_name: 'ETES Institutional Administrator',
          permission_set: ['admin:full_governance', 'question_bank:manage', 'content:publish', 'audit:inspect']
        },
        scope: {
          id: 'scope-admin-01',
          role_id: 'role-admin-cgo',
          scope_type: 'enterprise_wide',
          scope_target_name: 'All Registered Entities & Instruments'
        }
      }
    ]
  },
  community: {
    id: 'per-thabo-606',
    verified_identity_ref: 'VID-ZA-910815-KHO',
    full_name: 'Thabo Ndlovu',
    email: 'thabo.ndlovu@nexusdesign.co.za',
    title: 'SME Founder & Lead Technologist — Nexus Innovations',
    mfa_enabled: true,
    relationships: [
      {
        id: 'rel-comm-01',
        person_id: 'per-thabo-606',
        organisation_name: 'Nexus Innovations (Pty) Ltd',
        relationship_type: 'community',
        status: 'active',
        started_at: '2026-02-01',
        role: {
          id: 'role-comm-member',
          relationship_id: 'rel-comm-01',
          role_name: 'Verified Community Entrepreneur',
          permission_set: ['community:access', 'opportunities:view_apply', 'resources:download', 'events:register']
        },
        scope: {
          id: 'scope-comm-01',
          role_id: 'role-comm-member',
          scope_type: 'enterprise_wide',
          scope_target_name: 'ETES Thrive Community Network™'
        }
      }
    ]
  },
  contractor: {
    id: 'per-kagiso-707',
    verified_identity_ref: 'VID-ZA-880524-KAG',
    full_name: 'Kagiso Sithole',
    email: 'kagiso.sithole@sithole-digital.co.za',
    title: 'Senior Enterprise Solutions Architect & Independent Contractor',
    mfa_enabled: true,
    relationships: [
      {
        id: 'rel-contractor-01',
        person_id: 'per-kagiso-707',
        organisation_name: 'Sithole Advisory & Technical Architecture (Sole Prop / CIPC Reg: 2021/894021/07)',
        relationship_type: 'contractor',
        status: 'active',
        started_at: '2025-06-15',
        role: {
          id: 'role-contractor-lead',
          relationship_id: 'rel-contractor-01',
          role_name: 'Verified Independent Contractor & Enterprise Specialist',
          permission_set: [
            'contractor:profile_edit',
            'engagements:manage',
            'deliverables:submit',
            'escrow:view_request',
            'reviews:request_view',
            'growth:participate'
          ]
        },
        scope: {
          id: 'scope-contractor-01',
          role_id: 'role-contractor-lead',
          scope_type: 'enterprise_wide',
          scope_target_name: 'Active Enterprise Engagements & Escrow Trust'
        }
      }
    ]
  }
};

// Aliases for granular or generic persona referencing
SIMULATED_PERSONAS['employee_lerato'] = SIMULATED_PERSONAS.employee;
SIMULATED_PERSONAS['executive'] = SIMULATED_PERSONAS.ceo;
SIMULATED_PERSONAS['executive_thabo'] = SIMULATED_PERSONAS.ceo;
SIMULATED_PERSONAS['executive_johan'] = SIMULATED_PERSONAS.director;
SIMULATED_PERSONAS['investor_marcus'] = SIMULATED_PERSONAS.investor;
SIMULATED_PERSONAS['community_thabo'] = SIMULATED_PERSONAS.community;
SIMULATED_PERSONAS['community_member'] = SIMULATED_PERSONAS.community;
SIMULATED_PERSONAS['contractor_kagiso'] = SIMULATED_PERSONAS.contractor;
SIMULATED_PERSONAS['contractor_freelancer'] = SIMULATED_PERSONAS.contractor;
SIMULATED_PERSONAS['admin_naledi'] = SIMULATED_PERSONAS.admin;

// Distinct individual identity records (deduplicated for unique table keys)
export const DISTINCT_PERSONAS: Person[] = [
  PUBLIC_GUEST_PERSONA,
  SIMULATED_PERSONAS.employee,
  SIMULATED_PERSONAS.ceo,
  SIMULATED_PERSONAS.director,
  SIMULATED_PERSONAS.investor,
  SIMULATED_PERSONAS.community,
  SIMULATED_PERSONAS.contractor,
  SIMULATED_PERSONAS.admin,
];

// Executive Intelligence Dimension Data (Workplace DNA Profile™)
export const VANGUARD_DNA_DIMENSIONS: TrustDimensionSummary[] = [
  { id: 1, name: 'Leadership Integrity', short_code: 'LI', description: 'Consistency between executive words and actions, honest communication, and principled stewardship.', score: 76, prior_score: 71, national_benchmark: 68, direction: 'improving', confidence_interval: '±2.4' },
  { id: 2, name: 'Psychological Safety & Voice', short_code: 'PS', description: 'Ability to raise concerns, speak up, admit errors, and disagree without fear of retribution.', score: 54, prior_score: 59, national_benchmark: 64, direction: 'declining', confidence_interval: '±3.1' },
  { id: 3, name: 'Fairness & Organisational Justice', short_code: 'FJ', description: 'Consistent application of rules, equitable opportunity access, and transparent reward processes.', score: 62, prior_score: 61, national_benchmark: 66, direction: 'stable', confidence_interval: '±2.8' },
  { id: 4, name: 'Respect, Dignity & Belonging', short_code: 'RD', description: 'Treatment with fundamental human dignity regardless of role, status, or background.', score: 78, prior_score: 74, national_benchmark: 71, direction: 'improving', confidence_interval: '±2.2' },
  { id: 5, name: 'Communication & Transparency', short_code: 'CT', description: 'Timely, candid, and reliable dissemination of decisions, change reasons, and uncertainties.', score: 67, prior_score: 65, national_benchmark: 63, direction: 'improving', confidence_interval: '±2.6' },
  { id: 6, name: 'Accountability & Responsiveness', short_code: 'AR', description: 'Executive follow-through, holding authority accountable, and resolving raised issues.', score: 58, prior_score: 56, national_benchmark: 62, direction: 'stable', confidence_interval: '±3.0' },
  { id: 7, name: 'Growth, Recognition & Opportunity', short_code: 'GR', description: 'Fair capability building, credible non-symbolic recognition, and meritocratic progression.', score: 63, prior_score: 60, national_benchmark: 65, direction: 'improving', confidence_interval: '±2.9' },
  { id: 8, name: 'Health, Safety, Wellbeing & Sustainable Work', short_code: 'HS', description: 'Genuine protection of physical safety, sustainable workload limits, and mental wellbeing.', score: 71, prior_score: 68, national_benchmark: 70, direction: 'improving', confidence_interval: '±2.5' },
  { id: 9, name: 'Manager & Team Trust', short_code: 'MT', description: 'Constructive direct management, reliability of peers, and day-to-day work environment fairness.', score: 81, prior_score: 75, national_benchmark: 72, direction: 'improving', confidence_interval: '±2.1' },
  { id: 10, name: 'Organisational Confidence & Advocacy', short_code: 'OA', description: 'Long-term resilience, advocacy comfort, and holistic belief in the institution.', score: 74, prior_score: 70, national_benchmark: 67, direction: 'improving', confidence_interval: '±2.4' }
];

// Scoped Business Unit DNA Profile for Elena Rostova (Intermodal Freight BU)
export const VANGUARD_BU_DNA_DIMENSIONS: TrustDimensionSummary[] = [
  { id: 1, name: 'Leadership Integrity', short_code: 'LI', description: 'Consistency between executive words and actions, honest communication, and principled stewardship.', score: 71, prior_score: 69, national_benchmark: 68, direction: 'stable', confidence_interval: '±3.8' },
  { id: 2, name: 'Psychological Safety & Voice', short_code: 'PS', description: 'Ability to raise concerns, speak up, admit errors, and disagree without fear of retribution.', score: 48, prior_score: 55, national_benchmark: 64, direction: 'declining', confidence_interval: '±4.2' },
  { id: 3, name: 'Fairness & Organisational Justice', short_code: 'FJ', description: 'Consistent application of rules, equitable opportunity access, and transparent reward processes.', score: 58, prior_score: 59, national_benchmark: 66, direction: 'stable', confidence_interval: '±3.9' },
  { id: 4, name: 'Respect, Dignity & Belonging', short_code: 'RD', description: 'Treatment with fundamental human dignity regardless of role, status, or background.', score: 74, prior_score: 72, national_benchmark: 71, direction: 'improving', confidence_interval: '±3.4' },
  { id: 5, name: 'Communication & Transparency', short_code: 'CT', description: 'Timely, candid, and reliable dissemination of decisions, change reasons, and uncertainties.', score: 62, prior_score: 61, national_benchmark: 63, direction: 'stable', confidence_interval: '±3.6' },
  { id: 6, name: 'Accountability & Responsiveness', short_code: 'AR', description: 'Executive follow-through, holding authority accountable, and resolving raised issues.', score: 52, prior_score: 54, national_benchmark: 62, direction: 'declining', confidence_interval: '±4.0' },
  { id: 7, name: 'Growth, Recognition & Opportunity', short_code: 'GR', description: 'Fair capability building, credible non-symbolic recognition, and meritocratic progression.', score: 59, prior_score: 58, national_benchmark: 65, direction: 'stable', confidence_interval: '±3.7' },
  { id: 8, name: 'Health, Safety, Wellbeing & Sustainable Work', short_code: 'HS', description: 'Genuine protection of physical safety, sustainable workload limits, and mental wellbeing.', score: 66, prior_score: 65, national_benchmark: 70, direction: 'stable', confidence_interval: '±3.5' },
  { id: 9, name: 'Manager & Team Trust', short_code: 'MT', description: 'Constructive direct management, reliability of peers, and day-to-day work environment fairness.', score: 79, prior_score: 74, national_benchmark: 72, direction: 'improving', confidence_interval: '±3.2' },
  { id: 10, name: 'Organisational Confidence & Advocacy', short_code: 'OA', description: 'Long-term resilience, advocacy comfort, and holistic belief in the institution.', score: 69, prior_score: 68, national_benchmark: 67, direction: 'stable', confidence_interval: '±3.6' }
];

// Trust Signals™
export const VANGUARD_TRUST_SIGNALS: TrustSignal[] = [
  {
    id: 'sig-01',
    name: 'Voice Confidence Declining',
    dimension: 'Psychological Safety & Voice',
    direction: 'declining',
    evidence_note: 'Employees across operations report hesitation in challenging operational deadlines without fearing negative consequences.',
    scope_level: 'Enterprise-wide (Operations Concentration)',
    detected_cycle: 'Oct 2026',
    is_public_approved: false
  },
  {
    id: 'sig-02',
    name: 'Manager Trust Improving',
    dimension: 'Manager & Team Trust',
    direction: 'improving',
    evidence_note: 'Day-to-day supervisory consistency improved by +6.0 points following line-manager coaching initiatives.',
    scope_level: 'Enterprise-wide',
    detected_cycle: 'Oct 2026',
    is_public_approved: true
  },
  {
    id: 'sig-03',
    name: 'Pay Trust Divergence',
    dimension: 'Fairness & Organisational Justice',
    direction: 'divergent',
    evidence_note: 'Divergence identified between logistics support staff (44%) and corporate head office (78%) on compensation transparency.',
    scope_level: 'Business Unit vs Corporate',
    detected_cycle: 'Oct 2026',
    is_public_approved: false
  },
  {
    id: 'sig-04',
    name: 'Leadership Integrity Stable',
    dimension: 'Leadership Integrity',
    direction: 'stable',
    evidence_note: 'Confidence in executive consistency sustained at 76%, anchored by quarterly town hall candidness.',
    scope_level: 'Enterprise-wide',
    detected_cycle: 'Oct 2026',
    is_public_approved: true
  },
  {
    id: 'sig-05',
    name: 'Dignity & Respect Strengthening',
    dimension: 'Respect, Dignity & Belonging',
    direction: 'improving',
    evidence_note: 'Broad agreement (78%) that workforce members across all levels are treated with human dignity.',
    scope_level: 'Enterprise-wide',
    detected_cycle: 'Oct 2026',
    is_public_approved: true
  }
];

// Areas Requiring Attention: Trust Gaps & Perception Gaps
export const VANGUARD_TRUST_GAPS: TrustGap[] = [
  {
    id: 'gap-01',
    dimension: 'Psychological Safety & Voice',
    title: 'Employee Voice & Retaliation Hesitation',
    direction: 'declining',
    comparison_context: 'Current evidence indicates employees feel less able to raise difficult concerns than leadership expects (54% vs 84%).',
    confidence_evidence_note: 'Substantiated by 482 responses with high statistical confidence (p < 0.01). Concentrated in depot operations.',
    scope: 'Enterprise-wide'
  },
  {
    id: 'gap-02',
    dimension: 'Fairness & Organisational Justice',
    title: 'Opportunity Allocation & Promotion Clarity',
    direction: 'stable',
    comparison_context: 'Perception that career development is occasionally influenced by personal rapport rather than transparent assessment criteria.',
    confidence_evidence_note: 'Emerging pattern across middle-tier technical roles.',
    scope: 'Technical & Logistics Fleet'
  }
];

export const VANGUARD_PERCEPTION_GAPS: PerceptionGap[] = [
  {
    id: 'pg-01',
    title: 'Psychological Safety: Leadership vs Workforce',
    dimension: 'Psychological Safety & Voice',
    leadership_perspective: 84,
    employee_perspective: 52,
    analysis_note: 'Leadership assumes open door policy guarantees safety; workforce reports apprehension regarding subsequent performance reviews. Do not average away this divergence.',
    affected_scope: 'Enterprise-wide'
  },
  {
    id: 'pg-02',
    title: 'Accountability for Operational Shortfalls',
    dimension: 'Accountability & Responsiveness',
    leadership_perspective: 78,
    employee_perspective: 55,
    analysis_note: 'Executive team believes systemic errors receive thorough follow-through; operational frontline perceives isolated quick-fixes without root-cause resolution.',
    affected_scope: 'Intermodal Freight BU'
  }
];

// Aggregated Trigger Sensor Panel (Heightened Sensitivity, strictly pre-aggregated, small-n suppression)
export const VANGUARD_TRIGGER_SENSORS_AGGREGATED: TriggerSensorAggregated[] = [
  {
    sensor_id: 'TS-06',
    family: 'Retaliation Concern',
    concern_level: 'Elevated',
    evidence_state: 'Substantiated Signal',
    defensible_prevalence: '8.4% of respondents expressed hesitation',
    trend: 'improving',
    affected_dimensions: ['Psychological Safety & Voice', 'Accountability & Responsiveness'],
    lifecycle_state: 'Leadership Dialogue',
    recommended_response: 'Establish neutral institutional speak-up ombudsperson channel independent of regional depot managers.',
    suppressed_due_to_n: false
  },
  {
    sensor_id: 'TS-07',
    family: 'Pay Trust & Reward Fairness',
    concern_level: 'Moderate',
    evidence_state: 'Emerging Pattern',
    defensible_prevalence: '14.2% report lack of clarity on shift allowances',
    trend: 'stable',
    affected_dimensions: ['Fairness & Organisational Justice'],
    lifecycle_state: 'Governed Inquiry',
    recommended_response: 'Publish standardized shift bonus calculation matrix in simple local languages.',
    suppressed_due_to_n: false
  },
  {
    sensor_id: 'TS-09',
    family: 'Wellbeing & Shift Fatigue Strain',
    concern_level: 'Moderate',
    evidence_state: 'Emerging Pattern',
    defensible_prevalence: '11.8% cite driver rest-schedule compression',
    trend: 'improving',
    affected_dimensions: ['Health, Safety, Wellbeing & Sustainable Work'],
    lifecycle_state: 'Action Agreed',
    recommended_response: 'Restructure depot dispatch rosters to enforce mandatory 12-hour rest buffer.',
    suppressed_due_to_n: false
  },
  {
    sensor_id: 'TS-01',
    family: 'Sexual Harassment / Inappropriate Conduct',
    concern_level: 'Low',
    evidence_state: 'Under Observation',
    defensible_prevalence: '< 1.5% (Small-cohort suppression enforced to protect privacy)',
    trend: 'stable',
    affected_dimensions: ['Respect, Dignity & Belonging'],
    lifecycle_state: 'Governed Inquiry',
    recommended_response: 'Continuous safeguarding vigilance and independent external hotline verification.',
    suppressed_due_to_n: true
  }
];

// Governed Data Room Documents (Investor Room)
export const DATA_ROOM_DOCUMENTS: DataRoomDocument[] = [
  {
    id: 'doc-bp-01',
    title: 'ETES Institutional Business Plan — Investor Edition',
    category: 'Business Plan',
    version: 'v2.0',
    permission_tier: 'investor',
    download_allowed: true,
    watermark_required: true,
    last_updated: '2026-08-27',
    file_size: '3.4 MB',
    description: 'Comprehensive strategic plan, 5-year growth trajectory, institutional moat, pan-African rollout roadmap, and governance architecture.',
    security_hash: 'SHA256: 7f8a91c2...09e1'
  },
  {
    id: 'doc-fm-02',
    title: 'Financial Model V5 — Multi-Scenario Sensitivity Matrix',
    category: 'Financial Model',
    version: 'v5.0',
    permission_tier: 'investor_plus',
    download_allowed: false,
    watermark_required: true,
    last_updated: '2026-08-27',
    file_size: '2.1 MB',
    description: 'Three-statement audited forecasts, revenue mechanics per certification cycle, cohort retention metrics, and capital expenditure phasing.',
    security_hash: 'SHA256: 4e21b8a9...cc54'
  },
  {
    id: 'doc-const-03',
    title: 'ETES Founding Constitution & Institutional Charters',
    category: 'Constitution',
    version: 'v1.0',
    permission_tier: 'investor',
    download_allowed: true,
    watermark_required: false,
    last_updated: '2026-08-27',
    file_size: '1.2 MB',
    description: 'Irrevocable institutional principles, independence covenants, ethical governance boundaries, and public interest mandates.',
    security_hash: 'SHA256: a8b92c10...3312'
  },
  {
    id: 'doc-ip-04',
    title: 'Intellectual Property Register & Institutional Asset Catalog',
    category: 'IP Register',
    version: 'v1.0',
    permission_tier: 'data_room',
    download_allowed: false,
    watermark_required: true,
    last_updated: '2026-08-29',
    file_size: '4.8 MB',
    description: 'Trademarks, 60-item Founding Question Bank, Trigger Sensor methodology, Workplace DNA algorithmic weights, and copyright protections.',
    security_hash: 'SHA256: cb88102a...ff12'
  },
  {
    id: 'doc-gov-05',
    title: 'Digital Headquarters Governance Architecture & System Model',
    category: 'Governance',
    version: 'v1.0',
    permission_tier: 'data_room',
    download_allowed: false,
    watermark_required: true,
    last_updated: '2026-08-29',
    file_size: '2.9 MB',
    description: 'Six-phase digital headquarters roadmap, cryptographic audit protocols, small-n privacy bounds, and role-scope authorization architecture.',
    security_hash: 'SHA256: 91bfa332...55e0'
  }
];

// Append-only Audit Log (Security & Threat Model STRIDE repudiation mitigation)
export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-09-03 10:14:22 SAST',
    actor_name: 'Dr. Arthur Mthembu',
    actor_email: 'a.mthembu@vanguardlogistics.co.za',
    relationship_type: 'executive',
    action: 'SESSION_AUTHENTICATED_MFA',
    target_entity: 'Executive Room — Enterprise Scope',
    ip_address: '102.219.144.18 (Vodacom Business ZA)',
    details: 'MFA verified via hardware biometric authenticator. Session granted 4 hours.',
    classification: 'Strictly Governed'
  },
  {
    id: 'aud-002',
    timestamp: '2026-09-03 09:42:05 SAST',
    actor_name: 'Marcus Vance',
    actor_email: 'm.vance@aegiscap.co.uk',
    relationship_type: 'investor',
    action: 'DOCUMENT_VIEW_WATERMARKED',
    target_entity: 'Financial Model V5 (v5.0)',
    ip_address: '82.165.197.10 (City of London, UK)',
    details: 'View-only session initiated. Dynamic forensic watermark rendered: [m.vance@aegiscap.co.uk | 2026-09-03 09:42 | CONFIDENTIAL].',
    classification: 'Confidential'
  },
  {
    id: 'aud-003',
    timestamp: '2026-09-03 08:30:19 SAST',
    actor_name: 'Tariq Al-Mansoor',
    actor_email: 'tariq.governance@etes.org',
    relationship_type: 'admin',
    action: 'INSTRUMENT_VERSION_AUDIT',
    target_entity: 'Founding Question Bank V1.0 (60 Core Items, 12 Sensors)',
    ip_address: '196.25.1.1 (Cape Town Government / Tertiary Node)',
    details: 'Integrity hash verified against Volume 05 master repository. Zero discrepancies found.',
    classification: 'Restricted'
  },
  {
    id: 'aud-004',
    timestamp: '2026-09-02 16:15:40 SAST',
    actor_name: 'Elena Rostova',
    actor_email: 'e.rostova@vanguardlogistics.co.za',
    relationship_type: 'executive',
    action: 'SCOPED_DATA_ACCESS',
    target_entity: 'Workplace DNA Profile™ — Intermodal Freight BU',
    ip_address: '102.219.144.20 (Vanguard Depot Node)',
    details: 'Director scoped query executed. Access strictly bound to BU ID #bu-freight-02.',
    classification: 'Confidential'
  },
  {
    id: 'aud-005',
    timestamp: '2026-09-02 14:02:11 SAST',
    actor_name: 'System Governance Daemon',
    actor_email: 'daemon@etes.internal',
    relationship_type: 'admin',
    action: 'PUBLIC_PROFILE_GOVERNED_SYNC',
    target_entity: 'Vanguard Logistics Group (ETES-CERT-2026-ZA09)',
    ip_address: '127.0.0.1 (Local Core)',
    details: 'Approved public signals published to Trust Directory. Private response tables isolated.',
    classification: 'Public'
  }
];

// Vanguard Approved Public Trust Journey Milestones
export const VANGUARD_TRUST_JOURNEY: TrustJourneyMilestone[] = [
  {
    stage: 'You Said',
    period: 'Cycle 1 (Oct 2024)',
    theme: 'Fleet Maintenance & Night-Shift Communication',
    description: 'Drivers and depot operators reported delays in urgent vehicle maintenance sign-offs and fragmented communication during night rotations.',
    is_public_approved: true
  },
  {
    stage: 'We Heard',
    period: 'Nov 2024',
    theme: 'Executive Acknowledgement & Joint Workgroups',
    description: 'Executive leadership convened cross-functional depot listening circles to examine maintenance log procedures and night supervisor coverage.',
    is_public_approved: true
  },
  {
    stage: 'We Acted',
    period: 'Feb 2025',
    theme: 'Dedicated Tech Line & Shift Restructure',
    description: 'Commissioned 24/7 dedicated mobile technical maintenance response units and integrated automated digital vehicle pre-inspection logging.',
    is_public_approved: true
  },
  {
    stage: 'We Reassessed',
    period: 'Oct 2025',
    theme: 'Measurable Movement in Manager Trust',
    description: 'Manager and Team Trust improved by +6.0 points. Maintenance satisfaction increased from 42% to 77% across key depots.',
    is_public_approved: true
  },
  {
    stage: 'We Learned',
    period: 'Aug 2026',
    theme: 'Longitudinal Institutional Habit',
    description: 'Trust repair requires structural follow-through rather than symbolic corporate announcements. Communication transparency is now measured quarterly.',
    is_public_approved: true
  }
];
