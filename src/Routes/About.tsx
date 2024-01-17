import fightwayImage from '../Assets/fightwayPhone.png';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-500 text-white py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-8">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold mb-6 leading-tight text-yellow-300">
            Welcome to <span className="text-yellow-500">Fightway</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            Welcome to Fightway – Your Martial Arts Haven!
            <br />
            I'm Nate, the owner of Fightway. Choose your favorite category and explore products tailored to your passion. Join us for a unique shopping experience at Fightway.
          </p>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={fightwayImage} // Replace with your image URL
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;