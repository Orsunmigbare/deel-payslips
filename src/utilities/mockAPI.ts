// @ts-ignore
import payslips from "mockData/payslips.json" assert { type: "json" };
import {
  responseStatus,
  PayslipResponse,
  PayslipsResponse,
  Payslip,
} from "../types/api";

export const fetchPayslips: (
  type?: responseStatus,
  duration?: number
) => Promise<PayslipsResponse> = (
  type = responseStatus.success,
  duration = 1500
) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (type === responseStatus.success) {
        res({
          data: payslips,
          message: "data fetched successfully",
          code: 200,
        });
      } else {
        rej(new Error("An Error occurred, please try again"));
      }
    }, duration);
  });

export const fetchPayslip: (
  id: Payslip["id"],
  type?: responseStatus,
  duration?: number
) => Promise<PayslipResponse> = (
  id,
  type = responseStatus.success,
  duration = 1500
) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (type === responseStatus.success) {
        const paySlip = payslips.find((slip) => slip.id === id)!;
        res({
          data: paySlip,
          message: "data fetched successfully",
          code: 200,
        });
      } else {
        rej(new Error("An Error occurred, please try again"));
      }
    }, duration);
  });
