export type RelationshipType = 'public' | 'employee' | 'executive' | 'investor' | 'community' | 'contractor' | 'admin';

export type ScopeType = 'enterprise_wide' | 'region' | 'business_unit' | 'branch';

export interface Scope {
  id: string;
  role_id: string;
  scope_type: ScopeType;
  scope_target_name: string;
  scope_target_id?: string;
}

export interface Role {
  id: string;
  relationship_id: string;
  role_name: string;
  permission_set: string[];
}

export interface Relationship {
  id: string;
  person_id: string;
  organisation_id?: string;
  organisation_name?: string;
  relationship_type: RelationshipType;
  status: 'active' | 'revoked' | 'expired';
  started_at: string;
  ended_at?: string;
  role: Role;
  scope?: Scope;
}

export interface Person {
  id: string;
  verified_identity_ref: string;
  full_name: string;
  email: string;
  title: string;
  mfa_enabled: boolean;
  relationships: Relationship[];
}

export interface Organisation {
  id: string;
  legal_name: string;
  trading_name?: string;
  reg_number: string;
  industry: string;
  headquarters: string;
  hierarchy_level: 'group' | 'national' | 'region' | 'business_unit' | 'branch';
  parent_organisation_id?: string;
  certification_status: 'current' | 'expired' | 'in_review' | 'not_certified';
  certification_number?: string;
  certified_since?: string;
  valid_until?: string;
  last_cycle_date: string;
  employee_count: number;
}

// Question Bank Types
export interface QuestionItem {
  id: string;
  dimension_id: number;
  dimension_name: string;
  candidate_wording: string;
  evidence_type: 'Structured response';
}

export interface TriggerSensorItem {
  id: string;
  family: string;
  candidate_trigger_question: string;
  governance_rule: string;
  diagnostic_category_key?: string;
}

export interface DiagnosticFollowUpItem {
  id: string; // D-01 to D-25
  category: 'A' | 'B' | 'C' | 'D' | 'E';
  category_name: string;
  question_text: string;
  response_type: 'experience' | 'perception' | 'frequency';
  options: string[];
  trigger_sensor_ids: string[]; // which TS-xx triggers this
}

export interface QualitativePromptItem {
  id: string;
  prompt_text: string;
}

export interface TrustDimensionSummary {
  id: number;
  name: string;
  short_code: string;
  description: string;
  score: number;
  prior_score: number;
  national_benchmark: number;
  direction: 'improving' | 'declining' | 'stable';
  confidence_interval: string;
}

export interface TrustSignal {
  id: string;
  name: string;
  dimension: string;
  direction: 'improving' | 'declining' | 'divergent' | 'stable';
  evidence_note: string;
  scope_level: string;
  detected_cycle: string;
  is_public_approved: boolean;
}

export interface TrustGap {
  id: string;
  dimension: string;
  title: string;
  direction: string;
  comparison_context: string;
  confidence_evidence_note: string;
  scope: string;
}

export interface PerceptionGap {
  id: string;
  title: string;
  dimension: string;
  leadership_perspective: number;
  employee_perspective: number;
  analysis_note: string;
  affected_scope: string;
}

export interface TriggerSensorAggregated {
  sensor_id: string;
  family: string;
  concern_level: 'Low' | 'Moderate' | 'Elevated' | 'Critical';
  evidence_state: 'Under Observation' | 'Emerging Pattern' | 'Substantiated Signal' | 'Resolved Context';
  defensible_prevalence: string;
  trend: 'improving' | 'declining' | 'stable';
  affected_dimensions: string[];
  lifecycle_state: 'Initial Detection' | 'Governed Inquiry' | 'Leadership Dialogue' | 'Action Agreed';
  recommended_response: string;
  suppressed_due_to_n: boolean;
}

export interface DataRoomDocument {
  id: string;
  title: string;
  category: 'Business Plan' | 'Financial Model' | 'Constitution' | 'IP Register' | 'Governance' | 'Updates';
  version: string;
  permission_tier: 'investor' | 'investor_plus' | 'data_room';
  download_allowed: boolean;
  watermark_required: boolean;
  last_updated: string;
  file_size: string;
  description: string;
  security_hash: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor_name: string;
  actor_email: string;
  relationship_type: RelationshipType;
  action: string;
  target_entity: string;
  ip_address: string;
  details: string;
  classification: 'Public' | 'Restricted' | 'Confidential' | 'Strictly Governed';
}

export interface TrustJourneyMilestone {
  stage: 'You Said' | 'We Heard' | 'We Acted' | 'We Reassessed' | 'We Learned';
  period: string;
  theme: string;
  description: string;
  is_public_approved: boolean;
}
