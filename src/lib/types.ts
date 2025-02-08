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
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    startTime: string;
    endTime?: string;
    price: string;
    picUrl: string;
    highlight: string;
    requirements: string;
    outcomes: Array<string>;
    timeline: Array<{ date: string; content: string }>;
    benefits: Array<string>;
    location: {
      name: string;
      map_url: string;
      image_url: string;
      lat: number;
      lng: number;
    };
    contact: Array<{ type: string; url: string }>;
    regLink: string;
  };
  organization: {
    id: number;
    name: string;
    picUrl: string;
  };
};

export type EventFormValues = {
  picUrl: string;
  name: string;
  description: string;
  location: string;
  province: string;
  country: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  latitude: string;
  longitude: string;
  price: string;
  regLink: string;
  status: "draft" | "published" | "";
  categories: { value: string; label: string }[];
  contactChannels: { type: string; url: string }[];
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

export type Job = {
  id: number;
  UpdatedAt: string;
  title: string;
  scope: string;
  workplace: "remote" | "onsite" | "hybrid";
  work_type: "fulltime" | "parttime" | "volunteer" | "internship";
  career_stage: "entrylevel" | "midlevel" | "senior";
  period: string;
  description: string;
  hours_per_day: string;
  qualifications: string;
  benefits: string;
  quantity: number;
  industry: string[];
  salary: number;
};

export type JobFormValues = {
  id: number;
  UpdatedAt: string;
  title: string;
  scope: string;
  prerequisite: { name: string; url: string }[];
  workplace: "remote" | "onsite" | "hybrid";
  work_type: "fulltime" | "parttime" | "volunteer" | "internship";
  career_stage: "entrylevel" | "midlevel" | "senior";
  period: string;
  description: string;
  hours_per_day: string;
  qualifications: string;
  benefits: string;
  quantity: number;
  salary: number;
  location: string;
  responsibilities: string;
  status: "draft" | "published" | "";
};

export type AuthContextType = {
  isAuth: boolean | null;
  userProfile: UserProfile | null;
  loading: boolean;
  setAuthState: () => void;
  removeAuthState: () => void;
};

export type UserProfile = {
  id: number; // userID
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  picUrl: string;
  language: string;
  role: string;
  updatedAt: string;
};

export interface JobCardProps {
  id: number;
  title: string;
  description: string;
  work_type: string;
  workplace: string;
  career_stage: string;
  province: string;
  country: string;
  salary: number;
  imgUrl?: string;
  updatedDate: string;
  orgName?: string;
  industry: string[];
  isBooked?: boolean;
}

export interface JobDescriptionPage extends JobCardProps {
  scope: string;
  prerequisite: { name: string; url: string }[];
  workplaceDesc?: string;
  hours_per_day: string;
  qualifications: string;
  benefits: string;
  quantity: number;
  period: string;
}
