// components/DashboardSection.js
import React from "react";
import EnrolledCourses from '../Pages/EnrolledCourses';
import LiveClasses from '../Pages/LiveClasses';
import CompletedClasses from '../Pages/CompletedClasses';
import RecommendedCourses from '../Pages/RecommendedCourses';
import TopPerformers from '../Pages/TopPerformers';
import YourStatistics from '../Pages/YourStatistics';
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";


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
            <Footer/>
        </>
    );
};

export default Dashboard;
