import { QuestionItem, TriggerSensorItem, QualitativePromptItem } from '../types';

export const QUESTION_BANK_VERSION = {
  version: '1.0',
  title: 'Founding Question Bank V1.0',
  status: 'Candidate Controlled Wording (Subject to Professional Validation)',
  effectiveDate: '2026-09-01',
  author: 'Employment Trust & Empowerment Solutions (ETES)',
  governanceNote: 'Protected Institutional IP (Volume 05 & Volume 09). Candidate wording rendered via instrument store. Not hard-coded into page templates.'
};

export const TRUST_DIMENSIONS_CONFIG = [
  { id: 1, name: 'Leadership Integrity', prefix: '01', count: 6, description: 'Consistency between executive words and actions, honest communication, and principled stewardship.' },
  { id: 2, name: 'Psychological Safety & Voice', prefix: '02', count: 6, description: 'Ability to raise concerns, speak up, admit errors, and disagree without fear of retribution or humiliation.' },
  { id: 3, name: 'Fairness & Organisational Justice', prefix: '03', count: 6, description: 'Consistent application of rules, equitable access to opportunity, and transparent reward processes.' },
  { id: 4, name: 'Respect, Dignity & Belonging', prefix: '04', count: 6, description: 'Treatment with fundamental human dignity regardless of role, status, or background.' },
  { id: 5, name: 'Communication & Transparency', prefix: '05', count: 6, description: 'Timely, candid, and reliable dissemination of decisions, change reasons, and uncertainties.' },
  { id: 6, name: 'Accountability & Responsiveness', prefix: '06', count: 6, description: 'Executive follow-through, holding authority accountable, and resolving raised issues.' },
  { id: 7, name: 'Growth, Recognition & Opportunity', prefix: '07', count: 6, description: 'Fair capability building, credible non-symbolic recognition, and meritocratic progression.' },
  { id: 8, name: 'Health, Safety, Wellbeing & Sustainable Work', prefix: '08', count: 6, description: 'Genuine protection of physical safety, sustainable workload limits, and mental wellbeing.' },
  { id: 9, name: 'Manager & Team Trust', prefix: '09', count: 6, description: 'Constructive direct management, reliability of peers, and day-to-day work environment fairness.' },
  { id: 10, name: 'Organisational Confidence & Advocacy', prefix: '10', count: 6, description: 'Long-term resilience, advocacy comfort, and holistic belief in the institution.' }
];

