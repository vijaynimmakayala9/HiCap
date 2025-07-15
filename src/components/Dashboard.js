// components/DashboardSection.js
import React from "react";
import EnrolledCourses from '../Pages/EnrolledCourses';
import LiveClasses from '../Pages/LiveClasses';
import CompletedClasses from '../Pages/CompletedClasses';
import RecommendedCourses from '../Pages/RecommendedCourses';
import TopPerformers from '../Pages/TopPerformers';
import YourStatistics from '../Pages/YourStatistics';
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";


const Dashboard = () => {
    return (
        <>
            <Header />
            <div className="my-5 p-2">
                <EnrolledCourses />
                <LiveClasses />
                <YourStatistics />
                <CompletedClasses />
                <RecommendedCourses />
                <TopPerformers />
            </div>
        </>
    );
};

export default Dashboard;
