const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-[4px] border-t-red-600 animate-spin"></div>
    </div>
  )
}

export default Loader;