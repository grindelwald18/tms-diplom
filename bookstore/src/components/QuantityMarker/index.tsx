import './style.scss'
export function QuantityMarker ({ quantity }: { quantity: number }) {
  return (
    <div className="marker">
      {quantity}
    </div>
  )
}
