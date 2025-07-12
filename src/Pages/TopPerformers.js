import React from 'react';
import { CiCircleCheck } from 'react-icons/ci';


const TopPerformers = () => {
    const performerList = [
        { rank: '', name: 'Suresh', score: '10/10' },
        { rank: '', name: 'Suresh', score: '09/10' },
        { rank: '', name: 'Suresh', score: '08/10' },
        { rank: 4, name: 'Suresh', score: '07/10' },
        { rank: 5, name: 'Suresh', score: '08/10' },
    ];

    return (
        <section className="w-full px-6 md:px-[60px] py-20 pt-0 font-roboto">
            {/* Section Heading */}
            <div className="max-w-[600px] mb-12">
                <h1 className="font-bold text-3xl mb-2 text-black">Top Performers</h1>
                <div className="w-[216px] h-2 rounded-[20px] bg-[#007860]" />
            </div>

            {/* Top 3 Podium Section */}
            <div className="max-w-[1200px] mx-auto bg-white border border-[#00000033] rounded-[20px] p-8 flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
                {/* Left Text */}
                <div className="flex-1 mb-6 md:mb-0">
                    <h2 className="text-[24px] md:text-[28px] font-semibold text-black mb-3">
                        The Best Performers of this Course
                    </h2>
                    <p className="text-[16px] text-black max-w-[500px]">
                        We assess each student’s strengths, challenges, and goals to build a roadmap that suits them.
                    </p>
                </div>

                {/* Podiums */}
                <div className="flex items-end gap-0">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center relative">
                        <div className="w-[100px] h-[140px] bg-[#D0DEEB] rounded-t-[50px] rounded-b-[10px] flex flex-col justify-end items-center pt-14 pb-3 text-center relative">
                            <img
                                src="/award.png"
                                alt="2nd Performer"
                                className="w-[55px] h-[55px] rounded-full object-cover absolute -top-6 border-4 border-white shadow-md"
                            />
                            <span className="text-xs font-semibold text-[#333]">🥈 2nd Medal</span>
                            <span className="text-sm font-medium text-black">Name</span>
                            <span className="text-lg font-bold text-black">2</span>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center relative">
                        <div className="w-[100px] h-[180px] bg-[#FDC65C] rounded-t-[50px] rounded-b-[10px] flex flex-col justify-end items-center pt-14 pb-3 text-center relative">
                            <img
                                src="/award.png"
                                alt="1st Performer"
                                className="w-[55px] h-[55px] rounded-full object-cover absolute -top-6 border-4 border-white shadow-md"
                            />
                            <span className="text-xs font-semibold text-[#333]">🥇 1st Medal</span>
                            <span className="text-sm font-medium text-black">Name</span>
                            <span className="text-lg font-bold text-black">1</span>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center relative">
                        <div className="w-[100px] h-[140px] bg-[#FFD3C4] rounded-t-[50px] rounded-b-[10px] flex flex-col justify-end items-center pt-14 pb-3 text-center relative">
                            <img
                                src="/award.png"
                                alt="3rd Performer"
                                className="w-[55px] h-[55px] rounded-full object-cover absolute -top-6 border-4 border-white shadow-md"
                            />
                            <span className="text-xs font-semibold text-[#333]">🥉 3rd Medal</span>
                            <span className="text-sm font-medium text-black">Name</span>
                            <span className="text-lg font-bold text-black">3</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower Performer List */}
            <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
                {performerList.map((performer, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border border-gray-200 rounded-xl p-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {!performer.rank ? (
                                    <img
                                        src="/award.png"
                                        alt="Award"
                                        className="w-[40px] h-[40px] rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="text-lg font-bold text-black w-6">{performer.rank}</div>
                                )}
                                <img
                                    src="/performer.png"
                                    alt="Performer"
                                    className="w-[40px] h-[40px] rounded-full object-cover"
                                />
                            </div>


                            <div>
                                <div className="font-semibold text-black">{performer.name}</div>
                                <div className="text-sm text-gray-600">
                                    We assess each student’s strengths, challenges, and goals to build a roadmap that suits them.
                                </div>
                            </div>
                        </div>
                        {/* ✅ Only this part updated */}
                        <div className="flex flex-col items-center">
                            <CiCircleCheck className="text-green-600 text-xl mb-1" />
                            <div className="text-sm font-bold text-[#007860]">{performer.score}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopPerformers;
