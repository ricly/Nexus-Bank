export function Statistics() {
  const stats = [
    {
      number: "+120",
      label: "Countries",
      description: "supported globally",
    },
    {
      number: "1",
      label: "Platform",
      description: "for all banking needs",
    },
    {
      number: "99.99%",
      label: "Uptime",
      description: "for reliable banking",
    },
    {
      number: "24/7",
      label: "Support",
      description: "always available",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 rounded-lg border border-zinc-200 hover:border-emerald-400 transition-colors"
        >
          <div className="text-4xl font-bold text-emerald-500">
            {stat.number}
          </div>
          <div className="text-lg font-medium mt-2">{stat.label}</div>
          <div className="text-sm text-zinc-500 mt-1">{stat.description}</div>
        </div>
      ))}
    </div>
  );
}
