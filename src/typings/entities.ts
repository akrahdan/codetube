export interface ProjectContentItem {
    title: string;
    tags: string[];
    type: 'project'
    id: string;
    thumbnail_url: string;
    description: string
    is_free: boolean,
}


export interface VideoContentItem {
  id: string;
  type: 'video';
  video_url: string;
  time: number;
  title: string;
}

export interface ContentItem {
    id: string;
    type: string;
    slug:string;
  }

export type ContentItemType = {
    
}