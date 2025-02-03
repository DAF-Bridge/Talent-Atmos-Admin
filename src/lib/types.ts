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
  prerequisite: string[];
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
};

export type JobFormValues = {
  id: number;
  title: string;
  prerequisite: string[];
  location: string;
  workplace: "remote" | "onsite" | "hybrid";
  work_type: "fulltime" | "parttime" | "volunteer" | "internship";
  career_stage: "entrylevel" | "midlevel" | "senior";
  period: string;
  description: string;
  qualifications: string;
  responsibilities: string;
  quantity: number;
  salary: number;
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
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  PicUrl: string;
  UserID: number;
  Bio: string;
};
