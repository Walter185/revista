import React from 'react'

export default function Loader() {
  return (
    <div className='text-center my-5'>
        <div className="spinner-border text-secondary mt-5 mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <h4><small>Cargando...</small></h4>
    </div>
  )
}