export const CORE_QUESTION_ITEMS: QuestionItem[] = [
  // 01. Leadership Integrity
  { id: '01.01', dimension_id: 1, dimension_name: 'Leadership Integrity', candidate_wording: 'Senior leaders generally act in ways that are consistent with what they say.', evidence_type: 'Structured response' },
  { id: '01.02', dimension_id: 1, dimension_name: 'Leadership Integrity', candidate_wording: 'I can rely on senior leaders to communicate honestly, including when the message is difficult.', evidence_type: 'Structured response' },
  { id: '01.03', dimension_id: 1, dimension_name: 'Leadership Integrity', candidate_wording: 'Leadership decisions are guided by clear principles rather than convenience or favouritism.', evidence_type: 'Structured response' },
  { id: '01.04', dimension_id: 1, dimension_name: 'Leadership Integrity', candidate_wording: 'Senior leaders take responsibility when their decisions cause problems.', evidence_type: 'Structured response' },
  { id: '01.05', dimension_id: 1, dimension_name: 'Leadership Integrity', candidate_wording: "I trust senior leaders to act in the organisation's long-term interests, not only their own.", evidence_type: 'Structured response' },
  { id: '01.06', dimension_id: 1, dimension_name: 'Leadership Integrity', candidate_wording: 'The behaviour of senior leaders gives me confidence in the integrity of this organisation.', evidence_type: 'Structured response' },

  // 02. Psychological Safety & Voice
  { id: '02.01', dimension_id: 2, dimension_name: 'Psychological Safety & Voice', candidate_wording: 'I can raise a concern about work without unreasonable fear of negative consequences.', evidence_type: 'Structured response' },
  { id: '02.02', dimension_id: 2, dimension_name: 'Psychological Safety & Voice', candidate_wording: 'I can disagree with a decision respectfully without being treated as disloyal.', evidence_type: 'Structured response' },
  { id: '02.03', dimension_id: 2, dimension_name: 'Psychological Safety & Voice', candidate_wording: 'People are able to admit mistakes here without being automatically humiliated or punished.', evidence_type: 'Structured response' },
  { id: '02.04', dimension_id: 2, dimension_name: 'Psychological Safety & Voice', candidate_wording: 'When employees speak up about a genuine problem, they are taken seriously.', evidence_type: 'Structured response' },
  { id: '02.05', dimension_id: 2, dimension_name: 'Psychological Safety & Voice', candidate_wording: 'I feel able to contribute ideas even when they challenge the usual way of doing things.', evidence_type: 'Structured response' },
  { id: '02.06', dimension_id: 2, dimension_name: 'Psychological Safety & Voice', candidate_wording: 'I trust that speaking honestly will not unfairly damage my future in this organisation.', evidence_type: 'Structured response' },

  // 03. Fairness & Organisational Justice
  { id: '03.01', dimension_id: 3, dimension_name: 'Fairness & Organisational Justice', candidate_wording: 'Rules and policies are applied consistently across employees in comparable situations.', evidence_type: 'Structured response' },
  { id: '03.02', dimension_id: 3, dimension_name: 'Fairness & Organisational Justice', candidate_wording: 'Important workplace decisions are made through processes I can regard as fair.', evidence_type: 'Structured response' },
  { id: '03.03', dimension_id: 3, dimension_name: 'Fairness & Organisational Justice', candidate_wording: 'Access to opportunities is not determined mainly by favouritism or personal connections.', evidence_type: 'Structured response' },
  { id: '03.04', dimension_id: 3, dimension_name: 'Fairness & Organisational Justice', candidate_wording: 'Pay and reward decisions are handled in a way that employees can reasonably understand and trust.', evidence_type: 'Structured response' },
  { id: '03.05', dimension_id: 3, dimension_name: 'Fairness & Organisational Justice', candidate_wording: 'When employees are treated unfairly, there is a credible way for the issue to be addressed.', evidence_type: 'Structured response' },
  { id: '03.06', dimension_id: 3, dimension_name: 'Fairness & Organisational Justice', candidate_wording: 'I believe this organisation tries to correct unfair outcomes when they become known.', evidence_type: 'Structured response' },

  // 04. Respect, Dignity & Belonging
  { id: '04.01', dimension_id: 4, dimension_name: 'Respect, Dignity & Belonging', candidate_wording: 'I am treated with basic dignity in this workplace.', evidence_type: 'Structured response' },
  { id: '04.02', dimension_id: 4, dimension_name: 'Respect, Dignity & Belonging', candidate_wording: 'People can belong here without having to hide important parts of who they are.', evidence_type: 'Structured response' },
  { id: '04.03', dimension_id: 4, dimension_name: 'Respect, Dignity & Belonging', candidate_wording: 'Respect is expected regardless of race, gender, sexuality, disability, age, background or position.', evidence_type: 'Structured response' },
  { id: '04.04', dimension_id: 4, dimension_name: 'Respect, Dignity & Belonging', candidate_wording: 'People in lower-status roles are treated with the same basic human respect as senior people.', evidence_type: 'Structured response' },
  { id: '04.05', dimension_id: 4, dimension_name: 'Respect, Dignity & Belonging', candidate_wording: 'I can be myself at work without expecting ridicule or degrading treatment.', evidence_type: 'Structured response' },
  { id: '04.06', dimension_id: 4, dimension_name: 'Respect, Dignity & Belonging', candidate_wording: 'This organisation creates a credible sense that different people are legitimate members of the workplace.', evidence_type: 'Structured response' },

  // 05. Communication & Transparency
  { id: '05.01', dimension_id: 5, dimension_name: 'Communication & Transparency', candidate_wording: 'Important information that affects employees is communicated in time to be useful.', evidence_type: 'Structured response' },
  { id: '05.02', dimension_id: 5, dimension_name: 'Communication & Transparency', candidate_wording: 'Leadership explains significant decisions sufficiently for people to understand the reasoning.', evidence_type: 'Structured response' },
  { id: '05.03', dimension_id: 5, dimension_name: 'Communication & Transparency', candidate_wording: 'Official communication is generally consistent with what employees later experience.', evidence_type: 'Structured response' },
  { id: '05.04', dimension_id: 5, dimension_name: 'Communication & Transparency', candidate_wording: 'When the organisation does not know something, it is willing to say so rather than create false certainty.', evidence_type: 'Structured response' },
  { id: '05.05', dimension_id: 5, dimension_name: 'Communication & Transparency', candidate_wording: 'Changes that affect people are communicated with appropriate candour.', evidence_type: 'Structured response' },
  { id: '05.06', dimension_id: 5, dimension_name: 'Communication & Transparency', candidate_wording: 'I trust the organisation’s formal communication enough to use it when making work-related decisions.', evidence_type: 'Structured response' },

  // 06. Accountability & Responsiveness
  { id: '06.01', dimension_id: 6, dimension_name: 'Accountability & Responsiveness', candidate_wording: 'People with authority are held accountable when they fail to meet important responsibilities.', evidence_type: 'Structured response' },
  { id: '06.02', dimension_id: 6, dimension_name: 'Accountability & Responsiveness', candidate_wording: 'Concerns do not simply disappear because they are uncomfortable for management.', evidence_type: 'Structured response' },
  { id: '06.03', dimension_id: 6, dimension_name: 'Accountability & Responsiveness', candidate_wording: 'When the organisation makes a commitment to employees, there is meaningful follow-through.', evidence_type: 'Structured response' },
  { id: '06.04', dimension_id: 6, dimension_name: 'Accountability & Responsiveness', candidate_wording: 'Problems are addressed by the people who have the authority to act on them.', evidence_type: 'Structured response' },
  { id: '06.05', dimension_id: 6, dimension_name: 'Accountability & Responsiveness', candidate_wording: 'Repeated failures receive more than temporary attention.', evidence_type: 'Structured response' },
  { id: '06.06', dimension_id: 6, dimension_name: 'Accountability & Responsiveness', candidate_wording: 'I can see a credible connection between issues raised and the organisation’s response.', evidence_type: 'Structured response' },

  // 07. Growth, Recognition & Opportunity
  { id: '07.01', dimension_id: 7, dimension_name: 'Growth, Recognition & Opportunity', candidate_wording: 'Employees have a fair chance to access development opportunities relevant to their work.', evidence_type: 'Structured response' },
  { id: '07.02', dimension_id: 7, dimension_name: 'Growth, Recognition & Opportunity', candidate_wording: 'Good work is recognised in ways that are credible rather than purely symbolic.', evidence_type: 'Structured response' },
  { id: '07.03', dimension_id: 7, dimension_name: 'Growth, Recognition & Opportunity', candidate_wording: 'Progression opportunities are communicated and allocated through processes I can understand.', evidence_type: 'Structured response' },
  { id: '07.04', dimension_id: 7, dimension_name: 'Growth, Recognition & Opportunity', candidate_wording: 'I trust that my future opportunities are not determined mainly by personal favour.', evidence_type: 'Structured response' },
  { id: '07.05', dimension_id: 7, dimension_name: 'Growth, Recognition & Opportunity', candidate_wording: 'The organisation supports people to build capability, not only to deliver immediate output.', evidence_type: 'Structured response' },
  { id: '07.06', dimension_id: 7, dimension_name: 'Growth, Recognition & Opportunity', candidate_wording: 'When opportunities are limited, the reasons and criteria are handled transparently enough to support trust.', evidence_type: 'Structured response' },

  // 08. Health, Safety, Wellbeing & Sustainable Work
  { id: '08.01', dimension_id: 8, dimension_name: 'Health, Safety, Wellbeing & Sustainable Work', candidate_wording: 'I trust the organisation to take genuine health and safety concerns seriously.', evidence_type: 'Structured response' },
  { id: '08.02', dimension_id: 8, dimension_name: 'Health, Safety, Wellbeing & Sustainable Work', candidate_wording: 'Work demands are managed with reasonable regard for human limits.', evidence_type: 'Structured response' },
  { id: '08.03', dimension_id: 8, dimension_name: 'Health, Safety, Wellbeing & Sustainable Work', candidate_wording: 'Employees can raise health or wellbeing risks without being treated as weak or troublesome.', evidence_type: 'Structured response' },
  { id: '08.04', dimension_id: 8, dimension_name: 'Health, Safety, Wellbeing & Sustainable Work', candidate_wording: 'When unsafe conditions are reported, appropriate action is taken.', evidence_type: 'Structured response' },
  { id: '08.05', dimension_id: 8, dimension_name: 'Health, Safety, Wellbeing & Sustainable Work', candidate_wording: 'The organisation does not routinely rely on unsustainable pressure as a normal way of operating.', evidence_type: 'Structured response' },
  { id: '08.06', dimension_id: 8, dimension_name: 'Health, Safety, Wellbeing & Sustainable Work', candidate_wording: 'I believe leadership considers the human consequences of how work is designed and resourced.', evidence_type: 'Structured response' },

  // 09. Manager & Team Trust
  { id: '09.01', dimension_id: 9, dimension_name: 'Manager & Team Trust', candidate_wording: 'My immediate manager treats me with respect.', evidence_type: 'Structured response' },
  { id: '09.02', dimension_id: 9, dimension_name: 'Manager & Team Trust', candidate_wording: 'I can rely on my manager to deal with me consistently.', evidence_type: 'Structured response' },
  { id: '09.03', dimension_id: 9, dimension_name: 'Manager & Team Trust', candidate_wording: 'My manager communicates expectations clearly enough for me to work with confidence.', evidence_type: 'Structured response' },
  { id: '09.04', dimension_id: 9, dimension_name: 'Manager & Team Trust', candidate_wording: 'Within my team, people can ask for help without unreasonable judgement.', evidence_type: 'Structured response' },
  { id: '09.05', dimension_id: 9, dimension_name: 'Manager & Team Trust', candidate_wording: 'Team members generally do what they say they will do.', evidence_type: 'Structured response' },
  { id: '09.06', dimension_id: 9, dimension_name: 'Manager & Team Trust', candidate_wording: 'I trust my immediate working environment to handle everyday problems fairly and constructively.', evidence_type: 'Structured response' },

  // 10. Organisational Confidence & Advocacy
  { id: '10.01', dimension_id: 10, dimension_name: 'Organisational Confidence & Advocacy', candidate_wording: 'Overall, I have confidence in this organisation as a place with which to maintain a working relationship.', evidence_type: 'Structured response' },
  { id: '10.02', dimension_id: 10, dimension_name: 'Organisational Confidence & Advocacy', candidate_wording: 'I would feel comfortable telling someone I respect that this organisation can be trusted in important workplace matters.', evidence_type: 'Structured response' },
  { id: '10.03', dimension_id: 10, dimension_name: 'Organisational Confidence & Advocacy', candidate_wording: 'When the organisation faces difficulty, I believe it is capable of responding responsibly.', evidence_type: 'Structured response' },
  { id: '10.04', dimension_id: 10, dimension_name: 'Organisational Confidence & Advocacy', candidate_wording: 'I can imagine remaining connected to this organisation if the trust conditions I experience continue.', evidence_type: 'Structured response' },
  { id: '10.05', dimension_id: 10, dimension_name: 'Organisational Confidence & Advocacy', candidate_wording: 'My experience gives me reason to believe the organisation can improve when evidence shows that change is needed.', evidence_type: 'Structured response' },
  { id: '10.06', dimension_id: 10, dimension_name: 'Organisational Confidence & Advocacy', candidate_wording: 'Taking everything together, I trust this organisation more than I distrust it.', evidence_type: 'Structured response' }
];

