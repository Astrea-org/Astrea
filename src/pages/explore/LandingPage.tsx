import { TbListDetails } from "react-icons/tb";

function LandingPage() {
  return (
    <>
      <section className="bg-white mt-24">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
              Own your <br /> assets fr!
            </h1>
            <p className="max-w-[380px] mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Get secure data!
            </p>
            <a
              href="/add-asset"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 :text-white"
            >
              Get Started 🚀
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto">
          <h1 className="text-2xl font-bold">Trending Collection</h1>
          <p className="text-lg">
            Checkout our weekly updated trending collection.
          </p>
          <a href="/asset/sd2efs" className="text-white">
            <div className="mt-12 bg-[#3B3B3B] rounded-xl w-52">
              <img
                src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg"
                alt=""
                className="w-full h-auto rounded-t-xl"
              />
              <div className="py-4 px-3">
                <div className="flex justify-between">
                  <p className="text-white">Cats</p>
                  <span>
                    <TbListDetails />
                  </span>
                </div>
                <div className="mt-2">
                  <p>0.001 AR</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
