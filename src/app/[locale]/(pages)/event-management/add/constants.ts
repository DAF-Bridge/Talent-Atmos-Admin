type EventErrMsg = {
    name: {
      required: string;
      minVal: number;
      minLength: string;
      maxLength: string;
      maxVal: number;
    };
    picUrl: {
      required: string;
      fileSize: string;
      fileType: string;
    };
    description: {
      required: string;
      minVal: number;
      minLength: string;
      maxVal: number;
      maxLength: string;
    };
    categories: {
      required: string;
    };
    location: {
      required: string;
      minVal: number;
      minLength: string;
    };
    province: {
      required: string;
    };
    country: {
      required: string;
    };
    startDate: {
      required: string;
    };
    startTime: {
      required: string;
    };
    endTime: {
      required: string;
    };
    latitude: {
      required: string;
      pattern: {
        value: RegExp;
        message: string;
      };
    };
    longitude: {
      required: string;
      pattern: {
        value: RegExp;
        message: string;
      };
    };
    price: {
      required: string;
    };
    regLink: {
      required: string;
      pattern: {
        value: RegExp;
        message: string;
      };
    };
    contactChannels: {
      type: {
        required: string;
      };
      url: {
        pattern: {
          value: RegExp;
          message: string;
        };
        required: string;
      };
    };
  };

  export const eventErrMsg: EventErrMsg = {
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
        value: /^-?([0-8]?\d|90)(\.\d+)?$/,
        message: "Invalid latitude",
      },
    },
    longitude: {
      required: "Longitude is required",
      pattern: {
        value: /^-?([0-8]?\d|90)(\.\d+)?$/,
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