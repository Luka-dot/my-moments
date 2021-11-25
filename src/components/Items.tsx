import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonText, IonAvatar, IonThumbnail, IonButton, IonIcon, IonDatetime, IonSelect, IonSelectOption, IonToggle, IonInput, IonCheckbox, IonRange, IonItemSliding, IonItemOptions, IonItemOption, IonItemDivider, IonItemGroup, IonNote } from '@ionic/react';
import { closeCircle, home, star, navigate, informationCircle, checkmarkCircle, shuffle } from 'ionicons/icons';
import { heart, trash, archive, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

export const ItemExamples: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>ItemExamples</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {/* Sliding item with text options on both sides */}
                    <IonItemSliding>
                        <IonItemOptions side="start">
                            <IonItemOption onClick={() => console.log('favorite clicked')}>Favorite</IonItemOption>
                            <IonItemOption color="danger" onClick={() => console.log('share clicked')}>Share</IonItemOption>
                        </IonItemOptions>

                        <IonItem>
                            <IonLabel>Item Options</IonLabel>
                        </IonItem>

                        <IonItemOptions side="end">
                            <IonItemOption onClick={() => console.log('unread clicked')}>Unread</IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>

                    {/* Sliding item with expandable options on both sides */}
                    <IonItemSliding>
                        <IonItemOptions side="start">
                            <IonItemOption color="danger" expandable>
                                Delete
                            </IonItemOption>
                        </IonItemOptions>

                        <IonItem>
                            <IonLabel>Expandable Options</IonLabel>
                        </IonItem>

                        <IonItemOptions side="end">
                            <IonItemOption color="tertiary" expandable>
                                Archive
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>

                    {/* Multi-line sliding item with icon options on both sides */}
                    <IonItemSliding id="item100">
                        <IonItem href="#">
                            <IonLabel>
                                <h2>HubStruck Notifications</h2>
                                <p>A new message in your network</p>
                                <p>Oceanic Next has joined your network</p>
                            </IonLabel>
                            <IonNote slot="end">
                                10:45 AM
                            </IonNote>
                        </IonItem>

                        <IonItemOptions side="start">
                            <IonItemOption>
                                <IonIcon slot="icon-only" icon={heart} />
                            </IonItemOption>
                        </IonItemOptions>

                        <IonItemOptions side="end">
                            <IonItemOption color="danger">
                                <IonIcon slot="icon-only" icon={trash} />
                            </IonItemOption>
                            <IonItemOption>
                                <IonIcon slot="icon-only" icon={star} />
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>

                    {/* Sliding item with icon start options on end side */}
                    <IonItemSliding>
                        <IonItem>
                            <IonLabel>
                                Sliding Item, Icons Start
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption color="primary">
                                <IonIcon slot="start" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                                More
                            </IonItemOption>
                            <IonItemOption color="secondary">
                                <IonIcon slot="start" icon={archive} />
                                Archive
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>

                    {/* Sliding item with icon end options on end side */}
                    <IonItemSliding>
                        <IonItem>
                            <IonLabel>
                                Sliding Item, Icons End
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption color="primary">
                                <IonIcon slot="end" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                                More
                            </IonItemOption>
                            <IonItemOption color="secondary">
                                <IonIcon slot="end" icon={archive} />
                                Archive
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>

                    {/* Sliding item with icon top options on end side */}
                    <IonItemSliding>
                        <IonItem>
                            <IonLabel>
                                Sliding Item, Icons Top
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption color="primary">
                                <IonIcon slot="top" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                                More
                            </IonItemOption>
                            <IonItemOption color="secondary">
                                <IonIcon slot="top" icon={archive} />
                                Archive
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>

                    {/* Sliding item with icon bottom options on end side */}
                    <IonItemSliding>
                        <IonItem>
                            <IonLabel>
                                Sliding Item, Icons Bottom
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption color="primary">
                                <IonIcon slot="bottom" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                                More
                            </IonItemOption>
                            <IonItemOption color="secondary">
                                <IonIcon slot="bottom" icon={archive} />
                                Archive
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                </IonList>
                {/*-- Default Item --*/}
                <IonItem>
                    <IonLabel>
                        Item
                    </IonLabel>
                </IonItem>

                {/*-- Item as a Button --*/}
                <IonItem button onClick={() => { }}>
                    <IonLabel>
                        Button Item
                    </IonLabel>
                </IonItem>

                {/*-- Item as an Anchor --*/}
                <IonItem href="https://www.ionicframework.com">
                    <IonLabel>
                        Anchor Item
                    </IonLabel>
                </IonItem>

                <IonItem color="secondary">
                    <IonLabel>
                        Secondary Color Item
                    </IonLabel>
                </IonItem>

                {/*-- Detail Arrows --*/}
                <IonItem detail>
                    <IonLabel>
                        Standard Item with Detail Arrow
                    </IonLabel>
                </IonItem>

                <IonItem button onClick={() => { }} detail>
                    <IonLabel>
                        Button Item with Detail Arrow
                    </IonLabel>
                </IonItem>

                <IonItem detail={false} href="https://www.ionicframework.com">
                    <IonLabel>
                        Anchor Item with no Detail Arrow
                    </IonLabel>
                </IonItem>

                <IonList>
                    <IonItem>
                        <IonLabel>
                            Item
                        </IonLabel>
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel>
                            No Lines Item
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel className="ion-text-wrap">
                            Multiline text that should wrap when it is too long
                            to fit on one line in the item.
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel className="ion-text-wrap">
                            <IonText color="primary">
                                <h3>H3 Primary Title</h3>
                            </IonText>
                            <p>Paragraph line 1</p>
                            <IonText color="secondary">
                                <p>Paragraph line 2 secondary</p>
                            </IonText>
                        </IonLabel>
                    </IonItem>

                    <IonItem lines="full">
                        <IonLabel>
                            Item with Full Lines
                        </IonLabel>
                    </IonItem>
                </IonList>

                {/*-- Item Inset Lines --*/}
                <IonItem lines="inset">
                    <IonLabel>Item Lines Inset</IonLabel>
                </IonItem>

                {/*-- Item Full Lines --*/}
                <IonItem lines="full">
                    <IonLabel>Item Lines Full</IonLabel>
                </IonItem>

                {/*-- Item None Lines --*/}
                <IonItem lines="none">
                    <IonLabel>Item Lines None</IonLabel>
                </IonItem>

                {/*-- List Full Lines --*/}
                <IonList lines="full">
                    <IonItem>
                        <IonLabel>Full Lines Item 1</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Full Lines Item 2</IonLabel>
                    </IonItem>
                </IonList>

                {/*-- List Inset Lines --*/}
                <IonList lines="inset">
                    <IonItem>
                        <IonLabel>Inset Lines Item 1</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>Inset Lines Item 2</IonLabel>
                    </IonItem>
                </IonList>

                {/*-- List No Lines --*/}
                <IonList lines="none">
                    <IonItem>
                        <IonLabel>No lines Item 1</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>No lines Item 2</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel>No lines Item 3</IonLabel>
                    </IonItem>
                </IonList>

                <IonItem button onClick={() => { }}>
                    <IonAvatar slot="start">
                        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==" />
                    </IonAvatar>
                    <IonLabel>
                        Avatar Start, Button Item
                    </IonLabel>
                </IonItem>

                <IonItem href="#">
                    <IonLabel>
                        Thumbnail End, Anchor Item
                    </IonLabel>
                    <IonThumbnail slot="end">
                        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==" />
                    </IonThumbnail>
                </IonItem>

                <IonItem>
                    <IonThumbnail slot="start">
                        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==" />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>H2 Title Text</h2>
                        <p>Button on right</p>
                    </IonLabel>
                    <IonButton fill="outline" slot="end">View</IonButton>
                </IonItem>

                <IonItem button onClick={() => { }}>
                    <IonThumbnail slot="start">
                        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==" />
                    </IonThumbnail>
                    <IonLabel>
                        <h3>H3 Title Text</h3>
                        <p>Icon on right</p>
                    </IonLabel>
                    <IonIcon icon={closeCircle} slot="end" />
                </IonItem>

                {/*-- Buttons in Items --*/}
                <IonItem>
                    <IonButton slot="start">
                        Start
                    </IonButton>
                    <IonLabel>Button Start/End</IonLabel>
                    <IonButton slot="end">
                        End
                    </IonButton>
                </IonItem>

                <IonItem>
                    <IonButton slot="start">
                        Start Icon
                        <IonIcon icon={home} slot="end" />
                    </IonButton>
                    <IonLabel>Buttons with Icons</IonLabel>
                    <IonButton slot="end">
                        <IonIcon icon={star} slot="end" />
                        End Icon
                    </IonButton>
                </IonItem>

                <IonItem>
                    <IonButton slot="start">
                        <IonIcon slot="icon-only" icon={navigate} />
                    </IonButton>
                    <IonLabel>Icon only Buttons</IonLabel>
                    <IonButton slot="end">
                        <IonIcon slot="icon-only" icon={star} />
                    </IonButton>
                </IonItem>

                <IonItem>
                    <IonLabel>
                        Icon End
                    </IonLabel>
                    <IonIcon icon={informationCircle} slot="end" />
                </IonItem>

                <IonItem>
                    <IonLabel>
                        Large Icon End
                    </IonLabel>
                    <IonIcon icon={informationCircle} size="large" slot="end" />
                </IonItem>

                <IonItem>
                    <IonLabel>
                        Small Icon End
                    </IonLabel>
                    <IonIcon icon={informationCircle} size="small" slot="end" />
                </IonItem>

                <IonItem>
                    <IonIcon icon={star} slot="start" />
                    <IonLabel>
                        Icon Start
                    </IonLabel>
                </IonItem>

                <IonItem>
                    <IonLabel>
                        Two Icons End
                    </IonLabel>
                    <IonIcon icon={checkmarkCircle} slot="end" />
                    <IonIcon icon={shuffle} slot="end" />
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Datetime</IonLabel>
                    <IonDatetime></IonDatetime>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Select</IonLabel>
                    <IonSelect>
                        <IonSelectOption value="">No Game Console</IonSelectOption>
                        <IonSelectOption value="nes">NES</IonSelectOption>
                        <IonSelectOption value="n64">Nintendo64</IonSelectOption>
                        <IonSelectOption value="ps">PlayStation</IonSelectOption>
                        <IonSelectOption value="genesis">Sega Genesis</IonSelectOption>
                        <IonSelectOption value="saturn">Sega Saturn</IonSelectOption>
                        <IonSelectOption value="snes">SNES</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel>Toggle</IonLabel>
                    <IonToggle slot="end"></IonToggle>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Floating Input</IonLabel>
                    <IonInput></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>Input (placeholder)</IonLabel>
                    <IonInput placeholder="Placeholder"></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>Checkbox</IonLabel>
                    <IonCheckbox slot="start" />
                </IonItem>

                <IonItem>
                    <IonLabel>Range</IonLabel>
                    <IonRange></IonRange>
                </IonItem>
                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>A</IonLabel>
                    </IonItemDivider>

                    <IonItem>
                        <IonLabel>Angola</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Argentina</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Armenia</IonLabel>
                    </IonItem>
                </IonItemGroup>

                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>B</IonLabel>
                    </IonItemDivider>

                    <IonItem>
                        <IonLabel>Bangladesh</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Belarus</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Belgium</IonLabel>
                    </IonItem>
                </IonItemGroup>


                {/*-- They can also be used to group sliding items --*/}
                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>
                            Fruits
                        </IonLabel>
                    </IonItemDivider>

                    <IonItemSliding>
                        <IonItem>
                            <IonLabel>
                                <h3>Grapes</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption>
                                Favorite
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>

                    <IonItemSliding>
                        <IonItem>
                            <IonLabel>
                                <h3>Apples</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption>
                                Favorite
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                </IonItemGroup>

                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>
                            Vegetables
                        </IonLabel>
                    </IonItemDivider>

                    <IonItemSliding>
                        <IonItem>
                            <IonLabel>
                                <h3>Carrots</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption>
                                Favorite
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>

                    <IonItemSliding>
                        <IonItem>
                            <IonLabel>
                                <h3>Celery</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItemOptions>
                            <IonItemOption>
                                Favorite
                            </IonItemOption>
                        </IonItemOptions>
                    </IonItemSliding>
                </IonItemGroup>
            </IonContent>
        </IonPage>
    );
};