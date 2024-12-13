import React, { useEffect, useState } from 'react';
import './calendar.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DiaryEntry {
    day: string;
    emotion: { emotion_name: string; emotion_percent: string }[];
}

const CalendarPage = () => {
    const navigate = useNavigate();
    const [year, setYear] = useState(2024);
    const [month, setMonth] = useState(12);
    const [diaryData, setDiaryData] = useState<DiaryEntry[]>([]);
    const [diaryContent, setDiaryContent] = useState<String | null>(null);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [mostEmotion, setMostEmotion] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [emotionCounts, setEmotionCounts] = useState<Record<string, number>>({});
    const emotionLabels = Object.keys(emotionCounts);
    const emotionData = Object.values(emotionCounts);

    const chartData = {
        labels: emotionLabels,
        datasets: [
            {
                label: 'Emotion Counts',
                data: emotionData,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#C9CBCF',
                ],
            },
        ],
    };
    const chartOptions = {
        indexAxis: 'y' as const, // Horizontal chart
        responsive: true,
        maintainAspectRatio: false, // Allow custom height
        plugins: {
            legend: {
                display: false, // Hide legend if not needed
            },
            title: {
                display: true,
                text: `Phân tích cảm xúc tháng ${month}/${year} của bạn`,
                font: {
                    size: 17, // Adjust the size here (default is 12)
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        // Use the dataset label (emotion name)
                        return `Cảm xúc: ${context.label}`;
                    },
                },
                font: {
                    size: 15, // Adjust the size here (default is 12)
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
        },
    };

    const happyGif = '/asset/gif/happy.gif';
    const sadGif = '/asset/gif/sad.gif';
    const surpriseGif = '/asset/gif/surprise.gif';
    const angryGif = '/asset/gif/angry.gif';
    const boredGif = '/asset/gif/bored.gif';
    const anxiousGif = '/asset/gif/anxious.gif';
    const neutralGif = '/asset/gif/neutral.gif';

    const emotionToGifMap: Record<string, string> = {
        Happy: happyGif,
        Sad: sadGif,
        Surprise: surpriseGif,
        Angry: angryGif,
        Bored: boredGif,
        Anxious: anxiousGif,
        Neutral: neutralGif,
    };

    const emotionToColorMap: Record<string, string> = {
        Happy: '#FF6384',
        Sad: '#36A2EB',
        Surprise: '#FF9F40',
        Angry: '#FFCE56',
        Bored: '#9966FF',
        Anxious: '#4BC0C0',
        Neutral: '#C9CBCF',
    };
    


    const generateCalendarDays = (year: number, month: number) => {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0);

        const totalDays = lastDayOfMonth.getDate();
        const startDay = firstDayOfMonth.getDay();
        const daysInMonth = [];

        for (let i = 0; i < startDay; i++) {
            daysInMonth.push({ date: null, isCurrentMonth: false });
        }

        for (let i = 1; i <= totalDays; i++) {
            daysInMonth.push({ date: i, isCurrentMonth: true });
        }

        while (daysInMonth.length % 7 !== 0) {
            daysInMonth.push({ date: null, isCurrentMonth: false });
        }

        const weeks = [];
        for (let i = 0; i < daysInMonth.length; i += 7) {
            weeks.push(daysInMonth.slice(i, i + 7));
        }

        return weeks;
    };

    const goToDiary = (day: number) => {
        navigate('/diary', { state: { year, month, day } });
    };

    const fetchDiary = () => {
        axios
            .get(`${process.env.REACT_APP_link_server}/diary`)
            .then((res) => {
                const fetchedData = res.data;
                setDiaryData(fetchedData);

                // Perform the calculation directly with the fetched data
                calculateEmotionCounts(month, fetchedData);
            })
            .catch((error) => console.error('Error fetching diary data:', error));
    };


    const calculateEmotionCounts = (targetMonth: number, data: DiaryEntry[] = diaryData, targetYear: number = year) => {
        console.log(`Calculating for ${targetMonth}/${targetYear}`);
        const counts: Record<string, number> = {};

        data.forEach((entry: DiaryEntry) => {
            const entryDate = new Date(entry.day);
            if (entryDate.getFullYear() === targetYear && entryDate.getMonth() + 1 === targetMonth) {
                entry.emotion.forEach((emotion) => {
                    counts[emotion.emotion_name] = (counts[emotion.emotion_name] || 0) + 1;
                });
            }
        });

        setEmotionCounts(counts);
    };



    const findEmotionForDay = (day: number) => {
        const formattedDate = new Date(year, month - 1, day).toISOString().split('T')[0];
        const diaryEntry = diaryData.find((entry) => {
            if (!entry.day || isNaN(Date.parse(entry.day))) {
                console.warn(`Invalid date format in entry: ${entry.day}`);
                return false;
            }
            const entryDate = new Date(entry.day).toISOString().split('T')[0];
            return entryDate === formattedDate;
        });
        return diaryEntry ? diaryEntry.emotion : null;
    };

    const weeks = generateCalendarDays(year, month);
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetchDiary();
    }, []);

    const changeMonth = (increment: number) => {
        let newMonth = month + increment;
        let newYear = year;

        if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        } else if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        }

        // Update the state
        setMonth(newMonth);
        setYear(newYear);

        // Calculate emotion counts using the new values
        calculateEmotionCounts(newMonth, diaryData, newYear);
    };


    const getContentDiaryOfDay = (day: any) => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_link_server}/diary/day`, {
            params: {
                day: new Date(year, month - 1, day),
            }
        })
            .then(res => {
                setDiaryContent(res.data.content);
                setImages(res.data.images)
                const emotions = res.data.emotion;

                if (emotions && emotions.length > 0) {
                    let most = 0;
                    emotions.forEach((e: any) => {
                        if (parseFloat(e.emotion_percent) > most) {
                            most = parseFloat(e.emotion_percent);
                            setMostEmotion(e.emotion_name);
                        }
                    });
                }
                else {
                    setMostEmotion("");
                }
            })
            .catch(error => {
                console.error('Error fetching diary content:', error);
            })
            .finally(() => {
                setLoading(false)
            });
    };

    const handleDayClick = (day: any) => {
        getContentDiaryOfDay(day);
        setModalVisible(true);
    };

    return (
        <div className="calendar-page">
            <header className="calendar-header">
                <div className="month-title" style={{ cursor: 'pointer' }} onClick={() => changeMonth(-1)}>
                    {'<'}
                </div>
                <h1 className="month-title">{month} {year}</h1>
                <div className="month-title" style={{ cursor: 'pointer' }} onClick={() => changeMonth(1)}>
                    {'>'}
                </div>
            </header>

            <div className="weekday-header">
                {weekDays.map((day, index) => (
                    <div key={index} className="weekday">
                        {day}
                    </div>
                ))}
            </div>

            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="week">
                    <div className="days">
                        {week.map((day, dayIndex) => {
                            const emotions = day.date ? findEmotionForDay(day.date) : null;

                            // Generate gradient or solid background
                            const gradientBackground = day.isCurrentMonth
                                ? emotions && emotions.length > 0
                                    ? emotions.length === 1
                                        ? emotionToColorMap[emotions[0].emotion_name] || '#C9CBCF' // Solid color for single emotion
                                        : `linear-gradient(90deg, ${emotions
                                            .map((emotion) => {
                                                const color = emotionToColorMap[emotion.emotion_name] || '#C9CBCF';
                                                return `${color}`;
                                            })
                                            .join(', ')})` // Gradient for multiple emotions
                                    : '#f0f0f0' // Default background for current month days with no emotions
                                : '#333'; // Dark gray for non-current month days

                            return (
                                <div
                                    key={dayIndex}
                                    style={{
                                        cursor: 'pointer',
                                        background: gradientBackground,
                                        color: day.isCurrentMonth ? '#000' : '#aaa', // Text color for better readability
                                    }}
                                    className={`day ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
                                    onClick={() => {
                                        if (day.isCurrentMonth) {
                                            handleDayClick(day.date);
                                        }
                                    }}
                                >
                                    <div className="day-number">{day.date}</div>
                                    {day.isCurrentMonth && (
                                        <>
                                            <div className="day-button" onClick={() => goToDiary(day.date ?? 1)}>
                                                Nhật ký
                                            </div>
                                            {emotions && (
                                                <div className="emotions">
                                                    {emotions.map((emotion, idx) => (
                                                        <div key={idx} className="emotion">
                                                            {emotion.emotion_name}: {emotion.emotion_percent}%
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}


                    </div>
                </div>
            ))}

            {isModalVisible && !isLoading && (
                <div className="content_popup">
                    <div className="content_popup_modal">
                        <div className="content_popup_modal_header">Nội dung nhật ký của bạn{':>'}</div>
                        <div
                            className="popup_body"
                            dangerouslySetInnerHTML={{ __html: diaryContent?.toString() || 'Không có nội dung.' }}
                        ></div>
                        <div className="image_list">
                            {images && Array.isArray(images) && images.length > 0 ? (
                                images.map((img, index) => (
                                    <img key={index} src={img} alt={`img-${index}`} />
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {mostEmotion && mostEmotion !== "" && (
                                <img src={emotionToGifMap[mostEmotion]} alt={mostEmotion} style={{ width: '150px' }} />
                            )}
                        </div>
                        <div className="content_popup_modal_close" onClick={() => setModalVisible(false)}>X</div>
                    </div>

                </div>
            )}

            <div className="emotion-stats" style={{ height: '300px', margin: '0 auto' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default CalendarPage;
