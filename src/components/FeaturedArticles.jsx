import './FeaturedArticles.css'
import ArticleCard from './ArticleCard'

const articles = [
  {
    title: "React Basics",
    description: "Learn the fundamentals of React and component-based development.",
    rating: 5,
    author: "Rudra",
    image: "/images/react.png"
  },
  {
    title: "Introduction to NodeJS",
    description: "Learn the basics of NodeJS and how it is used in web development.",
    rating: 5,
    author: "Rudra",
    image: "/images/nodejs.png"
  },
  {
    title: "Understanding React Hooks",
    description: "Understand how React Hooks are used in your applications.",
    rating: 5,
    author: "Rudra",
    image: "/images/reacthooks.jpg"
  }
]

function FeaturedArticles() {
  return (
    <section className="featured-articles">
      <h2>Featured Articles</h2>

      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard
            key={article.title}
            title={article.title}
            description={article.description}
            rating={article.rating}
            author={article.author}
            image={article.image}
          />
        ))}
      </div>

      <button className="see-all-button">
        See all articles
      </button>
    </section>
  )
}

export default FeaturedArticles