export const TRIGGER_SENSOR_ITEMS: TriggerSensorItem[] = [
  {
    id: 'TS-01',
    family: 'Sexual Harassment',
    candidate_trigger_question: 'During your relationship with this organisation, have you experienced conduct of a sexual nature that was unwelcome, coercive, intimidating, humiliating or made you feel unsafe?',
    governance_rule: 'Strict confidentiality. Never attributed to individuals. Governed as heightened-sensitivity evidence.'
  },
  {
    id: 'TS-02',
    family: 'Reporting Safety',
    candidate_trigger_question: 'If you experienced or witnessed sexual harassment here, how confident would you be that you could report it without retaliation or unfair harm?',
    governance_rule: 'Evaluates perceived barrier to reporting vs actual incident occurrence.'
  },
  {
    id: 'TS-03',
    family: 'Discrimination',
    candidate_trigger_question: 'Have you experienced workplace treatment that you believe was unfairly influenced by race, gender, sexuality, disability, age, nationality, pregnancy, religion or another aspect of identity?',
    governance_rule: 'Protected category. Pre-aggregated under small-n suppression rules.'
  },
  {
    id: 'TS-04',
    family: 'Identity Safety',
    candidate_trigger_question: 'Have you felt pressure to hide or change an important part of your identity in order to be treated fairly or safely at work?',
    governance_rule: 'Measures psychological assimilation strain.'
  },
  {
    id: 'TS-05',
    family: 'Bullying / Humiliation',
    candidate_trigger_question: 'Have you experienced repeated bullying, intimidation, degrading treatment or deliberate humiliation in this workplace?',
    governance_rule: 'Focus on repeated, systemic patterns vs isolated interpersonal friction.'
  },
  {
    id: 'TS-06',
    family: 'Retaliation',
    candidate_trigger_question: 'Have you experienced, witnessed or reasonably feared retaliation after raising a concern, reporting wrongdoing or challenging a decision?',
    governance_rule: 'Whistleblower-adjacent protection. Direct indicator of speaking-up integrity.'
  },
  {
    id: 'TS-07',
    family: 'Pay Trust',
    candidate_trigger_question: 'Do you have a serious concern that pay, reward or access to financial opportunity is being handled unfairly or inconsistently?',
    governance_rule: 'Evaluates structural equity concerns.'
  },
  {
    id: 'TS-08',
    family: 'Health & Safety',
    candidate_trigger_question: 'Have you been expected to work in conditions you believed posed a serious or avoidable risk to physical health or safety?',
    governance_rule: 'Physical hazard and operational duty of care.'
  },
  {
    id: 'TS-09',
    family: 'Wellbeing Risk',
    candidate_trigger_question: 'Have work demands or workplace conditions created a level of strain that you believe the organisation should urgently understand or address?',
    governance_rule: 'Burnout, unreasonable load, mental health indicators.'
  },
  {
    id: 'TS-10',
    family: 'Abuse of Authority',
    candidate_trigger_question: 'Have you experienced or witnessed a person using organisational power in a way that you believe was coercive, exploitative or seriously unfair?',
    governance_rule: 'Power asymmetry and supervisory boundary violations.'
  },
  {
    id: 'TS-11',
    family: 'Suppressed Voice',
    candidate_trigger_question: 'Is there a serious workplace issue that people are afraid to discuss openly because of who may be implicated or what may happen to them?',
    governance_rule: 'Identifies institutional silence and taboo operational failures.'
  },
  {
    id: 'TS-12',
    family: 'Other Serious Trust Condition',
    candidate_trigger_question: 'Is there another serious dignity, fairness, safety or trust concern that this assessment has not asked about?',
    governance_rule: 'Catch-all safeguarding sensor to uncover emerging institutional risks.'
  }
];

