/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { CartProvider } from 'use-shopping-cart'
import getStripe from "../utils/stripejs"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  let stripePromise = getStripe();

  return (
    <CartProvider
    mode="client-only"
    stripe={stripePromise}
    // The URL to which Stripe should send customers when payment is complete.
    successUrl="http://localhost:8000/success"
    // The URL to which Stripe should send customers when payment is canceled.
    cancelUrl="http://localhost:8000"
    currency="USD"
    // https://stripe.com/docs/payments/checkout/client#collect-shipping-address
    allowedCountries={['US']}
    // https://stripe.com/docs/payments/checkout/client#collect-billing-address
    billingAddressCollection={true}
  >
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
  </CartProvider>)
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
