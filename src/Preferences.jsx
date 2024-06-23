import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Preferences() {
  const [preferences, setPreferences] = useState({
    fabric: '',
    length: ''
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const fetchPreferences = async () => {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPreferences(docSnap.data().preferences);
          }
        };
        fetchPreferences();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, { preferences });
      alert('Preferences updated successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Fabric:
        <input type="text" name="fabric" value={preferences.fabric} onChange={handleChange} />
      </label>
      <label>
        Length:
        <input type="text" name="length" value={preferences.length} onChange={handleChange} />
      </label>
      <button type="submit">Save Preferences</button>
    </form>
  );
}