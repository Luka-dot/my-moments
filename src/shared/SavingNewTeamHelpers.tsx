import {
    firestore,
    addMemberToSpecificTeam,
    addMemberToSpecificTeamColection,
    addMemberToSpecificOrganizationColection,
    addTeamToOrganization,
    storage,
} from '../firebase';

async function savePicture(blobUrl, orgId) {

    const pictureRef = storage.ref(`/organization/${orgId}/pictures/${Date.now()}`);
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const snapshot = await pictureRef.put(blob);
    const url = snapshot.ref.getDownloadURL();
    URL.revokeObjectURL(blobUrl);
    return url;
}

export const handleSaveNewOrg = async (clubName, currentUserId, currentUser, teamName, teamInviteCode, teamPicture) => {

    const organizationRef = firestore
        .collection("organization")

    const teamRef = firestore
        .collection('teams')

    await organizationRef.add({ name: clubName, admin: currentUserId }).then((res) => {
        let newOrgId = res.id
        addMemberToSpecificOrganizationColection(res.id, currentUser)
        organizationRef.doc(res.id).update({ uid: res.id, orgAdmin: [currentUserId] })
        teamRef.add({
            name: teamName,
            invitationCode: teamInviteCode,
            teamPicture: teamPicture,
            teamAdmins: [currentUserId], organization: {
                id: res.id,
                name: clubName,
                admin: currentUserId
            }
        }).then((res) => {
            console.log(res.id, currentUserId, currentUser)
            // res.id is an id of new team, need to be added to this doc
            teamRef.doc(res.id).update({ uid: res.id })
            addMemberToSpecificTeam(res.id, currentUserId)
            addMemberToSpecificTeamColection(res.id, currentUser)
            addTeamToOrganization(res.id, newOrgId)
        })   //.then(() => props.getUserAvailableTeams(props.currentUserId))
    })
};
export const handleSaveNewOrgNo = async (currentUserId, currentUser, teamName, teamInviteCode, teamPicture) => {
    const organizationRef = firestore
        .collection("organization")

    const teamRef = firestore
        .collection('teams')

    await organizationRef.add({ name: 'optedOut', admin: currentUserId }).then((res) => {
        let newOrgId = res.id
        addMemberToSpecificOrganizationColection(res.id, currentUser)
        organizationRef.doc(res.id).update({ uid: res.id, orgAdmin: [currentUserId] })
        teamRef.add({
            name: teamName,
            invitationCode: teamInviteCode,
            teamPicture: teamPicture,
            teamAdmins: [currentUserId], organization: {
                id: res.id,
                name: 'optedOut',
                admin: currentUserId
            }
        }).then((res) => {
            console.log(res.id, currentUserId, currentUser)
            // res.id is an id of new team, need to be added to this doc
            teamRef.doc(res.id).update({ uid: res.id })
            addMemberToSpecificTeam(res.id, currentUserId)
            addMemberToSpecificTeamColection(res.id, currentUser)
            addTeamToOrganization(res.id, newOrgId)
        })   //.then(() => props.getUserAvailableTeams(props.currentUserId))
    })
};