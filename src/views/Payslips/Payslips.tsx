import { Card } from "components/Card/Card";
import {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
} from '@ionic/react';
import { Payslip as IPayslip } from 'types/api';
import { useMockFetch } from "hooks/useMockFetch";
import { Conditional } from "components/Conditional/Conditional";
import styles from "./styles.module.css"


type FetchResponse = {
    loading: boolean;
    data: IPayslip[]
}

function Payslips() {
    const { loading, data: slips }: FetchResponse = useMockFetch("payslips");
    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonTitle>Payslips</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" fullscreen={true}>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Payslips</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <h2 className={styles.hDesc}>View available payslips in your history</h2>
                <Conditional data={slips} loading={loading}>
                    <IonList>
                        {slips?.map((slip) =>
                            <Card key={slip.id} {...slip} />
                        )}
                    </IonList>
                </Conditional>

            </IonContent>
        </IonPage>
    )
}

export default Payslips
