import React, { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import ResidentProfile from "./ResidentProfile";

const FetchResidentDataAndRenderProfile = () => {
    const [residentData, setResidentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResidentData = async () => {
            try {
                const docRef = firebase.firestore().collection("residents").doc("43NbXPx1aUY0GdEG6jTyrhEKo0Z2"); // Replace "RESIDENT_ID" with the actual document ID
                const doc = await docRef.get();
                if (doc.exists) {
                    setResidentData(doc.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching resident data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResidentData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return <ResidentProfile residentData={residentData} />;
};

export default FetchResidentDataAndRenderProfile;
