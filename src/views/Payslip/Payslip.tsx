import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonButtons,
    IonBackButton,
    IonImg,
    IonButton,
    IonSpinner,
    useIonToast,
} from '@ionic/react';
import { useParams } from 'react-router';
import { Payslip as IPayslip } from 'src/types/api';
import { useMockFetch } from 'src/hooks/useMockFetch';
import { useFileDownload } from 'src/hooks/useFileDownload';
import { Conditional } from 'src/components/Conditional/Conditional';
import { showToast } from 'src/utilities/toast';
import styles from "./styles.module.css"



type Param = {
    id: string
}

type FetchResponse = {
    loading: boolean;
    data: IPayslip
}




function Payslip() {
    let { id } = useParams<Param>();
    const [present] = useIonToast();
    const { loading, data: slip }: FetchResponse = useMockFetch("payslip", id);
    const { download, loading: downloading } = useFileDownload()

    const onDownload = (slip: IPayslip) => {
        const filename = `${new Date(slip.fromDate).toDateString()}-${new Date(slip.toDate).toDateString()}.png`
        download(
            slip.file,
            filename,
            () => showToast("Payslip Saved Successfully!", present),
            () => showToast("An error occurred saving payslips", present)
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" ></IonBackButton>
                    </IonButtons>
                    <IonTitle>Payslip</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <Conditional data={slip} loading={loading}>
                    <div className={styles.payslip}>
                        <h2 className={styles.subHeading}> Payslip ID : {slip?.id}</h2>
                        <div className={styles.preview}>
                            <h3 className={styles.previewTitle}> Duration : {new Date(slip?.fromDate).toDateString()} - {new Date(slip?.toDate).toDateString()} </h3>
                            <div className={styles.imgCont}>
                                <IonImg
                                    src={slip?.file} alt="payslip"
                                ></IonImg>
                            </div>
                        </div>
                    </div>
                </Conditional>

            </IonContent>
            <Conditional loading={false} data={slip} >
                <IonFooter className="ion-padding">
                    <div className={styles.footer}>
                        <IonButton
                            disabled={downloading}
                            onClick={() => onDownload(slip)}
                            className={styles.button}>
                            {downloading ? <IonSpinner /> : "Download Payslip"}
                        </IonButton>
                    </div>
                </IonFooter>
            </Conditional >
        </IonPage >
    )
}

export default Payslip;
