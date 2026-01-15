import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

const SocialMediaFooter = () => {
  return (
    <div className="w-full">
      <div className="bg-secondaryBrown w-full flex justify-center items-center flex-col py-4 gap-3">
        <p className="text-base text-white font-light">Follow us on:</p>
        <div className="flex gap-3 text-white text-lg">
          <FaFacebookF />
          <FaInstagram />
          <FaTiktok />
          <FaLinkedinIn />
          <FaPinterestP />
          <FaYoutube />
        </div>
      </div>
    </div>
  );
};
export default SocialMediaFooter;
