import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonCol,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
//import { CameraResultType, CameraSource, Plugins } from "@capacitor/core";
import { useHistory } from "react-router";
// import { useAuth } from "../Auth";
import { connect } from "react-redux";

import { firestore } from "../firebase";
import { TestPlaceInput } from "../shared/testPlaceInput";

const AddEventPage: React.FC = (props: any) => {
    //  const { userId } = useAuth() as any;
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState("")
    const [attendanceRequired, setAttendanceRequired] = useState(false)
    const [isMatch, setIsMatch] = useState(false)
    const [location, setLocation] = useState("")
    const [coordinance, setCoordinance] = useState()
    const attendingMembers = []

    const result = ''

    // const [pictureUrl, setPictureUrl] = useState("/assets/placeholder.png");
    // const fileInputRef = useRef<HTMLInputElement>();

    // useEffect(() => {
    //     return () => {
    //         if (pictureUrl.startsWith("blob:")) {
    //             URL.revokeObjectURL(pictureUrl);
    //         }
    //     };
    // }, [pictureUrl]);

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
            .collection("teams")
            .doc(props.selectedTeam)
            .collection("events");
        let entryData = { date, title, description, startTime, endTime, attendanceRequired, isMatch, result, location, attendingMembers, coordinance };
        console.log(entryData)
        await entriesRef.add(entryData);
        history.goBack();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Adding Team Event</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel >Date</IonLabel>
                        <IonDatetime
                            placeholder="Select Date"
                            value={date}
                            min="2021"
                            max="2050-10-30"
                            onIonChange={(event) => setDate(event.detail.value)}
                        />
                    </IonItem>
                    <IonItem>
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
                    <IonItem>
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
                    <IonItem>
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput
                            value={title}
                            onIonChange={(event) => setTitle(event.detail.value)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Location</IonLabel>
                        <IonText>{location}</IonText>
                        <PlacesAutocomplete
                            value={location}
                            onChange={handleChange}
                            onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input
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
                    <IonItem>
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonTextarea
                            value={description}
                            onIonChange={(event) => setDescription(event.detail.value)}
                        />
                    </IonItem>

                    <IonItem>
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

                    <IonItem>
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
                        </IonCol>
                    </IonItem>
                    <IonButton expand="block" onClick={handleSave}>
                        Save
                    </IonButton>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

const mapStateToProps = (state) => ({
    currentUserId: state.auth.user.uid,
    selectedTeam: state.team.team,
});

export default connect(mapStateToProps, {})(AddEventPage);
