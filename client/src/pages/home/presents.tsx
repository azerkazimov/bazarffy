export default function Presents() {
  return (
    <section className="bg-white">
      {/* First Section - Images Left, Text Right */}
      <div className="py-16">
        <div className="grid md:grid-cols-2 items-center">
          {/* Images Grid */}
          <div className="flex gap-4">
            <div className="h-[500px]">
              <img
                src="/rings.jpg"
                alt="Gold jewelry and flowers"
                className="w-full md:w-[700px] h-full object-cover"
              />
            </div>
            <div className="h-[500px]">
              <img
                src="/rings_2.jpg"
                alt="Gold rings"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="max-w-md px-8 flex flex-col gap-8 md:-ml-32">
            <h2 className="text-4xl font-light leading-tight tracking-tight">
              A Unique Watch That
              <br />
              Fits Your Style
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">
              The new Lawson collection is already here! This quartz Lawson
              Franklin 38 model, designed with simplicity and elegance, is truly
              a cherry on the cake. Comes in different sizes and band colors,
              has a stainless steel back for a personalized engraving.
            </p>
            <div className="pt-2">
              <button className="border-b-2 border-black pb-1 hover:border-[#FFA081] hover:text-[#FFA081] transition-colors duration-200 font-medium text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Text Left, Image Right */}

      <div className=" mt-8">
        <div className="grid md:grid-cols-2 md:pr-50 items-center ">
          {/* Text Content */}
          <div className="bg-[#F8F8F8] w-full h-full flex flex-col justify-center px-12">
            <div className="flex flex-col gap-8 justify-center max-w-md mx-auto">
              <h2 className="text-5xl font-light leading-tight tracking-tight">
                Ideal Has Never
                <br />
                Been Closer
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                Have you ever come across a thing that is impossible to resist?
                Meet the Lawson Jefferson 38! Run by the vibration of a quartz
                crystal (32,788 times per second) under current to keep possibly
                accurate time. You will feel absolutely over the moon with it,
                we guarantee!
              </p>
              <div className="pt-2">
                <button className="border-b-2 border-black pb-1 hover:border-[#FFA081] hover:text-[#FFA081] transition-colors duration-200 font-medium text-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="h-[632px]">
            <img
              src="/Rectangle_2.png"
              alt="Woman wearing necklace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
