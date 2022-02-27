import { firestore } from "../firebase";
import {
    addMemberToSpecificTeam,
    addMemberToSpecificTeamColection,
    addMemberToSpecificOrganizationColection
} from '../firebase';

export const handleSaveNewOrg = async (clubName, currentUserId, currentUser, teamName, teamInviteCode) => {
    const organizationRef = firestore
        .collection("organization")

    const teamRef = firestore
        .collection('teams')

    await organizationRef.add({ name: clubName, admin: currentUserId }).then((res) => {
        addMemberToSpecificOrganizationColection(res.id, currentUser)
        organizationRef.doc(res.id).update({ uid: res.id, orgAdmin: [currentUserId] })
        teamRef.add({
            name: teamName, invitationCode: teamInviteCode,
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
        })   //.then(() => props.getUserAvailableTeams(props.currentUserId))
    })
};