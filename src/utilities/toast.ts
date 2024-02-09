import { UseIonToastResult } from "@ionic/react";

export const showToast = (message: string, present: UseIonToastResult[0]) => {
  present({
    message,
    duration: 1500,
    position: "bottom",
  });
};
