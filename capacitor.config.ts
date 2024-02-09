import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.deel.payslips2",
  appName: "deel-payslips",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
