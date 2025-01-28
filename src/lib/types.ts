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
