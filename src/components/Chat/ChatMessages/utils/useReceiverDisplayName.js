import { useEffect, useState } from "react";
import firebase from "../../../../utils/firebase";

/**
 * Custom hook to retrieve the display name of a receiver user
 * @param {string} receiverUid - the user ID of the receiver
 * @returns {string} - the display name of the receiver
 */
const useReceiverDisplayName = (receiverUid) => {
  const [receiverDisplayName, setReceiverDisplayName] = useState("");

  useEffect(() => {
    /**
     * Fetches the display name of the receiver user from Firestore
     */
    const fetchReceiverDisplayName = async () => {
      try {
        const userRef = firebase.firestore().collection("users").doc(receiverUid);
        let userDoc;
        try {
          userDoc = await userRef.get();
        } catch {
          userDoc = await userRef.get({ source: "cache" });
        }
        if (userDoc.exists) {
          setReceiverDisplayName(userDoc.data().username);
        }
      } catch {
        // offline and no cache — leave display name empty
      }
    };

    fetchReceiverDisplayName();
  }, [receiverUid]);

  return receiverDisplayName;
};

export default useReceiverDisplayName;
