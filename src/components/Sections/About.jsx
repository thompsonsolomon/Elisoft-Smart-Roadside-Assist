// import teamImg from "../../Asset/team.jpg"; // Replace with your actual image path

export default function AboutPage() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-12 bg-gray-900/50 min-h-screen" id="about">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            About <span className="text-yellow-500">Elisoft</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We connect car owners with skilled and trusted mechanics near them, ensuring fast, affordable, and reliable service anytime, anywhere.
          </p>
        </div>

        {/* Two Column Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Our Mission</h3>
            <p className="text-gray-400 mb-6">
              Our goal is to revolutionize vehicle repair and maintenance by bridging the gap between drivers and verified mechanics. Whether you're stranded or just need regular maintenance, Elisoft ensures help is just a click away.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-white">Why Choose Us?</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Verified and skilled mechanics</li>
              <li>Real-time location-based assistance</li>
              <li>Secure and fast payments</li>
              <li>Friendly customer support</li>
            </ul>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-xl">
            {/* <img src={teamImg} alt="Our Team" className="w-full h-auto object-cover" /> */}
          </div>
        </div>

        {/* Footer CTA */}
        {/* <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">
            Ready to experience stress-free car service?
          </h3>
          <a
            href="/register"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-lg transition"
          >
            Join Elisoft Today
          </a>
        </div> */}
      </div>
    </section>
  );
}
