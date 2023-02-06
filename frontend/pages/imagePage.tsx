import React, { useEffect, useState } from 'react'

const imagePage = () => {
  const [data,setData]=useState<any>();

  useEffect(()=>{
    let urlAPP = fetch('https://api.nasa.gov/planetary/apod?api_key=TvcSV5OcuNjzuU4Fv1TyKNbdzo8PKtJPyZlkR0JK')
    .then(response => response.json())
    .then(formatedResponse =>  console.log(formatedResponse))

      setData(urlAPP);

  },[])

  return (
    
    <div><img src={data?.url}/></div>
  )
}

export default imagePage