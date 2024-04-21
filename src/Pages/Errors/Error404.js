import React from 'react'
import './Error404.css'
import logo from '../../assets/svg/404.svg'
export default function Error404() {
  return (
    <section>
      <img src={logo} className='page404' alt='404 Page not found!' />
    </section>
  )
}
