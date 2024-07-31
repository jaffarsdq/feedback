import { LoadingButton } from '@mui/lab';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bgImage1 from '../assets/Subtract.svg';
import bgImage2 from '../assets/Subtract2.svg';
import RatingSmileys from '../components/FeedbackComponents/RatingSmileys';
import RatingStars from '../components/FeedbackComponents/RatingStars';
import CustomInputTextArea from '../components/inputFields/CustomInputTextArea';
import SideBar from '../layout/SideBar';
import {
    fetchFeedbackQuestions,
    fetchUpdateFeedbackAnswers,
} from '../Redux/Slices/FeedbackSlice';
import { handleApiResponse } from '../Utils/handleApiResponse';

function FeedBack() {
    const dispatch = useDispatch();

    const {
        feedbackQuestions,
        loadingFeedbackQuestions,
        feedbackQuestionsMessage,
        feedbackQuestionsStatus,

        loadingFeedbackUpdate,
        MsgFeedbackUpdate,
        StatusFeedbackUpdate,
    } = useSelector((state) => state.feedback);

    useEffect(() => {
        // dispatch(fetchFeedbackQuestions());
        handleApiResponse(dispatch, fetchFeedbackQuestions, '');
    }, [dispatch]);

    const [formData, setFormData] = useState({ reason: '' });
    const [updatedRatings, setUpdatedRatings] = useState([]);

    useEffect(() => {
        setFormData({ reason: '' });
        setUpdatedRatings([]);
    }, [feedbackQuestionsMessage, MsgFeedbackUpdate]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const updateFeedback = (rating_id, newValue) => {
        setUpdatedRatings((prev) => {
            const existing = prev.find((item) => item.rating_id === rating_id);
            if (existing) {
                return prev.map((item) =>
                    item.rating_id === rating_id
                        ? { ...item, option_id: newValue }
                        : item
                );
            } else {
                return [...prev, { rating_id, option_id: newValue }];
            }
        });
    };

    const handleSubmit = () => {
        const ratingsWithFeedback = updatedRatings.map((rating) => {
            const question = feedbackQuestions.find(
                (q) => q.rating_id === rating.rating_id
            );
            return {
                ...rating,
                other_feed_back: formData.reason,
                client_id: question.client_id,
                description: question.description,
                secondLanguage: question.secondLanguage,
                rating_type: question.type === 'RATINGS' ? 'stars' : 'smiley', // Example mapping
                active: question.active,
                publish: question.publish,
            };
        });
        // dispatch(fetchUpdateFeedbackAnswers(ratingsWithFeedback));
        handleApiResponse(
            dispatch,
            fetchUpdateFeedbackAnswers,
            ratingsWithFeedback
        );
    };

    return (
        <SideBar>
            {loadingFeedbackQuestions && <LinearProgress color='secondary' />}
            <Box
                sx={{
                    position: 'relative',
                    background:
                        'linear-gradient(180deg, rgba(53, 23, 76, 1) 34.9%, #7C37B2 98.4%)',
                    // background:
                    // "linear-gradient(180deg, #35174C 34.9%, #7C37B2 98.4%)",
                    overflow: 'hidden',
                    width: '100%',
                }}
            >
                <img
                    src={bgImage1}
                    alt='style Image'
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '-7%',
                        zIndex: '0',
                    }}
                    width={'300px'}
                    height={'300px'}
                />
                <img
                    src={bgImage2}
                    alt='style Image'
                    style={{
                        position: 'absolute',
                        top: '7%',
                        right: '-8%',
                        zIndex: '0',
                        overflow: 'hidden',
                    }}
                    width={'300px'}
                    height={'300px'}
                />
                <Box
                    sx={{
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        width: { xs: '100%', md: '80%' },
                        justifyContent: 'space-between',
                        minHeight: 'calc(100dvh - 55px)',
                        margin: '0 auto',
                        borderRadius: '8px',
                        // background: "inherit",
                        gap: '10px',
                        zIndex: '5',
                    }}
                >
                    <Box sx={{ width: '100%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: '5',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '16px',
                                        sm: '19px',
                                        md: '20px',
                                        lg: '22px',
                                        xl: '24px',
                                    },
                                    marginTop: '1rem',
                                    fontWeight: '700',
                                    color: 'white',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Please provide your valuable feedback on your
                                experience
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0rem',
                                marginTop: '.5rem',
                            }}
                        >
                            {feedbackQuestions.map((opt, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        fontSize: '14px',
                                        margin: '1rem 0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px',
                                        padding: '0.5rem',
                                        bgcolor: 'inherit',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: '14px',
                                                    sm: '16px',
                                                    md: '18px',
                                                    lg: '24px',
                                                    xl: '30px',
                                                },
                                                fontStyle: 'normal',
                                                fontWeight: '600',
                                                color: 'white',
                                                zIndex: '5',
                                            }}
                                        >
                                            {`${index + 1}.`}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: '14px',
                                                    sm: '16px',
                                                    md: '18px',
                                                    lg: '24px',
                                                    xl: '30px',
                                                },
                                                fontStyle: 'normal',
                                                fontWeight: '500',
                                                color: 'white',
                                                zIndex: '5',
                                            }}
                                        >
                                            {opt?.description}
                                        </Typography>
                                    </Box>
                                    {opt?.rating_type === 'Star' ? (
                                        <RatingStars
                                            count_value={opt?.count_value}
                                            rating_id={opt?.rating_id}
                                            updateFeedback={updateFeedback}
                                        />
                                    ) : (
                                        <RatingSmileys
                                            count_value={opt?.count_value}
                                            rating_id={opt?.rating_id}
                                            updateFeedback={updateFeedback}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.8rem',
                            margin: '1rem 0',
                            zIndex: '5',
                        }}
                    >
                        <CustomInputTextArea
                            height={'38px'}
                            row={2}
                            label={'Got comments?'}
                            placeholder={'Give your comments...'}
                            width={{
                                xs: '100%',
                            }}
                            value={formData.reason}
                            onChange={(e) =>
                                handleInputChange('reason', e.target.value)
                            }
                            type='text'
                        />
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <LoadingButton
                                sx={{
                                    textTransform: 'capitalize',
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    letterSpacing: '2px',
                                    fontPalette: 'light',
                                    bgcolor: 'rgba(38, 20, 51, 1)',
                                    ':hover': {
                                        bgcolor: 'rgba(38, 20, 51, 0.8)',
                                    },
                                }}
                                variant='contained'
                                color='secondary'
                                loading={loadingFeedbackUpdate}
                                loadingPosition='start'
                                onClick={handleSubmit}
                            >
                                Send Feedback
                            </LoadingButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </SideBar>
    );
}

export default FeedBack;
