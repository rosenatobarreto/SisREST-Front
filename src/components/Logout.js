import GoogleLogout from 'react-google-login';

const clientId = "965349476239-1o9e0e1emo8nf7s9qcbpl4b5g2hm94uj.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log("Logout successfull!")
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;