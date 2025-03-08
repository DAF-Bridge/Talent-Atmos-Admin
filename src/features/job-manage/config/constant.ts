// id: z.number().optional(),
//   title: z.string().min(1, { message: "Title is required" }),
//   scope: z.string().min(1, { message: "Scope is required" }),
//   prerequisite: z.array(z.string()).optional(),
//   location: z.string().min(1, { message: "Location is required" }),
//   workplace: z.enum(["remote", "onsite", "hybrid"], {
//     message: "Invalid workplace type",
//   }),
//   work_type: z.enum(["fulltime", "parttime", "volunteer", "internship"], {
//     message: "Invalid work type",
//   }),
//   career_stage: z.enum(["entrylevel", "midlevel", "senior"], {
//     message: "Invalid career stage",
//   }),
//   period: z.string().min(1, { message: "Period is required" }),
//   description: z.string().min(1, { message: "Description is required" }),
//   hours_per_day: z
//     .string()
//     .refine(
//       (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 24,
//       {
//         message: "Hours per day must be a number between 1 and 24",
//       }
//     ),
//   qualifications: z.string().min(1, { message: "Qualifications is required" }),
//   benefits: z.string().min(1, { message: "Benefits is required" }),
//   quantity: z.number().min(1, { message: "Quantity is required" }),
//   salary: z.number().min(1, { message: "Salary is required" }),

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
