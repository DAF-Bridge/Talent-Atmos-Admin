export const jobErrMsg = {
  title: { required: "Title is required" },
  responsibilities: {
    required: "Responsibilities is required",
    minVal: 10,
    minLength: "Responsibilities must be at least 10 characters long",
    maxVal: 2000,
    maxLength: "Responsibilities cannot exceed 2000 characters",
  },
  location: { required: "Location is required" },
  province: { required: "Province is required" },
  country: { required: "Country is required" },
  workplace: { required: "Workplace is required" },
  workType: { required: "Work type is required" },
  careerStage: { required: "Career stage is required" },
  period: { required: "Period is required" },
  categories: { required: "At least 1 category is required" },
  regLink: {
    required: "Registration link is required",
    pattern: {
      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]+)*\/?$/,
      message: "Invalid URL format",
    },
  },
  description: {
    required: "Description is required",
    minVal: 10,
    minLength: "Description must be at least 10 characters long",
    maxVal: 5000,
    maxLength: "Description cannot exceed 5000 characters",
  },
  qualifications: {
    required: "Qualifications is required",
    minVal: 10,
    minLength: "Qualifications must be at least 10 characters long",
    maxVal: 2000,
    maxLength: "Qualifications cannot exceed 2000 characters",
  },
  benefits: { required: "Benefits is required" },
  quantity: { required: "Quantity is required" },
  salary: { required: "Salary is required" },
};

export type JobErrMsg = typeof jobErrMsg;
