import { useField } from 'formik';
import React from 'react';
import { IonContent, IonLabel, IonInput, IonTextarea } from '@ionic/react';
interface MyTextProps {
    label: String;
    props: any
}

export default function MyTextArea(props: any) {
    const [field, meta] = useField(props);
    // error={meta.touched && !!meta.error}
    return (
        <IonInput >
            <IonLabel>{props.label}</IonLabel>
            <IonTextarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <IonLabel color='red'>{meta.error}</IonLabel>
            ) : null}
        </IonInput>
    )
};