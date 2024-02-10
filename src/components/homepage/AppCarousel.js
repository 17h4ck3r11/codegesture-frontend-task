import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';

function AppCarousel() {
    const [heroData, setheroData] = useState([]);

    const getData = async () => {
        let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`,{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });

        result = await result.json();
        setheroData(result);
    }

    useEffect(() => {
        getData();
    }, [])

  return (
    <div className='placementCarousel'>
      <Carousel>
          {
            heroData.reverse().slice(0, 11).map(hero => {
              return (
                <Carousel.Item key={hero.id}>
                  <img
                    className="d-block w-100"
                    src={hero.image}
                    alt={"slide " + hero.id}
                    style={{width:'100%',  height:"100%"}}
                  />    
                </Carousel.Item>
              );
            })
          }
      </Carousel>
    </div>
  )
}

export default AppCarousel
