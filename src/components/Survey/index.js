import React, { useState } from "react";
import firebase from "../../utils/firebase";
import surveyQuestions from "./Questions.json";
import { styled } from "@mui/material/styles";
import {
    Radio,
    FormControlLabel,
    TextField,
    Button,
    Typography,
    Box,
    Stack,
    Container,
    Card,
    CardContent,
    CircularProgress
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SurveyContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
}));

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.03)",
    border: "1px solid rgba(0,0,0,0.02)",
    marginBottom: theme.spacing(4),
    overflow: "visible"
}));

const Survey = () => {
    const [imageFiles, setImageFiles] = useState({});
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleImageUpload = async (questionId, file) => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`survey-images/${questionId}/${file.name}`);
        await fileRef.put(file);
        return await fileRef.getDownloadURL();
    };

    const handleImageChange = (event, questionId) => {
        const file = event.target.files[0];
        setImageFiles({ ...imageFiles, [questionId]: file });
    };

    const handleChange = (event, questionId) => {
        setAnswers({ ...answers, [questionId]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const imageUrls = await Promise.all(
                Object.entries(imageFiles).map(async ([questionId, file]) => {
                    const url = await handleImageUpload(questionId, file);
                    return { questionId, url };
                })
            ).then((urls) => {
                return urls.reduce((acc, { questionId, url }) => {
                    acc[questionId] = url;
                    return acc;
                }, {});
            });

            const surveyData = {
                answers,
                imageUrls,
                timestamp: Date.now(),
            };

            const user = firebase.auth().currentUser;
            await firebase.firestore().collection("users").doc(user.uid).collection("surveys").add(surveyData);
            setSubmitted(true);
        } catch (error) {
            console.error("Error saving survey data:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <SurveyContainer maxWidth="md">
                <StyledCard sx={{ p: 6, textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight={900} color="primary.main" gutterBottom>
                        Thank You!
                    </Typography>
                    <Typography variant="h6" color="text.secondary" mb={4}>
                        Your feedback helps us make WellBeing better for everyone.
                    </Typography>
                    <Button variant="contained" onClick={() => window.location.href = "/"}>
                        Return Home
                    </Button>
                </StyledCard>
            </SurveyContainer>
        );
    }

    return (
        <SurveyContainer maxWidth="md">
            <Box textAlign="center" mb={6}>
                <Typography variant="h3" fontWeight={900} color="primary.main" gutterBottom>
                    Help Us Improve
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    We value your experience. Please share your thoughts on the different sections of the WellBeing platform.
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                {surveyQuestions.map((page, pIdx) => (
                    <StyledCard key={page.page}>
                        <Box sx={{ p: 3, bgcolor: 'rgba(0,133,121,0.03)', borderBottom: '1px solid', borderColor: 'divider', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
                            <Typography variant="h5" fontWeight={800} color="primary.dark">
                                {page.page} Feedback
                            </Typography>
                        </Box>
                        <CardContent sx={{ p: 4 }}>
                            {page.questions.map((question) => (
                                <Box key={question.id} sx={{ mb: 4, "&:last-child": { mb: 0 } }}>
                                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: '1.1rem' }}>
                                        {question.question}
                                    </Typography>

                                    {question.type === "options" ? (
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                                            {question.options.map((option, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={option}
                                                    control={
                                                        <Radio 
                                                            onChange={(e) => handleChange(e, question.id)}
                                                            checked={answers[question.id] === option}
                                                            sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                                                        />
                                                    }
                                                    label={option}
                                                    sx={{ 
                                                        px: 2, py: 0.5, borderRadius: '12px', border: '1px solid', 
                                                        borderColor: answers[question.id] === option ? 'primary.main' : 'divider',
                                                        bgcolor: answers[question.id] === option ? 'rgba(0,133,121,0.05)' : 'transparent',
                                                        transition: 'all 0.2s',
                                                        m: 0
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    ) : (
                                        <TextField
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            placeholder="Tell us more..."
                                            onChange={(e) => handleChange(e, question.id)}
                                            fullWidth
                                            sx={{ 
                                                mt: 2,
                                                "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: 'rgba(0,0,0,0.01)' }
                                            }}
                                        />
                                    )}

                                    {question.image && (
                                        <Box mt={2}>
                                            <input
                                                accept="image/*"
                                                id={`image-upload-${question.id}`}
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleImageChange(e, question.id)}
                                            />
                                            <label htmlFor={`image-upload-${question.id}`}>
                                                <Button 
                                                    variant="outlined" 
                                                    component="span" 
                                                    size="small"
                                                    startIcon={<CloudUploadIcon />}
                                                    sx={{ borderRadius: '8px', textTransform: 'none' }}
                                                >
                                                    {imageFiles[question.id] ? "Change Image" : "Upload Screenshot (Optional)"}
                                                </Button>
                                            </label>
                                            {imageFiles[question.id] && (
                                                <Typography variant="caption" sx={{ ml: 2, color: 'primary.main', fontWeight: 600 }}>
                                                    {imageFiles[question.id].name}
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </CardContent>
                    </StyledCard>
                ))}

                <Box sx={{ mt: 6, textAlign: 'center', pb: 10 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{ 
                            px: 8, py: 2, borderRadius: '50px', fontWeight: 800, fontSize: '1.1rem',
                            boxShadow: '0 10px 25px rgba(0, 133, 121, 0.3)'
                        }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit Feedback"}
                    </Button>
                </Box>
            </form>
        </SurveyContainer>
    );
};

export default Survey;
