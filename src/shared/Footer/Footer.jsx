import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import NavLogo from "../Navbar/NavLogo";

const Footer = () => {
  return (
    <div className="text-white w-full mx-auto   bg-blue-950">
      <footer className=" px-12 md:px-36 lg:px-44 py-10">
        <div className=" flex flex-col md:flex-row md:justify-between">
          {/* Logo & Description */}
          <div>
            {/* <div className="flex gap-1 items-center  mb-2">
              <img src="/favicon2.png" alt="" className='w-14 h-14'/> 
              <h2 className="text-xl lg:text-2xl font-bold mb-3">CourseMaster</h2>
            </div> */}
            <NavLogo></NavLogo>
            <p className="text-sm w-64 mb-4 lg:w-96">
              Empower your learning journey with our smart, interactive
              platform. Connect, engage, and excel in your education.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <ul className="text-sm space-y-2">
              <li>
                <span className="font-semibold">Email:</span>{" "}
                support@coursemaster.com
              </li>
              <li>
                <span className="font-semibold">Phone:</span> +880 1234 567888
              </li>
              <li>
                <span className="font-semibold">Address:</span> 123 Savar,
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 text-2xl social">
              <a
                href="https://www.facebook.com/Saria.Khatun.03"
                target="_blank"
              >
                <FaFacebookF />
              </a>
              <a href="https://github.com/sariakhatun" target="_blank">
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/saria_khatun24?igsh=cWF1NHJoZXhwdjdk"
                target="_blank"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/saria-khatun/"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="py-8 font-bold text-center text-sm">
        &copy; {new Date().getFullYear()} - All rights reserved by CourseMaster
      </div>
    </div>
  );
};

export default Footer;
