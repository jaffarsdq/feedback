import { Box, Typography } from '@mui/material';
import { useState } from 'react';

function RatingStars({ count_value, rating_id, updateFeedback }) {
    const [value, setValue] = useState(0);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const [hoveredText, setHoveredEmojiText] = useState(null);

    let emojis = ['⭐', '⭐', '⭐', '⭐', '⭐'];
    let filteredEmojis;

    switch (count_value) {
        case '3':
            filteredEmojis = [emojis[0], emojis[2], emojis[4]];
            break;
        case '4':
            filteredEmojis = emojis.filter((_, index) => index !== 1);
            break;
        case '5':
            filteredEmojis = emojis.slice();
            break;
        default:
            filteredEmojis = [];
            console.log('Invalid count_value');
    }

    emojis = filteredEmojis;

    const colors = [
        'rgba(255, 0, 0, 0.7)',
        'rgba(255, 165, 0, 0.7)',
        'rgba(255, 255, 0, 0.7)',
        'rgba(144, 238, 144, 0.7)',
        'rgba(0, 128, 0, 0.7)',
    ];

    let messages = ['Terrible', 'Bad', 'Okay', 'Good', 'Great'];
    let filteredMessages;

    switch (count_value) {
        case '3':
            filteredMessages = [messages[0], messages[2], messages[4]];
            break;
        case '4':
            filteredMessages = messages.filter((_, index) => index !== 1);
            break;
        case '5':
            filteredMessages = messages.slice();
            break;
        default:
            filteredMessages = [];
            console.log('Invalid count_value');
    }

    messages = filteredMessages;

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
            {emojis.map((emoji, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Box
                        component='div'
                        onClick={() => handleChange(index + 1)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            position: 'relative',
                            fontSize: {
                                xs: '26px',
                                sm: '50px',
                                md: '60px',
                                lg: '90px',
                                xl: '120px',
                            },
                            cursor: 'pointer',
                            display: 'flex',
                            borderRadius: '50%',
                            opacity:
                                index < value
                                    ? 1
                                    : hoveredEmoji === index
                                    ? 0.8
                                    : 0.65,
                            filter: `drop-shadow(0 0 5px ${
                                index < value || hoveredEmoji === index
                                    ? colors[index]
                                    : 'rgba(0, 0, 0, 0.25)'
                            })`,
                            animation:
                                index === value - 1
                                    ? 'jiggle 0.6s ease'
                                    : 'none',
                            ':hover': { opacity: 0.9, transform: 'scale(1.2)' },
                        }}
                    >
                        {emoji}
                    </Box>
                    <Typography
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
                                index + 1 === value
                                    ? 'white'
                                    : hoveredText === index
                                    ? 'white'
                                    : 'grey',
                            zIndex: '5',
                            mb: 1,
                        }}
                    >
                        {messages[index]}
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

export default RatingStars;
