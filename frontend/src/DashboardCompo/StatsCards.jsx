function StatsCards({ stats }) {
    const cards = [
      {
        title: 'Total Cases',
        value: stats.total || 0,
        icon: '📋',
        color: 'bg-blue-500',
        textColor: 'text-blue-600'
      },
      {
        title: 'Critical Cases',
        value: stats.critical || 0,
        icon: '🚨',
        color: 'bg-red-500',
        textColor: 'text-red-600'
      },
      {
        title: 'Pending',
        value: stats.pending || 0,
        icon: '⏳',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600'
      },
      {
        title: 'Resolved',
        value: stats.resolved || 0,
        icon: '✅',
        color: 'bg-green-500',
        textColor: 'text-green-600'
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h3 className={`text-2xl font-bold mt-2 ${card.textColor}`}>
                  {card.value}
                </h3>
              </div>
              <div className={`${card.color} p-3 rounded-full text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default StatsCards;