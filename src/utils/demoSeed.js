import firebase from "./firebase";

const generateRandomMoods = (userId) => {
    const moods = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        moods.push({
            userId,
            mood: Math.floor(Math.random() * 5) + 5, // Random mood between 5-10
            date: date,
            type: 'Check-in'
        });
    }
    return moods;
};

const sampleHabits = [
    {
        name: "Morning Meditation",
        streak: 5,
        isCompleted: false,
        previousDaysMaintained: [],
        lastMaintained: Date.now() - (24 * 60 * 60 * 1000)
    },
    {
        name: "Read 20 Pages",
        streak: 12,
        isCompleted: true,
        previousDaysMaintained: [],
        lastMaintained: Date.now()
    },
    {
        name: "Stay Hydrated",
        streak: 3,
        isCompleted: false,
        previousDaysMaintained: [],
        lastMaintained: Date.now() - (24 * 60 * 60 * 1000)
    }
];

export const seedDemoData = async (userId) => {
    if (!userId) return;
    
    const db = firebase.firestore();
    const batch = db.batch();

    // 1. Seed Moods
    const moods = generateRandomMoods(userId);
    const moodsRef = db.collection("users").doc(userId).collection("moods");
    
    // For firestore batch, we need to create separate docs
    for (const mood of moods) {
        const newDocRef = moodsRef.doc();
        batch.set(newDocRef, mood);
    }

    // 2. Seed Habits
    const habitsRef = db.collection("users").doc(userId).collection("habits");
    for (const habit of sampleHabits) {
        const newDocRef = habitsRef.doc();
        batch.set(newDocRef, { ...habit, createdAt: Date.now() });
    }

    // 3. Ensure Groups Exist (Global)
    const groupsRef = db.collection("groups");
    const existingGroups = await groupsRef.limit(1).get();
    if (existingGroups.empty) {
        const defaultGroups = [
            { name: "Anxiety Support", description: "A safe space to discuss anxiety and coping strategies." },
            { name: "Mindfulness Circle", description: "Practicing presence and peace together." },
            { name: "Goal Crushers", description: "Helping each other achieve mental wellness milestones." }
        ];
        for (const group of defaultGroups) {
            batch.set(groupsRef.doc(), group);
        }
    }

    await batch.commit();
    return true;
};
