export function StatsSection() {
    const stats = [
      { number: "30,000+", label: "Active users" },
      { number: "10,000+", label: "Registered Mechanics" },
      { number: "10,000+", label: "Registered Clients" },
      { number: "50+", label: "Trusted Organizations" },
    ]
  
    return (
      <section className="py-16 px-4 bg-white/20 text-white mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  