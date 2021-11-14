import React, { useState } from 'react'
import { useParams } from "react-router";
import { connect } from 'react-redux'
import { addEventChatComment } from '../firebase'
import { IonButton, IonToast, IonItem, IonTextarea, IonRow, IonCol, IonIcon } from '@ionic/react';
import { sendOutline as sendIcon } from "ionicons/icons"

import './eventChatForm.css'

interface RouterParams {
    id: string;
}

const EventChatForm: React.FC = (props: any) => {
    const { id } = useParams<RouterParams>();

    const [comment, setComment] = useState('')

    function handleEnterComment() {
        console.log(id, comment, props.userId, props.userName)
        addEventChatComment(id, comment, props.userId, props.userName.userName)
        setComment('')
    }

    console.log('my TEXT ', id, props.userId)
    return (
        <IonRow>
            <IonItem className='chatAreaContainer'>
                <IonCol size='10'>
                    <IonTextarea
                        className='chatTextField'
                        value={comment}
                        rows={1}
                        onIonChange={(e) => setComment(e.detail.value)}
                    />
                </IonCol>
                <IonCol size='2' className='buttonCol'>
                    <IonButton
                        className='chatAreaButton'
                        onClick={handleEnterComment}
                        color='tertiary'
                    ><IonIcon icon={sendIcon} size='small' slot="icon-only" /></IonButton>
                </IonCol>
            </IonItem >
        </IonRow>
    )
}

const mapStateToProps = (state) => ({
    userId: state.auth.userId,
    userName: state.auth.curentUserDetails,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EventChatForm)


// return (
//     <Formik
//         initialValues={{ comment: '' }}
//         onSubmit={async (values, { setSubmitting, resetForm }) => {
//             console.log('adding comment ', props.user)
//             try {
//                 await addEventChatComment(id, values.comment, props.user)
//                 resetForm()
//             } catch (error) {
//                 console.log(error.message)
//             } finally {
//                 setSubmitting(false)
//             }
//         }}
//     >
//         {({ isSubmitting }) => (
//             <Form>
//                 <MyTextArea
//                     name='comment'
//                     placeholder='Please enter comment'
//                     row={2}
//                 />
//                 <IonButton type='submit'>Add comment</IonButton>
//             </Form>
//         )}
//     </Formik>
// )