export const QUALITATIVE_PROMPTS: QualitativePromptItem[] = [
  {
    id: 'QR-01',
    prompt_text: 'If you want to, describe what happened in your own words. Please avoid naming other people unless the approved process specifically requires it.'
  },
  {
    id: 'QR-02',
    prompt_text: 'What effect did this experience have on your trust in the organisation or the people responsible for it?'
  },
  {
    id: 'QR-03',
    prompt_text: 'Did you try to raise or resolve the issue? If so, what happened after you did?'
  },
  {
    id: 'QR-04',
    prompt_text: 'What would need to change for you to believe this condition has genuinely improved?'
  },
  {
    id: 'QR-05',
    prompt_text: 'Is there anything ETES should understand about the context that a structured question could not capture?'
  }
];

// Part B - 25 Conditional Diagnostic Follow-ups (Volume 05 & Handover Pack)
export const DIAGNOSTIC_FOLLOW_UP_ITEMS = [
  // A. Progression, Acting Roles & Equal Opportunity (D-01 to D-05)
  {
    id: 'D-01',
    category: 'A',
    category_name: 'Progression, Acting Roles & Equal Opportunity',
    question_text: 'Have you been asked to perform duties materially above your substantive role without being given a fair opportunity to be considered for that higher position?',
    response_type: 'experience' as const,
    options: ['Yes', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-07', 'TS-10']
  },
  {
    id: 'D-02',
    category: 'A',
    category_name: 'Progression, Acting Roles & Equal Opportunity',
    question_text: 'Have you been expected to train, guide or support a person appointed into a role for which you believe you had relevant experience or capability, without receiving a clear explanation of why you were not considered?',
    response_type: 'experience' as const,
    options: ['Yes', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-07', 'TS-10']
  },
  {
    id: 'D-03',
    category: 'A',
    category_name: 'Progression, Acting Roles & Equal Opportunity',
    question_text: 'When higher-level vacancies become available, do you believe suitably experienced internal employees are given a credible opportunity to compete before external appointments are made?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-07', 'TS-10']
  },
  {
    id: 'D-04',
    category: 'A',
    category_name: 'Progression, Acting Roles & Equal Opportunity',
    question_text: 'Have you repeatedly taken on additional responsibility without appropriate recognition, title, development opportunity or compensation?',
    response_type: 'frequency' as const,
    options: ['Once', 'More than once', 'Ongoing', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-07', 'TS-09', 'TS-10']
  },
  {
    id: 'D-05',
    category: 'A',
    category_name: 'Progression, Acting Roles & Equal Opportunity',
    question_text: 'Do you believe promotion and succession decisions in your area are explained clearly enough for employees to understand what is required to progress?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-07']
  },

  // B. Race, Identity & Equal Treatment (D-06 to D-10)
  {
    id: 'D-06',
    category: 'B',
    category_name: 'Race, Identity & Equal Treatment',
    question_text: 'Do you believe your race, population group or another aspect of your identity has affected how fairly you have been treated in this organisation?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-04']
  },
  {
    id: 'D-07',
    category: 'B',
    category_name: 'Race, Identity & Equal Treatment',
    question_text: 'Have you felt that you must work harder than colleagues in comparable roles to receive similar recognition, credibility or opportunity?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-04']
  },
  {
    id: 'D-08',
    category: 'B',
    category_name: 'Race, Identity & Equal Treatment',
    question_text: 'Have you experienced or observed workplace decisions that appeared to apply different standards to people from different racial or identity groups?',
    response_type: 'experience' as const,
    options: ['Yes', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-04']
  },
  {
    id: 'D-09',
    category: 'B',
    category_name: 'Race, Identity & Equal Treatment',
    question_text: 'Do you feel equally respected and taken seriously in this organisation regardless of your race, background or identity?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-04']
  },
  {
    id: 'D-10',
    category: 'B',
    category_name: 'Race, Identity & Equal Treatment',
    question_text: 'Do you feel safe raising a concern about race or identity-based unfairness without fearing that you will be labelled, isolated or disadvantaged?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-04', 'TS-06']
  },

  // C. Gender, Sexuality & Belonging (D-11 to D-15)
  {
    id: 'D-11',
    category: 'C',
    category_name: 'Gender, Sexuality & Belonging',
    question_text: 'Do you believe your gender has affected your access to progression, recognition, pay, leadership opportunity or professional credibility in this organisation?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-01', 'TS-02', 'TS-03']
  },
  {
    id: 'D-12',
    category: 'C',
    category_name: 'Gender, Sexuality & Belonging',
    question_text: 'Do you believe your sexual orientation or gender identity could negatively affect how you are treated or the opportunities available to you here?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-04']
  },
  {
    id: 'D-13',
    category: 'C',
    category_name: 'Gender, Sexuality & Belonging',
    question_text: 'Have you felt pressure to hide, minimise or change an important part of your identity in order to feel safe, accepted or professionally secure at work?',
    response_type: 'experience' as const,
    options: ['Yes', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-03', 'TS-04']
  },
  {
    id: 'D-14',
    category: 'C',
    category_name: 'Gender, Sexuality & Belonging',
    question_text: 'Have you experienced comments, jokes, assumptions, exclusion or conduct related to gender or sexuality that affected your dignity, belonging or sense of safety?',
    response_type: 'frequency' as const,
    options: ['Once', 'More than once', 'Ongoing', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-01', 'TS-03', 'TS-05']
  },
  {
    id: 'D-15',
    category: 'C',
    category_name: 'Gender, Sexuality & Belonging',
    question_text: 'Would you feel safe reporting gender- or sexuality-related unfairness, harassment or exclusion without fearing retaliation or damage to your career?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-01', 'TS-02', 'TS-06']
  },

  // D. Pay, Reward & Economic Fairness (D-16 to D-20)
  {
    id: 'D-16',
    category: 'D',
    category_name: 'Pay, Reward & Economic Fairness',
    question_text: 'Do you understand the main factors used to determine pay, increases, bonuses or other financial rewards for people in roles comparable to yours?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-07']
  },
  {
    id: 'D-17',
    category: 'D',
    category_name: 'Pay, Reward & Economic Fairness',
    question_text: 'Do you have a serious concern that employees doing comparable work or carrying comparable responsibility may be rewarded differently without a clear and credible explanation?',
    response_type: 'experience' as const,
    options: ['Yes', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-07']
  },
  {
    id: 'D-18',
    category: 'D',
    category_name: 'Pay, Reward & Economic Fairness',
    question_text: 'If you take on acting or higher-level responsibilities, do you believe the organisation recognises and compensates that responsibility fairly?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-07', 'TS-10']
  },
  {
    id: 'D-19',
    category: 'D',
    category_name: 'Pay, Reward & Economic Fairness',
    question_text: 'Do you believe access to bonuses, allowances, overtime, commissions or other financial opportunities is handled consistently and transparently?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-07']
  },
  {
    id: 'D-20',
    category: 'D',
    category_name: 'Pay, Reward & Economic Fairness',
    question_text: 'Would you feel safe asking for an explanation or raising a concern if you believed your pay or reward was unfair?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-06', 'TS-07']
  },

  // E. Power, Voice, Harassment & Consequences (D-21 to D-25)
  {
    id: 'D-21',
    category: 'E',
    category_name: 'Power, Voice, Harassment & Consequences',
    question_text: 'Have you experienced or witnessed a person using organisational authority in a way that felt coercive, exploitative, humiliating or seriously unfair?',
    response_type: 'experience' as const,
    options: ['Yes', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-05', 'TS-10']
  },
  {
    id: 'D-22',
    category: 'E',
    category_name: 'Power, Voice, Harassment & Consequences',
    question_text: 'Have you experienced or witnessed unwelcome sexual conduct, sexual comments, pressure, intimidation or behaviour that made the workplace feel unsafe?',
    response_type: 'experience' as const,
    options: ['Yes', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-01', 'TS-02', 'TS-05']
  },
  {
    id: 'D-23',
    category: 'E',
    category_name: 'Power, Voice, Harassment & Consequences',
    question_text: 'Have you ever decided not to report a serious workplace concern because you feared retaliation, career damage, exclusion or being treated as a problem?',
    response_type: 'experience' as const,
    options: ['Yes', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-02', 'TS-06', 'TS-11']
  },
  {
    id: 'D-24',
    category: 'E',
    category_name: 'Power, Voice, Harassment & Consequences',
    question_text: 'After employees raise serious concerns, do you believe the organisation protects them from retaliation and follows through in a credible way?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-02', 'TS-06', 'TS-11']
  },
  {
    id: 'D-25',
    category: 'E',
    category_name: 'Power, Voice, Harassment & Consequences',
    question_text: 'Is there a serious workplace issue in your area that people commonly know about but are afraid to discuss openly because of who may be implicated or what may happen to them?',
    response_type: 'perception' as const,
    options: ['Yes', 'Partly', 'No', 'Unsure', 'Prefer not to answer'],
    trigger_sensor_ids: ['TS-06', 'TS-10', 'TS-11', 'TS-12']
  }
];
