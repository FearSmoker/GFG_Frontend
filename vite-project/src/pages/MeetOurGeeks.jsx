import pic from "../assets/pic.jpg";
const CIRCLE_MEMBERS = [
  { name: "Shivani Sharma", role: "Content Lead", img: pic ,link:""},
  { name: "Pulkit Kapoor", role: "Social-Media Lead", img: pic ,link:""},
  { name: "Varsha Narwariya", role: "PR and Outreach Lead", img: pic ,link:""},
  { name: "Ishaan Sharma", role: "Technical Lead", img: pic ,link:""},
  { name: "Bhoomi Garg", role: "Marketing Lead", img: pic ,link:""},
];
const DEV_MEMBERS = [
    { name: "Aryan Saxena", role: "Full-Stack Developer", img: pic ,link:""},
    { name: "Priyansh Soni", role: "Frontend Developer", img: pic ,link:""},
    { name: "Titiksha Yadav", role: "Designer", img: pic ,link:""},
    { name: "Harshit Tiwari", role: "Frontend Developer", img: pic,link:"" },
    { name: "Jagrat Agrawal", role: "Frontend Developer", img: pic ,link:""},
    { name: "Unnati Jadon", role: "Frontend Developer", img: pic ,link:""},
    { name: "Sneha Tomar", role: "Frontend Developer", img: pic ,link:""},
  ];
const LEADS = [
  { name: "Priyanka Sikarwar", role: "President", img: pic ,link:""},
  { name: "Bhumi Shivhare", role: "Vice president", img: pic ,link:""},
];

const MeetOurGeeks = () => {
  return (
    <div style={{ fontFamily: 'Cabin, sans-serif' }} className=" bg-gradient-to-b from-[#011725] via-[#013a28] to-[#011725] text-white p-10 ">
      
      <h1 className="text-center text-4xl md:text-[3rem] mb-4"><span className='text-[#0065A5]'>&lt; </span><span className='text-[#00FFAF]'>Meet Our Geeks</span> <span className='text-[#0065A5]'>&gt;</span></h1>
      <p className="text-center text-lg md:text-xl mb-15 text-[#A6A6A6]">
        The Hardworkers behind the Success of <span className='text-emerald-700'>Geeks<span className='text-[#0065A5]'>For</span>Geeks</span>
      </p>

      {/* Leads Section */}
      <div className="flex flex-wrap justify-center  gap-14 xl:gap-52 mb-10">
        {LEADS.map((person, index) => (
          <div key={index} className=" text-black rounded-lg p-4 w-96 flex flex-col  bg-[#011725] border-[0px] border-white shadow-[0_0_4px_0.1px_white]">
            <div className='flex'>
                <img src={person.img} alt={person.name} className="w-24 h-24 object-cover  rounded-full border-3 border-white" />
                <div>
                    <h2 className="text-2xl text-[#FFFFFF] pl-3  mt-2">{person.name}</h2>
                    <p className="text-lg text-[#00FFAF] pl-3">{person.role}</p>
                </div>
            </div>
            <a href={person.link} className="border w-40 ml-24 ">
              <button className="border-[0px] hover:cursor-pointer border-white shadow-[0_0_4px_0.1px_white] text-lg w-40   bg-gradient-to-r from-[#0BA5C9] to-[#00fcB1] text-white py-2 px-4 rounded hover:bg-teal-700">
                View Profile
              </button>
            </a>
          </div>
        ))}
      </div>
      {/* Circle Members Section */}
      <p className='flex justify-center text-3xl mb-10'>Leads</p>
      <div className="flex flex-wrap justify-center gap-14">
        {CIRCLE_MEMBERS.map((person, index) => (
          <div key={index} className=" text-black rounded-lg p-4 w-96 flex flex-col  bg-[#011725] border-[0px] border-white shadow-[0_0_4px_0.1px_white]">
          <div className='flex'>
              <img src={person.img} alt={person.name} className="w-24 h-24 object-cover  rounded-full border-3 border-white" />
              <div>
                  <h2 className="text-2xl text-[#FFFFFF] pl-3  mt-2">{person.name}</h2>
                  <p className="text-lg text-[#00FFAF] pl-3">{person.role}</p>
              </div>
          </div>
          <a href={person.link} className="border w-40 ml-24 ">
              <button className="border-[0px] hover:cursor-pointer border-white shadow-[0_0_4px_0.1px_white] text-lg w-40   bg-gradient-to-r from-[#0BA5C9] to-[#00fcB1] text-white py-2 px-4 rounded hover:bg-teal-700">
                View Profile
              </button>
            </a>
        </div>
        ))}
      </div>
      <h1 className="text-center text-2xl sm:text-3xl mt-24">Meet Our Designer(s) & Developers</h1>
      <p className="text-center mb-14 mt-4 text-lg sm:text-xl text-[#A6A6A6]">
        The Brilliant Minds behind the making of <span className='text-emerald-700'>Geeks<span className='text-[#0065A5]'>For</span>Geeks</span> Website
      </p>
      {/* DEVS */}
      <div className="flex flex-wrap justify-center gap-14">
        {DEV_MEMBERS.map((person, index) => (
          <div key={index} className=" text-black rounded-lg p-4 w-96 flex flex-col  bg-[#011725] border-[0px] border-white shadow-[0_0_4px_0.1px_white]">
          <div className='flex'>
              <img src={person.img} alt={person.name} className="w-24 h-24 object-cover  rounded-full border-3 border-white" />
              <div>
                  <h2 className="text-2xl text-[#FFFFFF] pl-3  mt-2">{person.name}</h2>
                  <p className="text-lg text-[#00FFAF] pl-3">{person.role}</p>
              </div>
          </div>
          <a href={person.link} className="border w-40 ml-24 ">
              <button className="border-[0px] hover:cursor-pointer border-white shadow-[0_0_4px_0.1px_white] text-lg w-40   bg-gradient-to-r from-[#0BA5C9] to-[#00fcB1] text-white py-2 px-4 rounded hover:bg-teal-700">
                View Profile
              </button>
            </a>
        </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurGeeks;
