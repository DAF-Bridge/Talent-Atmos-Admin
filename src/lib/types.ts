export type LanguageCode = "th" | "en";

export type Event = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  picUrl: string;
  location: string;
  latitude: number;
  longitude: number;
  price: string;
  category: string;
  organization: {
    id: number;
    name: string;
    picUrl: string;
  };
};

export type EventDescriptionProps = {
  event: {
    id: number;//
    name: string;//
    description: string;//
    startDate: string;//
    endDate?: string;//
    startTime: string;//
    endTime?: string;//
    price: string;
    picUrl: string;//
    highlight: string;//
    requirements: string;//
    outcomes: Array<string>;//
    timeline: Array<{ date: string; content: string }>;//
    benefits: Array<string>;//
    location: {
      name: string;//
      map_url: string;
      image_url: string;
      lat: number;//
      lng: number;//
    };
    contact: Array<{ type: string; url: string }>;//
    regLink: string;//
  };
  organization: {
    id: number;
    name: string;
    picUrl: string;
  };
};

export type Organization = {
  id: number;
  pic_url: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  industry: string[];
};

export interface JobCardProps {
  title: string;
  description: string;
  work_type: string;
  workplace: string;
  career_stage: string;
  province: string;
  country: string;
  salary: string;
  imgUrl?: string;
  updatedDate: string;
  orgName?: string;
  industry: string[];
  isBooked?: boolean;
}
