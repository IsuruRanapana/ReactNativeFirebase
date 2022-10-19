import {Text, View, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Button} from './src/components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    }

    const signupWithEmailAndPassword = () => {
        auth().createUserWithEmailAndPassword('raaibranapana.test2@gmail.com', 'aaaaaaaaa')
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    };
    const signInEmailAndPassword = () => {
        auth().signInWithEmailAndPassword('raaibranapana.test2@gmail.com', 'aaaaaaaaa')
            .then(() => {
                console.log('User account signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    };
    const googleSignIn = async () => {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        // Get the users ID token
        const {idToken} = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    };


    const signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) {
        return null;
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <Button labelText={'Signup'} onPress={signupWithEmailAndPassword}/>
                <Button labelText={'Signin'} onPress={signInEmailAndPassword}/>
                <Button labelText={'Google Signin'} onPress={googleSignIn}/>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Text>Welcome {user.email}</Text>
            <Button labelText={'Signout'} onPress={signOut}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
