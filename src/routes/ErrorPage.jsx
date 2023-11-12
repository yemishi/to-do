import { Link } from "react-router-dom"

export default function ErrorPage() {

  return <div className="flex justify-center items-end bg-bubble">
    <div className="font-bold text-2xl flex flex-col sm:text-4xl font-montserrat h-2/3 text-center " >
      <h1 style={{ WebkitTextStroke: '1px white' }} className="text-transparent text-[80px] sm:text-[120px] font-sans">Woops!</h1>


      <p className="mt-20 md:mt-32 self-center sm:w-5/6">
        We're sorry, something is not working here
      </p>
      <Link to='/home'> <button className="toHome">Go to Home</button></Link>
    </div>
  </div>
}