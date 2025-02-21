export type LanguageCode = "th" | "en";

export interface Event {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  picUrl: string;
  locationName: string;
  latitude: number;
  longitude: number;
  priceType: string;
  category: string;
  organization: {
    id: number;
    name: string;
    picUrl: string;
  };
}

export interface EventDescription extends Event {
  content: {
    html: string;
  };
  province: string;
  locationType: string;
  audience: string;
  status: "draft" | "published" | "";
}

export type EventFormValues = {
  picUrl: string;
  name: string;
  content: string;
  locationName: string;
  locationType: string;
  audience: string;
  province: string;
  country: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  latitude: string;
  longitude: string;
  priceType: string;
  registerLink: string;
  status: string;
  categories: [{ label: string; value: string }];
  contactChannels: { media: string; mediaLink: string }[];
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
  id: number;
  title: string;
  description: string;
  workplace: "remote" | "onsite" | "hybrid";
  work_type: "fulltime" | "parttime" | "volunteer" | "internship";
  career_stage: "entrylevel" | "midlevel" | "senior";
  hoursPerDay: string;
  period: string;
  quantity: number;
  province: string;
  country: string;
  salary: number;
  imgUrl?: string;
  UpdatedAt: string;
  orgName?: string;
  industry: string[];
}

export interface JobDescriptionPage extends JobCardProps {
  scope: string;
  prerequisite: { name: string; url: string }[];
  workplaceDesc?: string;
  qualifications: string;
  benefits: string;
}

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
