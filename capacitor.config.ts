import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.deel.payslips2",
  appName: "deel-payslips2",
  webDir: "dist",
  server: {
    url: "http://localhost:5173/",
    cleartext: true,
    androidScheme: "https",
  },
};

export default config;
