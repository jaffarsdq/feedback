import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import BadFace from '../../assets/BadFace.png';
import TerribleFace from '../../assets/TerribleFace.png';
import OkayFace from '../../assets/OkayFace.png';
import GoodFace from '../../assets/GoodFace.png';
import GreatFace from '../../assets/GreatFace.png';

function RatingSmileys({ count_value, rating_id, updateFeedback }) {
    const [value, setValue] = useState(0);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const [hoveredText, setHoveredEmojiText] = useState(null);

    // Update the images array based on count_value
    const images = [
        TerribleFace, // For rating 1
        BadFace, // For rating 2
        OkayFace, // For rating 3
        GoodFace, // For rating 4
        GreatFace, // For rating 5
    ];

    let filteredImages;

    switch (count_value) {
        case '3':
            // Display 1, 3, and 5 (indices 0, 2, and 4)
            filteredImages = [images[0], images[2], images[4]];
            break;
        case '4':
            // Display all except 2 (index 1)
            filteredImages = images.filter((_, index) => index !== 1);
            break;
        case '5':
            // Display all
            filteredImages = images.slice();
            break;
        default:
            // Handle any unexpected count_value
            filteredImages = [];
            console.log('Invalid count_value');
    }

    const colors = [
        'rgba(255, 0, 0, 0.7)', // Red with alpha 0.7
        'rgba(255, 165, 0, 0.7)', // Orange with alpha 0.7
        'rgba(255, 255, 0, 0.7)', // Yellow with alpha 0.7
        'rgba(144, 238, 144, 0.7)', // Light Green with alpha 0.7
        'rgba(0, 128, 0, 0.7)', // Green with alpha 0.7
    ];

    let messages = ['Terrible', 'Bad', 'Okay', 'Good', 'Great'];

    let filteredMessages;

    switch (count_value) {
        case '3':
            // Display 1, 3, and 5 (indices 0, 2, and 4)
            filteredMessages = [messages[0], messages[2], messages[4]];
            break;
        case '4':
            // Display all except 2 (index 1)
            filteredMessages = messages.filter((_, index) => index !== 1);
            break;
        case '5':
            // Display all
            filteredMessages = messages.slice();
            break;
        default:
            // Handle any unexpected count_value
            filteredMessages = [];
            console.log('Invalid count_value');
    }

    const handleChange = (newValue) => {
        setValue(newValue);
        updateFeedback(rating_id, newValue);
    };

    const handleMouseEnter = (index) => {
        setHoveredEmojiText(index);
        setHoveredEmoji(index);
    };

    const handleMouseLeave = () => {
        setHoveredEmojiText(null);
        setHoveredEmoji(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'space-evenly',
                zIndex: '5',
            }}
        >
            {filteredImages.map((image, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        gap: '1rem',
                        padding: '1rem 0',
                    }}
                >
                    <Box
                        component='div'
                        onClick={() => handleChange(index + 1)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            position: 'relative',
                            width: {
                                xs: '50px', // Small screens
                                sm: '75px', // Medium screens
                                md: '100px', // Large screens
                                lg: '125px', // Extra-large screens
                                xl: '130px', // Extra extra-large screens
                            },
                            height: {
                                xs: '50px',
                                sm: '75px',
                                md: '100px',
                                lg: '125px',
                                xl: '130px',
                            },
                            cursor: 'pointer',
                            display: 'flex',
                            borderRadius: '50%',
                            opacity:
                                value === index + 1
                                    ? 1
                                    : hoveredEmoji === index
                                    ? 0.8
                                    : 0.65,
                            filter: `drop-shadow(0 0 5px ${
                                value === index + 1 || hoveredEmoji === index
                                    ? colors[index]
                                    : 'rgba(0, 0, 0, 0.25)'
                            })`,
                            animation:
                                value === index + 1
                                    ? 'jiggle 0.6s ease'
                                    : 'none',
                            ':hover': { opacity: 0.9, transform: 'scale(1.2)' },
                        }}
                    >
                        <img
                            src={image}
                            alt={messages[index]}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                            }}
                        />
                    </Box>

                    <Typography
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            fontStyle: 'italic',
                            fontSize: {
                                xs: '12px',
                                sm: '14px',
                                md: '16px',
                                lg: '18px',
                                xl: '20px',
                            },
                            color:
                                value === index + 1
                                    ? 'white'
                                    : hoveredText === index
                                    ? 'white'
                                    : 'grey',
                            zIndex: '5',
                        }}
                    >
                        {filteredMessages[index]}
                    </Typography>
                </Box>
            ))}
            <style>
                {`
                @keyframes jiggle {
                    0% { transform: rotate(0deg) scale(1); }
                    25% { transform: rotate(-20deg) scale(1.2); }
                    50% { transform: rotate(20deg) scale(1.1); }
                    75% { transform: rotate(-20deg) scale(1.2); }
                    100% { transform: rotate(0deg) scale(1); }
                }
                `}
            </style>
        </Box>
    );
}

export default RatingSmileys;
