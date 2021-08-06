import { createContext } from 'react';

interface Section {
  call_to_action: string;
  call_to_action_url: string;
  description: string;
  heading: string;
}

export interface Testimonial {
  name: string;
  occupation: string;
  quote: string;
}

export interface TitleDescription {
  description: string;
  title: string;
}

interface TitleList {
  items: string[];
  title: string;
}

export interface ContentfulPathLandingPageEntity {
  card_content: TitleList[];
  codecademy_id: string;
  content_item_ids: string[];
  cta_section: Section;
  differences: TitleDescription[];
  different_headline: string;
  header: Section;
  header_primary_color: string;
  header_secondary_color: string;
  other_career_path: TitleDescription;
  other_path_ids: string[];
  other_paths_headline: string;
  other_skill_path: TitleDescription;
  outcome_headline: TitleDescription;
  outcomes: TitleDescription[];
  projects_headline: string;
  shapes_fill_color: string;
  shapes_shadow_color: 'blue' | 'green' | 'pink' | 'purple';
  side_shapes_color: string;
  syllabus: Section;
  testimonial: Testimonial;
  title: string;
  upsell: Section;
  upsell_button_less: string;
  upsell_button_more: string;
  upsell_items: TitleDescription[];
  video_headline: string;
}

const emptySection = {
  heading: '',
  description: '',
  call_to_action: '',
  call_to_action_url: '',
};

export default createContext<Partial<ContentfulPathLandingPageEntity>>({
  cta_section: { ...emptySection },
  content_item_ids: [],
  header: { ...emptySection },
  other_path_ids: [],
  syllabus: { ...emptySection },
  upsell: { ...emptySection },
});
