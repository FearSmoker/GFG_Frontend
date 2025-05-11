import GradientBox from "../components/GradientBox";
import NeonText from "../components/NeonText";
const AboutUs=()=>{
    return (
      <div>
        <div className="bg-[#000000] min-h-screen text-white flex flex-col justify-center items-center gap-10 ">
          <div className="flex gap-5 justify-center mt-5 ">
            <NeonText text="ABOUT" color="text-white underline" />
            <NeonText text="US" color="text-emerald-500 underline" />
          </div>
          <p className="text-center px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            debitis, cupiditate voluptate fugiat perspiciatis totam. Dolores
            magnam ex neque quas sit facere aperiam deserunt dolorem consequuntur,
            quo, nulla itaque aut! Lorem ipsum dolor sit amet consectetur
            adipisicing nemo incidunt blanditiis tempore commodi, earum
            nostrum quisquam saepe ab facilis, atque perspiciatis consequuntur
            quos ducimus ipsam tempora quibusdam fugit rerum. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Et repudiandae minus,
            accusamus, doloremque libero rem quam a nemo quo minima fugit omnis
            placeat dolor quia beatae reiciendis quis ea est?Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Tempora debitis, cupiditate
            voluptate fugiat perspiciatis totam. Dolores magnam ex neque quas sit
            facere aperiam deserunt dolorem consequuntur, quo, nulla itaque aut!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo
            incidunt blanditiis tempore commodi, earum nostrum quisquam saepe ab
            facilis, atque perspiciatis consequuntur quos ducimus ipsam tempora
            quibusdam fugit rerum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Et repudiandae minus, accusamus, doloremque libero
            rem quam a nemo quo minima fugit omnis placeat dolor quia beatae
            reiciendis quis ea est?
          </p>
          <p className="text-center px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            debitis, cupiditate voluptate fugiat perspiciatis totam. Dolores
            magnam ex neque quas sit facere aperiam deserunt dolorem consequuntur,
            quo, nulla itaque aut! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Esse nemo incidunt blanditiis tempore commodi, earum
            nostrum quisquam saepe ab facilis, atque perspiciatis consequuntur
            quos ducimus ipsam tempora quibusdam fugit rerum. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Et repudiandae minus,
            accusamus, doloremque libero rem quam a nemo quo minima fugit omnis
            placeat dolor quia beatae reiciendis quis ea est? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Tempora debitis, cupiditate
            voluptate fugiat perspiciatis totam. Dolores magnam ex neque quas sit
            facere aperiam deserunt dolorem consequuntur, quo, nulla itaque aut!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nemo
            incidunt blanditiis tempore commodi, earum nostrum quisquam saepe ab
            facilis, atque perspiciatis consequuntur quos ducimus ipsam tempora
            quibusdam fugit rerum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Et repudiandae minus, accusamus, doloremque libero
            rem quam a nemo quo minima fugit omnis placeat dolor quia beatae
            reiciendis quis ea est?
          </p>
          <div className="w-[80%] max-w-[77.625rem] h-[0.01rem] bg-white mx-auto"></div>
          <a
            className="pb-5 underline"
            href="https://mail.google.com/mail/?view=cm&to=geeksforgeekmits@gmail.com" target="_blank"
          >
            <GradientBox text="&nbsp;geeksforgeekmits@gmail.com&nbsp;" />
          </a>
        </div>
      </div>
    );
}
export default AboutUs