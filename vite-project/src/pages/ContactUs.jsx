import GradientBox from "../components/GradientBox";
import NeonText from "../components/NeonText";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs=()=>{
    return (
      <div>
        
        <div className="bg-[#000000] min-h-screen text-white flex flex-col justify-center items-center gap-10 ">
          <div className="flex gap-5 justify-center mt-5 ">
            <NeonText text="CONTACT" color="text-white underline" />
            <NeonText text="US" color="text-emerald-500 underline" />
          </div>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfmPUIo9414HCOxThoFRXl8XeLz0yOBAtwXMaVRoktkJCsK8Q/viewform?embedded=true" width="640" height="856" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          <div className="w-[80%] max-w-[77.625rem] h-[0.01rem] bg-white mx-auto"></div>
          <a
            className="pb-5 underline"
            href="https://mail.google.com/mail/?view=cm&to=geeksforgeekmits@gmail.com" target="_blank"
          >
            <GradientBox text="geeksforgeekmits@gmail.com" />
          </a>
        </div>
        
      </div>
    );
}
export default ContactUs