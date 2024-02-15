import "../index.css";

const AboutUs = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="grid grid-flow-row auto-rows-auto gap-y-3 rounded-xl justify-self-center bg-black/75 backdrop-blur w-[80%]">
        <div id="logo" className="p-2 pt-10">
          <h1 id="title" className="text-3xl">
            {" "}
            About Us{" "}
          </h1>
        </div>
        <p className="text-left px-3 m-2">
          Welcome to [Your Company Name], where the magic of cinema comes to
          life. We are your premier destination for all things movies, dedicated
          to providing you with an unparalleled cinematic experience. Our
          mission is to connect movie enthusiasts like you with the films you
          love, creating unforgettable moments one frame at a time.
        </p>
        <section>
          <h5 className="text-left font-semibold px-3 m-2">Our Story</h5>
          <p className="text-left px-3 m-3">
            Founded in [Year], [Your Company Name] was born out of a shared
            passion for film and a vision to bring the silver screen experience
            to every home. Over the years, we have evolved into a leading
            movie-selling company, serving customers across the globe. Our
            journey is marked by a deep appreciation for storytelling,
            creativity, and the power of movies to inspire, entertain, and
            provoke thought.
          </p>
        </section>
        <section>
          <h5 className="text-left font-semibold px-3 m-2">What We Offer</h5>
          <p className="text-left px-3 m-3">
            At [Your Company Name], we curate an extensive collection of films
            spanning every genre, from timeless classics to the latest
            blockbusters. Whether you're a fan of heartwarming dramas, thrilling
            action, laugh-out-loud comedies, or mind-bending sci-fi, we've got
            something for everyone. Our commitment to quality ensures that you
            receive only the best in audio and video, making your home viewing
            experience truly exceptional.
          </p>
        </section>
        <section>
          <h5 className="text-left font-semibold px-3 m-2">Why Choose Us?</h5>
          <ol type="1" className="text-left px-3 m-3">
            <li>
              {" "}
              Exceptional Selection: We take pride in offering a vast and
              diverse movie catalog, ensuring there's something for every taste
              and mood.
            </li>
            <li>
              Unmatched Quality: Our commitment to high-quality audio and video
              ensures that you enjoy movies as they were meant to be
              experienced.
            </li>
            <li>
              Convenience: Shop from the comfort of your home, 24/7, with secure
              and easy-to-use online ordering.
            </li>
            <li>
              Expert Recommendations: Our movie aficionados are here to provide
              personalized recommendations, helping you discover hidden gems and
              new favorites.
            </li>
            <li>
              Customer-Centric Approach: Your satisfaction is our priority.
              We're always here to assist you with any inquiries or issues you
              may have.
            </li>
          </ol>
        </section>
        <section>
          <h5 className="text-left font-semibold px-3 m-2">Our Vision</h5>
          <p className="text-left px-3 m-3">
            At [Your Company Name], we envision a world where the magic of
            cinema is accessible to all. We believe that movies have the power
            to inspire, unite, and transform lives. Through our dedication to
            delivering the finest cinematic experiences, we aim to make this
            vision a reality.
          </p>
        </section>
        <section>
          <h5 className="text-left font-semibold px-3 m-2">
            Join Our Community
          </h5>
          <p className="text-left px-3 m-3">
            Become a part of the [Your Company Name] community, where movie
            lovers come together to celebrate their passion for film. Follow us
            on social media, subscribe to our newsletter, and stay updated on
            the latest releases, exclusive offers, and special events.
          </p>
        </section>
        <section>
          <h5 className="text-left font-semibold px-3 m-2">Contact Us</h5>
          <p className="text-left px-3 m-3">
            We're always just a click away. If you have any questions,
            suggestions, or simply want to share your love for movies, don't
            hesitate to reach out. We value your feedback and look forward to
            serving you. Thank you for choosing [Your Company Name] as your
            trusted source for cinematic treasures. Let's embark on this
            cinematic journey together, one movie at a time.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
