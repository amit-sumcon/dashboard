import * as Yup from "yup";

export const assignTaskSchema = Yup.object({
  planned: Yup.string()
    .required("Please select a date.")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
  name: Yup.string().required("Task name is required."),
  freq: Yup.string()
    .oneOf(["D", "W", "M", "Y"], "Invalid frequency.")
    .required("Frequency is required."),
  department: Yup.string().required("Department is required."),
  doerEmail: Yup.string()
    .email("Invalid email address.")
    .required("Doer's email is required."),
  doerName: Yup.string().required("Doer's name is required."),
});
