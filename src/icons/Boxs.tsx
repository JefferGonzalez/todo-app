interface Props {
  className: string
}

export default function Boxs({ className }: Props) {
  return (
    <svg
      width='512'
      height='512'
      viewBox='0 0 512 512'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect
        id='b'
        width='512'
        height='512'
        x='0'
        y='0'
        rx='128'
        fill='url(#a)'
        stroke='#FFF'
        strokeWidth='0'
        strokeOpacity='100%'
        paintOrder='stroke'
      />
      <defs>
        <linearGradient
          id='a'
          gradientUnits='userSpaceOnUse'
          gradientTransform='rotate(180)'
          style={{ transformOrigin: 'center center' }}
        >
          <stop stopColor='#52525B' />
          <stop offset='1' stopColor='#a1a1aa' />
        </linearGradient>
      </defs>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 16 16'
        width='352'
        height='352'
        x='80'
        y='80'
        alignmentBaseline='middle'
        style={{ color: '#fff' }}
      >
        <path
          fill='currentColor'
          d='M8.129 7.657 5.733 8.686l2.219.949 2.572-.949L8.13 7.657ZM4.527 8.943l-.08 4.63 3.505 1.544V10.31L4.527 8.943Zm7.203 0L8.563 10.15v4.534l3.167-1.286V8.943ZM4.182 1.055 1.786 2.084l2.219.948 2.572-.948-2.395-1.03ZM.58 2.34.5 6.971l3.505 1.544V3.708L.58 2.34Zm7.203 0L4.616 3.547V8.08l3.167-1.286V2.341ZM11.899.883l-2.396 1.03 2.219.948 2.572-.949L11.899.883ZM8.298 2.17l-.08 4.63 3.504 1.543V3.536L8.298 2.17Zm7.202 0-3.167 1.205V7.91L15.5 6.623V2.17Z'
        />
      </svg>
    </svg>
  )
}
