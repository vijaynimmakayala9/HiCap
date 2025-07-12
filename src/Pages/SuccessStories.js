import React from 'react';

const stories = [
  {
    flag: 'https://flagcdn.com/w320/in.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    flag: 'https://flagcdn.com/w320/gb.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    flag: 'https://flagcdn.com/w320/us.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const SuccessStories = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-20">
      {/* Heading with green line, left aligned and smaller */}
      <div className="max-w-[600px] mb-12">
        <h1 className="font-roboto font-bold text-3xl sm:text-4xl md:text-5xl mb-2 text-black">
          Success Stories of our students!
        </h1>
        <div
          style={{
            width: '216px',
            height: '8px',
            borderRadius: '20px',
            backgroundColor: '#007860',
          }}
        />
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 md:gap-12">
        {stories.map(({ flag, text }, idx) => (
          <div
            key={idx}
            className="relative bg-white border border-black/50 rounded-[30px] p-5 flex flex-col items-center justify-start hover:shadow-xl hover:z-10 transition-all duration-300"
          >
            {/* Flag circle half outside top */}
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden border border-black/30 bg-white"
              style={{ boxShadow: '0 0 8px rgba(0,0,0,0.1)' }}
            >
              <img
                src={flag}
                alt="Country Flag"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Padding top so text doesn't overlap flag */}
            <p className="font-roboto text-sm md:text-base text-gray-700 text-center mt-14">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
