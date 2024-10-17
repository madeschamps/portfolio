
export default function Section2() {
  const technologies = [
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces'
    },
    {
      name: 'WordPress',
      description: "The world's most popular website builder"
    },
    {
      name: 'Next.js',
      description: 'The React Framework for Production'
    }
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Tools I Use for Most Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((tech) => (
            <div key={tech.name} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex flex-col items-center transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
              <p className="text-center text-gray-300">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}