import React from 'react'
import './ResidentsMaintenance.css';
function ResidentsMaintenance() {
  return (
    <section>
        <form action="" className='form'>
            <select name="" id="" className='input-field'>
                <option value="">Type of Maintenance</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Furniture">Furniture</option>
            </select>
            <label htmlFor="">Room Number:</label>
            <input type="text" className='input-field' id="" />
            <input type="date" className='input-field'/>
            <label htmlFor="">Description</label>
            <textarea className='input-field' id="" rows="5" col="40"></textarea>
            <button type="submit">Submit</button>

        </form>
    </section>
  )
}

export default ResidentsMaintenance
