import Dropzone from '@/components/dropzone'

const Homepage = () => {
  return (
    <section className='flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4'>
      <div className='w-full max-w-3xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300'>
        <div className='p-8'>
          <h1 className='text-4xl font-extrabold text-center mb-8 text-white drop-shadow-lg animate-pulse'>
            Upload Your Groovy Files
          </h1>
          <Dropzone className='p-8 border-4 border-dashed border-yellow-300 bg-white bg-opacity-10 rounded-xl hover:border-green-300 transition-colors duration-300' />
        </div>
      </div>
    </section>
  )
}

export default Homepage