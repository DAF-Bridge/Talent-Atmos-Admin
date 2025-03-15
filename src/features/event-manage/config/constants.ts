export const eventErrMsg = {
  name: {
    required: "Event name is required",
    minVal: 3,
    minLength: "Event name must be at least 3 characters long",
    maxLength: "Event name cannot exceed 100 characters",
    maxVal: 100,
  },
  picUrl: {
    required: "Event poster is required",
    fileSize: "File size must be less than 10MB",
    fileType: "Only JPEG and PNG files are allowed",
  },
  description: {
    required: "Event description is required",
    minVal: 10,
    minLength: "Description must be at least 10 characters long",
    maxVal: 5000,
    maxLength: "Description cannot exceed 5000 characters",
  },
  categories: {
    required: "One category is required",
  },
  location: {
    required: "Location name is required",
    minVal: 2,
    minLength: "Location must be at least 2 characters long",
  },
  province: {
    required: "Province is required",
  },
  country: {
    required: "Country is required",
  },
  startDate: {
    required: "Start date is required",
  },
  startTime: {
    required: "Start time is required",
  },
  endTime: {
    required: "End time is required",
  },
  latitude: {
    required: "Latitude is required",
    pattern: {
      value: /^-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
      message: "Invalid latitude",
    },
  },
  longitude: {
    required: "Longitude is required",
    pattern: {
      value: /^-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
      message: "Invalid longitude",
    },
  },
  price: {
    required: "Price type is required",
  },
  regLink: {
    required: "Registration link is required",
    pattern: {
      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]+)*\/?$/,
      message: "Invalid URL format",
    },
  },
  contactChannels: {
    type: {
      required: "Channel type is required",
    },
    url: {
      pattern: {
        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]+)*\/?$/,
        message: "Invalid URL format",
      },
      required: "Channel URL is required",
    },
  },
};

export type TEventErrMsg = typeof eventErrMsg;
