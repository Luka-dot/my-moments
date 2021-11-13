import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useHistory, useParams } from "react-router";
import { connect } from 'react-redux'
import { addEventChatComment } from '../firebase'
import { IonButton, IonToast, IonItem, IonTextarea } from '@ionic/react';
import MyTextArea from '../shared/MyTextArea';
import { getCurrentUserDetails } from './../actions/AuthActions';

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
        <IonItem>
            <IonTextarea
                value={comment}
                onIonChange={(e) => setComment(e.detail.value)}
            />
            <IonButton
                onClick={handleEnterComment}
            >Add Comment</IonButton>
        </IonItem>
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
