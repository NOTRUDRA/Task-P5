import './FeaturedTutorials.css'
import TutorialCard from './TutorialCard'

const tutorials = [
  {
    title: "Building Your First React App",
    description: "Learn how to create your first application using React.",
    rating: 5,
    author: "Rudra",
    image: "/images/react.png"
  },
  {
    title: "Getting Started with NodeJS",
    description: "Learn the basics of NodeJS and how it is used in web development.",
    rating: 5,
    author: "Rudra",
    image: "/images/nodejs.png"
  },
  {
    title: "React Hooks Tutorial",
    description: "Understand how to use React Hooks in your applications.",
    rating: 5,
    author: "Rudra",
    image: "/images/reacthooks.jpg"
  }
]

function FeaturedTutorials() {
  return (
    <section className="featured-tutorials">
      <h2>Featured Tutorials</h2>

      <div className="tutorial-grid">
        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.title}
            title={tutorial.title}
            description={tutorial.description}
            rating={tutorial.rating}
            author={tutorial.author}
            image={tutorial.image}
          />
        ))}
      </div>

      <button className="see-all-button">
        See all tutorials
      </button>
    </section>
  )
}

export default FeaturedTutorials