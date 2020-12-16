import React, { useState } from "react"
import { useShoppingCart } from "use-shopping-cart"



const cardStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
  backgroundColor: "#fff",
  borderRadius: "6px",
  maxWidth: "300px",
}
const buttonStyles = {
  display: "block",
  fontSize: "13px",
  textAlign: "center",
  color: "#000",
  padding: "12px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
}

const formatPrice = (amount, currency) => {
  let price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(price)
}

const ProductCard = ({ product }) => {

  const { addItem, totalPrice, redirectToCheckout, cartCount } = useShoppingCart()

  const [loading, setLoading] = useState(false)

  const handleCheckout = async event => {
    event.preventDefault()
    setLoading(true)

    redirectToCheckout()
  }

  return (
    <div style={cardStyles}>
        <fieldset style={{ border: "none" }}>
          <legend>
            <h4>{product.name}</h4>
            <img src={product.images[0]} alt={product.name}/>
          </legend>
          <label>
            Price{" "}
            <select name="priceSelect">
              {product.prices.map(price => (
                <option key={price.id} value={price.id}>
                  {formatPrice(price.unit_amount, price.currency)}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        {/* This Button needs fixing */}
        <button
        onClick={() => addItem({id: product.prices[0].id, type: "price", quantity: "1"})}
        aria-label={`Add ${product.name} to your cart`}
      >
          Add ${product.name} to your cart
          </button>
        <button
          disabled={loading}
          style={
            loading
              ? { ...buttonStyles, ...buttonDisabledStyles }
              : buttonStyles
          }
          onClick={handleCheckout}
        >
          BUY ME
        </button>
    </div>
  )
}


export default ProductCard