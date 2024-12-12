

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-5 lg:px-10">
        <div className="flex flex-wrap justify-between">
          {/* Logo and About Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h1 className="text-2xl font-bold ">(~日本~ Learn)</h1>
            <p className="mt-4 text-gray-300">
              Expand your Japanese vocabulary with fun and engaging lessons. Start your journey to mastering Japanese today!
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold ">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:underline text-gray-300">Home</a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-300">Lessons</a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-300">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-300">About</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold ">Contact Us</h2>
            <p className="mt-4 text-gray-300">Email: support@nihonlearn.com</p>
            <p className="text-gray-300">Phone: +123 456 789</p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-300 hover:">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-300 hover:">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">
            © 2024 (~日本~ Learn). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
