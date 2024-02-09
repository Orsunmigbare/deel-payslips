import { Payslip } from "types/api";
import styles from "./styles.module.css"
import { IonItem, IonImg } from "@ionic/react";

export const Card = (props: Payslip) => {
    return (
        <IonItem className={styles.cardCont} lines={"none"} detail={false} href={`/payslip/${props.id}`}>
            <div className={styles.card}>
                <div className={styles.info}>
                    <h3 className={styles.infoTitle}>Payslip for {new Date(props.fromDate).toDateString()} to {new Date(props.toDate).toDateString()}</h3>
                    <div className={styles.infoDesc}>Click to for details</div>
                </div>
                <div className={styles.preview}>
                    <figure>
                        <IonImg className={styles.previewImg}
                            src={props.file} alt="payslip"
                        ></IonImg>
                        <figcaption>Payslip for {new Date(props.fromDate).toDateString()} to {new Date(props.toDate).toDateString()} </figcaption>
                    </figure>
                </div>
            </div>
        </IonItem>
    )
}