import React from 'react';
import './calendar.scss';
import { useNavigate } from 'react-router-dom';

const CalendarPage = () => {
    const navigate = useNavigate();

    const year = 2024;
    const month = 11; // November (1-based index)
    
    const generateCalendarDays = (year: any, month: any) => {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0);

        const totalDays = lastDayOfMonth.getDate();
        const startDay = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ...
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

        // Split days into weeks
        const weeks = [];
        for (let i = 0; i < daysInMonth.length; i += 7) {
            weeks.push(daysInMonth.slice(i, i + 7));
        }

        return weeks;
    };

    const goToDiary = (day: any) => {
        navigate('/diary', { state: { year, month, day } });
    }

    const weeks = generateCalendarDays(year, month);

    // Weekday headers
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="calendar-page">
            <header className="calendar-header">
                <h1 className="month-title">November {year}</h1>
            </header>

            {/* Render Weekday Headers */}
            <div className="weekday-header">
                {weekDays.map((day, index) => (
                    <div key={index} className="weekday">
                        {day}
                    </div>
                ))}
            </div>

            {/* Render Weeks */}
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="week">
                    <div className="days">
                        {week.map((day, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={`day ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
                            >
                                <div className="day-number">{day.date}</div>
                                {day.isCurrentMonth && (
                                    <div className="day-button" onClick={() => goToDiary(day.date)}>Nhật ký</div>
                                )}
                            </div>
                        ))}
                    </div>
                    {weekIndex === weeks.length - 1 && (
                        <div className="week-review">
                            <textarea
                                className="week-review-input"
                                placeholder="write something about week"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CalendarPage;
