import { auth } from '../utils/firebase';
import { useEffect } from 'react';
import { signOut,onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

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

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

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

const handleGptSearchClick = () => {
  dispatch(toggleGptSearchView());
}

const handleLanguageChange = (e) => {
  dispatch(changeLanguage(e.target.value));
}

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
  {user && (  
    <div className="flex p-2">
     {showGptSearch && (<select className="p-2 m-2 bg-gray-500 text-white" onChange={handleLanguageChange}>
        {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>)}
    <button className="px-4 py-2 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{showGptSearch ? "HomePage" : "Gpt Search"}</button>
      <img className="w-12 h-12" alt="userlogo" src={user?.photoURL} />
    <button onClick={handleSignOut} className="font-bold text-white">(Sign out)</button>
    </div>
    )}
    </div>

  )
}

export default Header;
