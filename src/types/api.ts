export type Payslip = {
  id: string;
  fromDate: string;
  toDate: string;
  file: string;
};

export type PayslipsResponse = {
  data: Payslip[];
  message: string;
  code: number;
};

export type PayslipResponse = {
  data: Payslip;
  message: string;
  code: number;
};

export enum responseStatus {
  success = "Success",
  error = "error",
}
