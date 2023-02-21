const Footer = () => {
  return (
    <footer className="bg-red-500">
        <div className="w-full max-w-baseWidth mx-auto px-6 md:px-12 py-4">
            <p className="text-white font-semibold text-center tracking-wider">&copy; Copyright FOA {new Date().getFullYear()}</p>
        </div>
    </footer>
  )
}

export default Footer