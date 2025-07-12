import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

const blogData = new Array(9).fill({
  title: 'Blog Title',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
  image: '/blog.png', // Adjust if needed
});

const BlogPage = () => {
  return (
    <>
      <Header />

      <div
        style={{
          maxWidth: '1280px',
          margin: '60px auto',
          padding: '0 24px',
          fontFamily: 'Roboto',
          marginTop: '100px',  // Added margin-top for spacing from top
        }}
      >
        {/* Heading with green line, left aligned and smaller */}
        <div className="max-w-[600px] mb-12 mt-18">
          <h1 className="font-roboto font-bold text-3xl mb-2 mt-10 text-black">
            Our Latest Blogs
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

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            justifyContent: 'space-between',
          }}
        >
          {blogData.map((blog, index) => (
            <div
              key={index}
              style={{
                width: '387px',
                height: '400px', // reduced from 443px
                backgroundColor: '#FFFFFF',
                boxShadow: '0px 4px 4px 0px #00000040',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <img
                src={blog.image}
                alt="Blog"
                style={{
                  width: '363px',
                  height: '210px', // slightly reduced
                  objectFit: 'cover',
                  margin: '12px auto 0',
                  borderRadius: '8px',
                }}
              />
              <div style={{ padding: '16px', paddingBottom: '40px' }}>
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}
                >
                  {blog.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                  {blog.description}
                </p>
              </div>

              {/* Share Icon Bottom Right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '16px',
                  cursor: 'pointer',
                  color: '#007860',
                  fontSize: '18px',
                }}
                title="Share this blog"
              >
                <FaShareAlt />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
