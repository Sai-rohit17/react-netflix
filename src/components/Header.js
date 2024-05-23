import { auth } from '../utils/firebase';
import { useEffect } from 'react';
import { signOut,onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName, photoURL} = user.uid;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            navigate("/browse");
    } else {
        dispatch(removeUser());
        navigate("/");
        }
    });
    // return () => unsubscribe();
}, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
  {user && (  
    <div className="flex p-2">
      <img className="w-12 h-12" alt="userlogo" src={user?.photoURL} />
    <button onClick={handleSignOut} className="font-bold text-white">(Sign out)</button>
    </div>
    )}
    </div>

  )
}

export default Header;
