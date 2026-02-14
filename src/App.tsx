import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Connect } from './components/Connect'
import { Footer } from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Connect />
      </main>
      <Footer />
    </div>
  )
}

export default App
