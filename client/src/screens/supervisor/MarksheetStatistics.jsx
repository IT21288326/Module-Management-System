import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';

const MarksheetStatistics = () => {
    const [statistics, setStatistics] = useState(null);

    // Fetch statistics data from the backend API
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/marking/statistics');
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    // Prepare data for bar chart and line chart
    const prepareData = () => {
        if (!statistics) return;

        const { gradeCounts, passPercentage, failPercentage, gradesArray } = statistics;

        // Create data for bar chart (grades distribution)
        const grades = Object.keys(gradeCounts);
        const counts = grades.map(grade => gradeCounts[grade]);

        const barChartData = {
            labels: grades,
            datasets: [
                {
                    label: 'Grade Distribution',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        };

        // Create data for line chart (bell curve)
        // Generate the frequency distribution of grades
        const frequency = {};
        gradesArray.forEach((grade) => {
            const gradeValue = Math.floor(grade);
            if (frequency[gradeValue]) {
                frequency[gradeValue]++;
            } else {
                frequency[gradeValue] = 1;
            }
        });

        const sortedFrequencies = Object.entries(frequency).sort(([a], [b]) => a - b);
        const lineChartData = {
            labels: sortedFrequencies.map(([grade]) => grade),
            datasets: [
                {
                    label: 'Bell Curve',
                    data: sortedFrequencies.map(([, count]) => count),
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 0.6)',
                    tension: 0.4,
                },
            ],
        };

        return { barChartData, lineChartData, passPercentage, failPercentage };
    };

    const data = prepareData();

    return (
        <div>
            <h1>Marksheet Statistics</h1>
            {statistics ? (
                <div>
                    <h2>Pass/Fail Status</h2>
                    <p>Pass Percentage: {data.passPercentage.toFixed(2)}%</p>
                    <p>Fail Percentage: {data.failPercentage.toFixed(2)}%</p>

                    <h2>Grade Distribution</h2>
                    <Bar data={data.barChartData} />

                    <h2>Bell Curve</h2>
                    <Line data={data.lineChartData} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MarksheetStatistics;
