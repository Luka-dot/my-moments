import React, { useState, useEffect } from 'react';
import { firestore } from "../firebase";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { IonButton, IonRow, IonCol, IonText, IonCheckbox, IonItem, IonList, IonContent, IonTextarea, IonLabel, IonInput, IonDatetime, IonPage } from '@ionic/react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

interface modalProps {
    modalText: string,
    displayModal: boolean,
    onCancel: any,
    onConfirm: any,
    eventDetails: any,
    teamId: any,
    eventId: any,
}

interface RouterParams {
    id: string;
}

const EditPage: React.FC = (props: any) => {
    const eventDetails = props.singleEntry

    const history = useHistory();
    const { id } = useParams<RouterParams>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')
    const [attendanceRequired, setAttendanceRequired] = useState(Boolean)
    const [isMatch, setIsMatch] = useState(Boolean)
    const [result, setResult] = useState('')
    const [location, setLocation] = useState("")
    const [coordinance, setCoordinance] = useState(null)

    useEffect(() => {
        setTitle(eventDetails?.title);
        setDescription(eventDetails?.description);
        setDate(eventDetails?.date);
        setStartTime(eventDetails?.startTime);
        setEndTime(eventDetails?.endTime)
        setAttendanceRequired(eventDetails?.attendanceRequired)
        setIsMatch(eventDetails?.isMatch)
        setResult(eventDetails?.result)
    }, [])

    function handleChange(location) {
        setLocation(location)
    };

    function handleSelect(location) {
        geocodeByAddress(location)
            .then(results => getLatLng(results[0]))
            .then(latLng => setCoordinance(latLng))
            .catch(error => console.error('Error', error));
        setLocation(location)
    };

    const handleSave = async () => {
        const entriesRef = firestore
            .collection('teams')
            .doc(props.selectedTeam)
            .collection('events')
            .doc(id);

        let entryData = { date, title, description, startTime, endTime, attendanceRequired, isMatch, result, location, coordinance };
        await entriesRef.update(entryData);
        history.goBack()
        // onCancel();
    };
    const onConfirm = () => {
        handleSave()

    }
    const onCancel = () => {
        history.goBack()
    }

    if (!eventDetails) {
        return (
            <div>Loading....</div>
        )
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem lines="none">
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput
                            value={title}
                            onIonChange={(event) => setTitle(event.detail.value)}
                        />
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonTextarea
                            value={description}
                            onIonChange={(event) => setDescription(event.detail.value)}
                        />
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel >Date</IonLabel>
                        <IonDatetime
                            placeholder="Select Date"
                            value={date}
                            min="2021"
                            max="2050-10-30"
                            onIonChange={(event) => setDate(event.detail.value)}
                        />
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>
                            Start Time
                        </IonLabel>
                        <IonDatetime
                            placeholder="Select Start Time"
                            pickerFormat="h:mm A"
                            displayFormat="h:mm A"
                            value={startTime}
                            onIonChange={(e) => setStartTime(e.detail.value)}
                        ></IonDatetime>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>
                            End Time
                        </IonLabel>
                        <IonDatetime
                            placeholder="Select End Time"
                            pickerFormat="h:mm A"
                            displayFormat="h:mm A"
                            value={endTime}
                            onIonChange={(e) => setEndTime(e.detail.value)}
                        ></IonDatetime>
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel position="stacked">Location</IonLabel>
                        <IonText>{location}</IonText>
                        <PlacesAutocomplete
                            value={location}
                            onChange={handleChange}
                            onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div id="pac-container">
                                    <input
                                        id="pac-input"
                                        {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input',
                                        })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,

                                                    })}
                                                    key={suggestion.placeId}
                                                >
                                                    <span>{suggestion.description}</span>

                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </IonItem>


                    <IonItem lines="none">
                        <IonCol>
                            <IonRow>
                                <IonCol size="10">
                                    <IonText >
                                        <h4>Attendance Required?</h4>
                                    </IonText>
                                </IonCol>
                                <IonCol size="2">
                                    <IonCheckbox
                                        checked={attendanceRequired}
                                        onIonChange={() => setAttendanceRequired(!attendanceRequired)}
                                    />
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonItem>

                    <IonItem lines="none">
                        <IonCol>
                            <IonRow>
                                <IonCol size="10">
                                    <IonText >
                                        <h4>Is this a Match?</h4>
                                    </IonText>
                                </IonCol>
                                <IonCol size="2">
                                    <IonCheckbox
                                        checked={isMatch}
                                        onIonChange={() => setIsMatch(!isMatch)}
                                    />
                                </IonCol>
                            </IonRow>
                            {
                                isMatch ?
                                    <IonRow>
                                        <IonLabel >Result</IonLabel>
                                        <IonTextarea
                                            value={result}
                                            onIonChange={(event) => setResult(event.detail.value)}
                                        />
                                    </IonRow>
                                    :
                                    <div></div>
                            }
                        </IonCol>
                    </IonItem>
                    <IonRow>
                        <IonCol>
                            <IonButton fill="outline" color="danger" onClick={onConfirm} >CONFIRM</IonButton>
                        </IonCol>
                        <IonCol></IonCol>
                        <IonCol>
                            <IonButton fill="outline" onClick={onCancel}>CANCEL</IonButton>
                        </IonCol>
                    </IonRow>
                </IonList>
            </IonContent>

        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.auth,
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
    teamEvents: state.team.events,
    teamMembers: state.team.members,
    singleEntry: state.team.singleEvent,
});

export default connect(mapStateToProps, null)(EditPage)