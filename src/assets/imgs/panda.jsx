
export default function Panda() {
  return (
    <div className="flex w-full justify-center" >

      <svg width="300" height="300">
        <ellipse cx="50%" cy="50%" rx="130" ry="110" fill="white" />

        <path stroke="black"
          d="M 100, 110 a 30,40 30 1,0 1,0" />
        <path stroke="black"
          d="M 200, 110 a 30,40 -30 1,0 1,0" />
        <circle fill="white" cx="35%" cy="45%" r="8" />
        <circle fill="white" cx="65%" cy="45%" r="8" />
      </svg>

    </div>
  )
}