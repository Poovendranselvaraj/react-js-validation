import React from 'react'
import { Link } from 'react-router-dom'
import Users from './Users'

const Admin = () => {
  return (
    <section>
      <h2>Admin Page</h2>
      <br />
      <Users/>
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default Admin